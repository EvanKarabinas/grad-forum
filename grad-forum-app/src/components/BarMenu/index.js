import React, { Component } from "react";
import notificationsPhoto from "../../notifications.png";
import NotificationsPopUp from "../NotificationsPopUp";
import Help from "../Help";
import ProfilePopUp from "../ProfilePopUp";
import profilePhoto from "../../profile.png";
import logoutPhoto from "../../logout.png";
import helpPhoto from "../../help-2.png";
import { fetchData } from "../../utils";
import "./barMenu.css";

class BarMenu extends Component {
  state = {
    notificationsVisible: false,
    notifications: [],
    newNotifications: [],
    profileVisible: false,
    helpVisible: false
  };

  clickNotifications = () => {
    if (this.state.notificationsVisible) {
      this.setState({ notificationsVisible: !this.state.notificationsVisible });
    } else {
      this.fetchNotifications();
      this.setState({
        notificationsVisible: !this.state.notificationsVisible,
        newNotifications: []
      });
    }
  };

  clickProfile = async () => {
    await this.setState({ profileVisible: !this.state.profileVisible });
    if (!this.state.profileVisible) {
      window.location.reload();
    }
  };

  clickHelp = () => {
    this.setState({ helpVisible: !this.state.helpVisible });
  };
  componentDidMount() {
    this.connectSocket();
    this.fetchNotificationsOnLoad();
  }

  fetchNotificationsOnLoad = async () => {
    console.log("fetching notifications!");
    let notifications = await fetchData("notifications");
    console.log(notifications);
    this.setState({ notifications: notifications });
    let notification;
    for (notification of notifications) {
      if (!notification.is_read) {
        this.setState({
          newNotifications: [...this.state.newNotifications, notification]
        });
      }
    }
  };

  fetchNotifications = async () => {
    console.log("fetching notifications!");
    let notifications = await fetchData("notifications");
    console.log(notifications);
    this.setState({ notifications: notifications });
  };

  connectSocket = () => {
    var io = require("socket.io-client");
    var socket = io.connect("<YOUR SERVER IP HERE>:5000");
    socket.on("connect", () => {
      console.log("connected to localhost:5000");
      socket.emit("join", localStorage.getItem("userId"));
      socket.on("clientEvent", data => {
        console.log("message from the server:", data);
        this.setState({
          newNotifications: [...this.state.newNotifications, data]
        });
      });
    });
  };

  logout = async () => {
    console.log("sending logout request...");
    await fetch("logout", { credentials: "include" }).then(res => {
      if (res.ok) {
        console.log("logout completed...");
        this.props.redirectHome();
      } else {
        console.log("There was an error. Cannot log out!");
      }
    });
  };

  render() {
    return (
      <div className="bar-menu-container">
        <div>
          {this.state.newNotifications.length > 0 && (
            <div className="notifications-counter">
              {this.state.newNotifications.length}
            </div>
          )}
          <button title="Ειδοποιήσεις" className="bar-menu-button">
            <img
              alt="notification"
              className="bar-menu-image"
              src={notificationsPhoto}
              onClick={this.clickNotifications}
            />
          </button>
          {this.state.notificationsVisible && (
            <NotificationsPopUp notifications={this.state.notifications} />
          )}
        </div>

        <button
          title="Προφίλ"
          className="bar-menu-button"
          onClick={this.clickProfile}
        >
          <img alt="profile" className="bar-menu-image" src={profilePhoto} />
        </button>
        {this.state.profileVisible && (
          <ProfilePopUp
            clickProfile={this.clickProfile}
            redirectHome={this.props.redirectHome}
          />
        )}
        <button title="Αποσύνδεση" className="bar-menu-button">
          <img
            alt="logout"
            className="bar-menu-image"
            src={logoutPhoto}
            onClick={this.logout}
          />
        </button>

        <button title="Βοήθεια" className="bar-menu-button">
          <img
            alt="help"
            className="bar-menu-image"
            src={helpPhoto}
            onClick={this.clickHelp}
          />
        </button>
        {this.state.helpVisible && <Help closePopUp={this.clickHelp} />}
      </div>
    );
  }
}

export default BarMenu;
