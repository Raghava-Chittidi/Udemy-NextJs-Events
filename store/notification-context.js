import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: () => {},
  hideNotification: () => {},
});

export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState();

  const showNotificationHandler = (notificationData) => {
    setNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (
      notification &&
      (notification.status === "success" || notification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  const context = {
    notification: notification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};
