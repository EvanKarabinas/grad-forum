import React, { Component } from "react";
import profilePhoto from "../../profile.png";
import "./profileInfo.css";
import { fetchData, fetchPhoto } from "../../utils";

class ProfileInfo extends Component {
  state = {
    user: ""
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    fetchData("users/" + localStorage.getItem("userId")).then(user =>
      this.setState({ user: user[0] })
    );
  };

  render() {
    return (
      <div className="profile-info-container">
        <img
          alt="profile"
          className="profile-info-img"
          src={fetchPhoto(this.state.user.profile_photo)}
        />
        <div className="profile-info-text">
          <span className="profile-info-name">
            {this.state.user.first_name + " " + this.state.user.last_name}
          </span>
          <span className="profile-info-username">
            {this.state.user.username}
          </span>
        </div>
      </div>
    );
  }
}

export default ProfileInfo;
