import React, { Component } from "react";
import { fetchData, fetchPhoto, timeDiff } from "../../utils";
import "./notification.css";

class Notification extends Component {
  state = {
    senderName: "",
    senderPhoto: ""
  };

  fetchUser = async () => {
    let sender = await fetchData("users/" + this.props.notification.sender_id);
    // console.log("SENDER" + JSON.stringify(sender[0]));
    this.setState({
      senderName: sender[0].first_name + " " + sender[0].last_name,
      senderPhoto: sender[0].profile_photo
    });
  };

  componentDidMount() {
    this.fetchUser();
  }

  formatContent = (type, content) => {
    let formattedContent;
    if (type === "post") {
      formattedContent = (
        <span>
          Ο χρήστης{" "}
          <span className="notification-bold">{this.state.senderName}</span>{" "}
          δημοσίευσε μια νέα <span className="notification-bold">ανάρτηση</span>
          : "{content}".
        </span>
      );
    }
    if (type === "group") {
      formattedContent = (
        <span>
          Ο χρήστης{" "}
          <span className="notification-bold">{this.state.senderName}</span>{" "}
          δημιούργησε μια νέα <span className="notification-bold">ομάδα</span>:
          "{content}".
        </span>
      );
    }
    if (type === "jobOffer") {
      formattedContent = (
        <span>
          Ο χρήστης{" "}
          <span className="notification-bold">{this.state.senderName}</span>{" "}
          δημοσίευσε μια νέα <span className="notification-bold">αγγελία</span>:
          "{content}".
        </span>
      );
    }
    if (type === "event") {
      formattedContent = (
        <span>
          Ο χρήστης{" "}
          <span className="notification-bold">{this.state.senderName}</span>{" "}
          πρόσθεσε μια νέα
          <span className="notification-bold"> εκδήλωση</span>: "{content}".
        </span>
      );
    }

    if (type === "post-comment") {
      formattedContent = (
        <span>
          Ο χρήστης{" "}
          <span className="notification-bold">{this.state.senderName}</span>{" "}
          άφησε ένα σχόλιο στην{" "}
          <span className="notification-bold">ανάρτηση</span>: "{content}" που
          έχετε δημοσιεύσει.
        </span>
      );
    }

    if (type === "jobOffer-comment") {
      formattedContent = (
        <span>
          Ο χρήστης{" "}
          <span className="notification-bold">{this.state.senderName}</span>{" "}
          άφησε ένα σχόλιο στην{" "}
          <span className="notification-bold">αγγελία</span>: "{content}" που
          έχετε δημοσιεύσει.
        </span>
      );
    }

    if (type === "event-comment") {
      formattedContent = (
        <span>
          Ο χρήστης{" "}
          <span className="notification-bold">{this.state.senderName}</span>{" "}
          άφησε ένα σχόλιο στην{" "}
          <span className="notification-bold">εκδήλωσή</span>: "{content}" που
          έχετε προσθέσει.
        </span>
      );
    }

    if (type === "like") {
      formattedContent = (
        <span>
          Η <span className="notification-bold">δημοσίευσή</span> σας: "
          {content}" αρέσει στον χρήστη{" "}
          <span className="notification-bold">{this.state.senderName}</span> .
        </span>
      );
    }
    return formattedContent;
  };

  render() {
    return (
      <div className="notification-container">
        <img
          alt="profile"
          src={fetchPhoto(this.state.senderPhoto)}
          className="notification-profile-photo"
        ></img>
        <div className="notification-content-container">
          <div className="notification-content">
            {this.formatContent(
              this.props.notification.type,
              this.props.notification.content
            )}
          </div>
          <div className="notification-time">
            {timeDiff(this.props.notification.created_at)}
          </div>
        </div>
      </div>
    );
  }
}

export default Notification;
