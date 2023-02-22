import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setIsLoading(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Adding comment...",
      message: "Adiing comment",
      status: "pending",
    });
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify({ commentData }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) =>
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully added a comment!",
          status: "success",
        })
      )
      .catch((error) =>
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        })
      );
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {isLoading && showComments && <p>Loading...</p>}
      {showComments && !isLoading && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
