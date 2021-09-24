import React, { Component } from "react";
import ProfileInfo from "../ProfileInfo";
import MyGroups from "../MyGroups";
import "./rightMenu.css";
import CreateButton from "../CreateButton";

class RightMenu extends Component {
  state = {};
  render() {
    return (
      <div className="right-menu-container">
        <ProfileInfo />
        <MyGroups
          myGroups={this.props.myGroups}
          updateMyGroups={this.props.updateMyGroups}
        />
        <CreateButton toggleForm={this.props.toggleForm} />
      </div>
    );
  }
}

export default RightMenu;
