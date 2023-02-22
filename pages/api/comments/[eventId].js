import mongoose from "mongoose";
import Comment from "../../../models/Comment";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, text } = req.body.commentData;
    if (
      !email.includes("@") ||
      !email ||
      name.trim() === "" ||
      !name ||
      text.trim() === "" ||
      !text
    ) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }

    const comment = new Comment({
      email: email,
      name: name,
      text: text,
      eventId,
    });
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.poa6kpu.mongodb.net/${process.env.MONGODB_NAME}`
    );

    try {
      await comment.save();
    } catch (err) {
      res.status(500).json({ message: "Failed to add comment!" });
      return;
    }

    res.status(201).json({ message: "Added new comment!", comment: comment });
  } else {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.poa6kpu.mongodb.net/${process.env.MONGODB_NAME}`
    );

    let comments;
    try {
      comments = await Comment.find({ eventId: eventId }).sort({ _id: -1 });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch comments!" });
      return;
    }
    res.status(200).json({ comments: comments });
  }
};

export default handler;
