import React, { useContext, useState } from "react";
import { NotificationContext } from "./NotificationSystem";
import NotificationsList from "./NotificationsList";
import "./Notifications.css";

function NotificationsIcon() {
  const { notifications } = useContext(NotificationContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="notifications-wrapper">
      <div
        className={`notifications-icon ${notifications.length > 0 ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fa fa-bell"></i>
        {notifications.length > 0 && <span className="unread-count">{notifications.length}</span>}
      </div>

      {isOpen && <NotificationsList />}
    </div>
  );
}

export default NotificationsIcon;
