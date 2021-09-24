import React, { Component } from "react";
import "./postFeedForm.css";
import sendIcon from "../../send.png";

class PostFeedForm extends Component {
  state = {
    postTitleInput: "",
    postContentInput: ""
  };

  createPost = () => {
    console.log("creating post!");
    fetch("posts", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: this.state.postTitleInput,
        content: this.state.postContentInput
      })
    }).then(res => {
      console.log(res.text());
      this.props.updatePostsFeed();
    });
  };

  updatePostTitleInput = e => {
    this.setState({
      postTitleInput: e.target.value
    });
  };

  updatePostContentInput = e => {
    this.setState({
      postContentInput: e.target.value
    });
  };

  render() {
    let form;
    form = (
      <div className="feed-form-container">
        <div />
        <div className="feed-form-center-column">
          <p className="feed-form-title">Δημιουργία Ανάρτησης</p>

          <label className="feed-form-label">Τίτλος</label>
          <input
            className="feed-form-input"
            type="text"
            value={this.state.postTitleInput}
            onChange={this.updatePostTitleInput}
          />
          <label className="feed-form-label">Περιεχόμενο</label>

          <input
            className="feed-form-input"
            type="text"
            value={this.state.postContentInput}
            onChange={this.updatePostContentInput}
          />
        </div>
        <button
          title="Δημιουργία"
          className="feed-form-submit"
          onClick={this.createPost}
        >
          <img alt="send" className="send-icon" src={sendIcon} />
        </button>
      </div>
    );
    return form;
  }
}

export default PostFeedForm;
