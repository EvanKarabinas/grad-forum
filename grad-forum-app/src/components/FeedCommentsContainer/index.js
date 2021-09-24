import React, { Component } from "react";
import FeedComment from "../FeedComment";
import FeedCommentForm from "../FeedCommentForm";
import "./feedCommentsContainer.css";

class FeedCommentsContainer extends Component {
  state = {};

  scrollDown = () => {
    let scrollComments = this.refs.comments;
    scrollComments.scrollTop = scrollComments.scrollHeight;
  };

  render() {
    return (
      <div className="feed-comments-form-container">
        <div ref="comments" className="feed-comments-container">
          {this.props.comments.map(comment => (
            <FeedComment key={comment.id} comment={comment} />
          ))}
        </div>
        <FeedCommentForm
          postComment={this.props.postComment}
          scrollDown={this.scrollDown}
        />
      </div>
    );
  }
}

export default FeedCommentsContainer;
