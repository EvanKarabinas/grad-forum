import React, { Component } from "react";
import "./feedCommentForm.css";
class FeedCommentForm extends Component {
  state = { commentInput: "" };

  handleCommentInput = e => {
    this.setState({ commentInput: e.target.value });
  };

  postComment = async () => {
    await this.props.postComment(this.state.commentInput);
    this.setState({ commentInput: "" });
    this.props.scrollDown();
  };

  postCommentWithEnter = async e => {
    if (e.key === "Enter") {
      await this.props.postComment(this.state.commentInput);
      this.props.scrollDown();
      this.setState({ commentInput: "" });
    }
  };

  render() {
    return (
      <div className="comment-form-container">
        <input
          className="comment-input"
          type="text"
          placeholder="Αφήστε ένα σχόλιο..."
          value={this.state.commentInput}
          onChange={this.handleCommentInput}
          onKeyDown={this.postCommentWithEnter}
        ></input>
        {this.state.commentInput === "" ? (
          <button className="comment-submit-button-inactive">Δημοσίευση</button>
        ) : (
          <button
            className="comment-submit-button-active"
            onClick={this.postComment}
          >
            Δημοσίευση
          </button>
        )}
      </div>
    );
  }
}

export default FeedCommentForm;
