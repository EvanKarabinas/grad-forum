import React, { Component } from "react";
import { fetchPhoto, timeDiff } from "../../utils";
import ProfilePhoto from "../ProfilePhoto";
import "./feedComment.css";
class FeedComment extends Component {
  state = {};
  render() {
    return (
      <div className="comment-container">
        <div className="comment-user-info">
          <ProfilePhoto
            photoUrl={fetchPhoto(this.props.comment.creatorPhotoUrl)}
            size="small"
          />
          <div className="comment-user-name">
            {this.props.comment.creatorName}
          </div>

          <div className="comment-created-at">
            &bull;
            {" " + timeDiff(this.props.comment.created_at)}
          </div>
        </div>
        <div className="comment-content">{this.props.comment.content}</div>
      </div>
    );
  }
}

export default FeedComment;
