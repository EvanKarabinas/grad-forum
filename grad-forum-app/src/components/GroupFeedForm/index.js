import React, { Component } from "react";
import "./groupFeedForm.css";
import sendIcon from "../../send.png";

class GroupFeedForm extends Component {
  state = {
    groupNameInput: "",
    groupDescriptionInput: ""
  };

  createGroup = () => {
    fetch("groups", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.groupNameInput,
        description: this.state.groupDescriptionInput
      })
    }).then(res => {
      console.log(res.text());
      this.props.updateMyGroups();
      this.props.updateGroupsFeed();
    });
  };

  updateGroupNameInput = e => {
    this.setState({
      groupNameInput: e.target.value
    });
  };

  updateGroupDescriptionInput = e => {
    this.setState({
      groupDescriptionInput: e.target.value
    });
  };

  render() {
    let form;
    form = (
      <div className="feed-form-container">
        <div />
        <div className="feed-form-center-column">
          <p className="feed-form-title">Δημιουργία Ομάδας</p>

          <label className="feed-form-label">Όνομα ομάδας</label>
          <input
            className="feed-form-input"
            type="text"
            value={this.state.groupNameInput}
            onChange={this.updateGroupNameInput}
          />
          <label className="feed-form-label">Περιγραφή</label>

          <input
            className="feed-form-input"
            type="text"
            value={this.state.groupDescriptionInput}
            onChange={this.updateGroupDescriptionInput}
          />
        </div>
        <button
          title="Δημιουργία"
          className="feed-form-submit"
          onClick={this.createGroup}
        >
          <img alt="sendicon" className="send-icon" src={sendIcon} />
        </button>
      </div>
    );
    return form;
  }
}

export default GroupFeedForm;
