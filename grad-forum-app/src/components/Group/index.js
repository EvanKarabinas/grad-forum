import React, { Component } from "react";
import GroupPopUp from "../GroupPopUp";
import "./group.css";

class Group extends Component {
  state = { popupVisible: false };

  popupClick = () => {
    this.setState({ popupVisible: true });
  };

  closePopUp = () => {
    this.setState({ popupVisible: false });
  };

  // showGroups() {
  //   console.log(this.props.myGroups);
  // }

  // componentDidMount = () => {
  //   this.showGroups();
  // };
  render() {
    return (
      <React.Fragment>
        <div className="group-container">
          <div />
          <div className="group-center-column" onClick={this.popupClick}>
            <p className="group-name">{this.props.name + " /"}</p>
            <div className="group-description">{this.props.description}</div>
          </div>
          <div className="group-right-column">
            <p className="group-date">
              {this.props.date
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
            </p>
            <div>
              <span className="group-creator">Δημιουργήθηκε από: </span>
              <span className="group-creator-name">
                {this.props.creatorName}
              </span>
            </div>
          </div>
        </div>
        {this.state.popupVisible && (
          <GroupPopUp
            groupName={this.props.name}
            groupDescription={this.props.description}
            groupId={this.props.groupId}
            exitButton={this.closePopUp}
            myGroups={this.props.myGroups}
            updateMyGroups={this.props.updateMyGroups}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Group;
