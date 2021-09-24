import React, { Component } from "react";
import "./jobOffer.css";
import commentPhoto from "../../comment.png";
import FeedCommentsContainer from "../FeedCommentsContainer";
import { fetchData } from "../../utils";

class JobOffer extends Component {
  state = { liked: false, expand: true, comments: [] };

  clickLike = () => {
    this.setState({ liked: true });
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
    this.getComments();
  }
  getComments = async () => {
    let fetchedComments = await fetchData(
      "jobOffers/" + this.props.jobOfferId + "/comments"
    );
    let formatedComments = await this.formatComments(fetchedComments);
    this.setState({ comments: formatedComments });
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
    await fetch("jobOffers/" + this.props.jobOfferId + "/comments", {
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
      <div className="job-offer-plus-comments-container">
        <div className="job-offer-container">
          <div className="job-offer-left-column">
            <button className="job-offer-reaction-container">
              <img
                alt="comment"
                title="Αφήστε ένα σχόλιο"
                className="job-offer-reaction-logo"
                src={commentPhoto}
                onClick={this.clickPost}
              />
              <span>{this.state.comments.length}</span>
            </button>
          </div>
          <div className="job-offer-center-column">
            <div className="job-offer-type-container">
              {this.props.type === "demand" ? (
                <div className="job-offer-choice-demand">Ζήτηση</div>
              ) : (
                <div className="job-offer-choice-offer">Προσφορά</div>
              )}
            </div>

            <span className="job-offer-title">{this.props.title}</span>
            <p className="job-offer-content">{this.props.description}</p>
          </div>
          <div className="job-offer-right-column">
            <p className="job-offer-date">
              {this.props.date
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
            </p>
            <div>
              <span className="job-offer-creator"> αναρτήθηκε από : </span>
              <span className="job-offer-creator-name">
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

export default JobOffer;
