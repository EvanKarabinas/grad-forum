import React, { Component } from "react";
import GroupShortInfo from "../GroupShortInfo";

import "./myGroups.css";
class MyGroups extends Component {
  state = { popupVisible: false };

  render() {
    return (
      <React.Fragment>
        <div className="my-groups-container">
          <span className="my-groups-title">Οι ομάδες μου</span>
          <div className="group-short-infos-container">
            {this.props.myGroups.map(group => (
              <GroupShortInfo
                key={group.group_id}
                group={group}
                onClick={this.popupClick}
                myGroups={this.props.myGroups}
                updateMyGroups={this.props.updateMyGroups}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyGroups;
