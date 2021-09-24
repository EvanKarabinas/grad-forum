import React, { Component } from "react";
import ProfilePhoto from "../ProfilePhoto";
import { fetchPhoto, timeDiff } from "../../utils";
import "./groupMessage.css";

class GroupMessage extends Component {
  state = {};
  render() {
    return (
      <div className="group-message-container">
        <div className="group-message-creator-container">
          <ProfilePhoto
            photoUrl={fetchPhoto(this.props.creatorPhotoUrl)}
            size="small"
          />
          <span className="group-message-creator-name">
            {this.props.creatorName}
          </span>
          &bull;
          <span className="group-message-date">
            {timeDiff(this.props.createdAt)}
          </span>
        </div>

        <span className="group-message-content">{this.props.content}</span>
      </div>
    );
  }
}

export default GroupMessage;
