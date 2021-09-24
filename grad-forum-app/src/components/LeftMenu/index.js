import React, { Component } from "react";
import LeftMenuButton from "../LeftMenuButton";
import "./leftMenu.css";

class LeftMenu extends Component {
  state = {};
  render() {
    return (
      <div className="left-menu-container">
        <LeftMenuButton
          text="Ομάδες"
          fetchData={this.props.fetchGroups}
          selected={this.props.visibleContent === "groups" ? true : false}
        />
        <LeftMenuButton
          text="Αναρτήσεις"
          fetchData={this.props.fetchPosts}
          selected={this.props.visibleContent === "posts" ? true : false}
        />
        <LeftMenuButton
          text="Εκδηλώσεις"
          fetchData={this.props.fetchEvents}
          selected={this.props.visibleContent === "events" ? true : false}
        />
        <LeftMenuButton
          text="Αγγελίες"
          fetchData={this.props.fetchJobOffers}
          selected={this.props.visibleContent === "jobOffers" ? true : false}
        />
        <LeftMenuButton
          text="Μέλη"
          fetchData={this.props.fetchMembers}
          selected={this.props.visibleContent === "members" ? true : false}
        />

        {this.props.userIsAdmin && (
          <LeftMenuButton
            text="Αιτήματα"
            fetchData={this.props.fetchRequests}
            selected={this.props.visibleContent === "requests" ? true : false}
          />
        )}
      </div>
    );
  }
}

export default LeftMenu;
