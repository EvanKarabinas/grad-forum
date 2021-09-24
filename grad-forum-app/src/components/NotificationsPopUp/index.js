import React, { Component } from "react";
import Notification from "../Notification";
import "./notificationsPopUp.css";

class NotificationsPopUp extends Component {
  render() {
    let content;
    if (this.props.notifications.length !== 0) {
      content = this.props.notifications.map(notification => (
        <div key={notification.id}>
          <Notification notification={notification} />
        </div>
      ));
    } else {
      content = (
        <div className="no-notifications-msg">Δεν υπάρχουν ειδοποιήσεις.</div>
      );
    }
    return <div className="notifications-pop-up-container">{content}</div>;
  }
}

export default NotificationsPopUp;
