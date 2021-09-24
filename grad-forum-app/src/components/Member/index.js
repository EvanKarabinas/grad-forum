import React, { Component } from "react";
import "./member.css";

class Member extends Component {
  state = { data: " " };
  render() {
    return (
      <div className="member-container">
        <div className="member-up-row">
          <img
            alt="profile"
            className="member-profile-photo"
            src={"uploads/" + this.props.profilePhoto}
          />
        </div>
        <div className="member-mid-row">
          <div>
            <span className="member-name">{this.props.firstName} </span>
            <span className="member-name">{this.props.lastName}</span>
          </div>

          <p className="member-email">{this.props.email}</p>
        </div>
        <div className="member-bottom-row">
          <p className="member-date"> έγινε μέλος: </p>
          <p className="member-date">
            {this.props.date
              .split("T")[0]
              .split("-")
              .reverse()
              .join("/")}
          </p>
        </div>
      </div>
    );
  }
}

export default Member;
