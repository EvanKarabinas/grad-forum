import React, { Component } from "react";
import "./joinRequest.css";

class JoinRequest extends Component {
  state = { data: " " };

  verifyMember = () => {
    console.log("Verifying member with ID :" + this.props.memberId);
    fetch("users/" + this.props.memberId + "/verify", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      this.props.updateRequestsFeed();
    });
  };

  render() {
    return (
      <div className="join-request-container">
        <div className="join-request-up-row">
          <img
            alt="profile"
            className="join-request-profile-photo"
            src={"uploads/" + this.props.profilePhoto}
          />
        </div>
        <div className="join-request-mid-row">
          <div>
            <span className="join-request-name">{this.props.firstName} </span>
            <span className="join-request-name">{this.props.lastName}</span>
          </div>

          <p className="join-request-email">{this.props.email}</p>
        </div>
        <div className="join-request-bottom-row">
          <p className="join-request-date"> έστειλε αίτημα: </p>
          <p className="join-request-date">
            {this.props.date
              .split("T")[0]
              .split("-")
              .reverse()
              .join("/")}
          </p>
          <button
            className="join-request-confirm-button"
            onClick={this.verifyMember}
          >
            Επιβεβαίωση
          </button>
        </div>
      </div>
    );
  }
}

export default JoinRequest;
