import React, { Component } from "react";
import "./post.css";
import commentPhoto from "../../comment.png";
import likePhoto from "../../like.png";
import likePhotoActive from "../../like_active.png";
import FeedCommentsContainer from "../FeedCommentsContainer";
import { fetchData } from "../../utils";

class Post extends Component {
  _isMounted = false;

  state = { upvoted: false, expand: true, upvotes: [], comments: [] };

  clickLike = async () => {
    if (this.state.upvoted === false) {
      await fetch("posts/" + this.props.postId + "/upvotes", {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      this.getUpvotes();
    } else {
      await fetch("posts/" + this.props.postId + "/upvotes", {
        method: "delete",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      this.getUpvotes();
    }
  };

  clickPost = async () => {
    if (this.state.expand) {
      this.setState({ expand: false });
    } else {
      await this.getComments();
      this.setState({ expand: true });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.getUpvotes();
    this.getComments();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getUpvotes = async () => {
    let fetchedUpvotes = await fetchData(
      "posts/" + this.props.postId + "/upvotes"
    );
    let upvote;
    if (this._isMounted) {
      this.setState({ upvoted: false });
      for (upvote of fetchedUpvotes) {
        if (upvote.user_id + "" === localStorage.getItem("userId")) {
          this.setState({ upvoted: true });
        }
      }

      this.setState({ upvotes: fetchedUpvotes });
    }
  };

  getComments = async () => {
    let fetchedComments = await fetchData(
      "posts/" + this.props.postId + "/comments"
    );
    let formatedComments = await this.formatComments(fetchedComments);
    if (this._isMounted) {
      this.setState({ comments: formatedComments });
    }
  };

  async formatComments(comments) {
    let comment;
    for (comment of comments) {
      let user = await fetchData("users/" + comment.user_id);
      comment["creatorName"] = user[0].first_name + " " + user[0].last_name;
      comment["creatorPhotoUrl"] = user[0].profile_photo;
    }
    return comments;
  }

  postComment = async commentContent => {
    await fetch("posts/" + this.props.postId + "/comments", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: commentContent
      })
    });
    await this.getComments();
    return;
  };

  render() {
    return (
      <div className="post-plus-comments-container">
        <div className="post-container">
          <div className="post-left-column">
            <button className="reaction-container" onClick={this.clickLike}>
              {this.state.upvoted === true ? (
                <img
                  alt="upvote"
                  className="reaction-logo"
                  src={likePhotoActive}
                />
              ) : (
                <img alt="upvote" className="reaction-logo" src={likePhoto} />
              )}
              <span>{this.state.upvotes.length}</span>
            </button>
            <button className="reaction-container" onClick={this.clickPost}>
              <img
                alt="comment"
                title="Αφήστε ένα σχόλιο"
                className="reaction-logo"
                src={commentPhoto}
              />
              <span>{this.state.comments.length}</span>
            </button>
          </div>
          <div className="post-center-column">
            <span className="post-title">{this.props.title}</span>
            <span className="post-content">{this.props.content}</span>
          </div>
          <div className="post-right-column">
            <p className="post-date">
              {this.props.date
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
            </p>
            <div>
              <span className="post-creator"> αναρτήθηκε από: </span>
              <span className="post-creator-name">
                {this.props.creatorName}
              </span>
            </div>
          </div>
        </div>
        {this.state.expand && (
          <FeedCommentsContainer
            comments={this.state.comments}
            postComment={this.postComment}
          />
        )}
      </div>
    );
  }
}

export default Post;
