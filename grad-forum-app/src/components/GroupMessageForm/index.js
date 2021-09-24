import React, { Component } from "react";
import "./groupMessageForm.css";
import sendMessageGroupIcon from "../../send-black.png";
class GroupMessageForm extends Component {
  state = {
    content: ""
  };

  handleMessageContent = e => this.setState({ content: e.target.value });

  postMessage = () => {
    fetch("groups/" + this.props.groupId + "/messages", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: this.state.content
      })
    }).then(res => {
      console.log(res.text());
      this.setState({ content: "" });
      this.props.getMessages();
    });
  };

  render() {
    return (
      <div className="group-message-form-container">
        {" "}
        <textarea
          type="text"
          className="group-message-input"
          value={this.state.content}
          onChange={this.handleMessageContent}
          placeholder="Γράψε ένα μήνυμα"
        />{" "}
        <button
          className="send-message-group-button"
          onClick={this.postMessage}
        >
          <img
            alt="sendicon"
            className="send-message-group-icon"
            src={sendMessageGroupIcon}
          />
        </button>
      </div>
    );
  }
}

export default GroupMessageForm;
