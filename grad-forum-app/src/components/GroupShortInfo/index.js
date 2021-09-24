import React, { Component } from "react";
import arrowPhoto from "../../arrow-short.png";
import GroupPopUp from "../GroupPopUp";
import "./groupShortInfo.css";
class GroupShortInfo extends Component {
  state = { popupVisible: false };

  closePopUp = () => {
    this.setState({ popupVisible: false });
  };

  popupClick = () => {
    this.setState({ popupVisible: true });
    console.log("GROUP POP ID :" + JSON.stringify(this.props.group));
  };
  render() {
    return (
      <React.Fragment>
        <button
          className="group-short-info-container"
          onClick={this.popupClick}
        >
          <div className="group-short-info-content">
            <span className="my-groups-name">{this.props.group.name}</span>
            <span className="my-groups-description">
              {this.props.group.description}
            </span>
          </div>
          <img
            alt="arrowicon"
            src={arrowPhoto}
            className={"my-groups-arrow-icon"}
          />
        </button>
        {this.state.popupVisible && (
          <GroupPopUp
            groupName={this.props.group.name}
            groupDescription={this.props.group.description}
            groupId={this.props.group.group_id}
            exitButton={this.closePopUp}
            myGroups={this.props.myGroups}
            updateMyGroups={this.props.updateMyGroups}
          />
        )}
      </React.Fragment>
    );
  }
}

export default GroupShortInfo;
