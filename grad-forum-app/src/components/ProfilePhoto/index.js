import React, { Component } from "react";
import "./profilePhoto.css";
class ProfilePhoto extends Component {
  state = {};
  render() {
    return (
      <img
        alt="profile "
        src={this.props.photoUrl}
        className={"profile-photo-" + this.props.size}
      />
    );
  }
}

export default ProfilePhoto;
