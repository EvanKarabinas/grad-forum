import React, { Component } from "react";
import GroupMessage from "../GroupMessage";
import GroupMessageForm from "../GroupMessageForm";
import { fetchData } from "../../utils";
import "./groupPopUp.css";
import exitGroupIcon from "../../exit-group.png";

class GroupPopUp extends Component {
  state = {
    messages: [],
    users: [],
    members: "",
    isGroupMember: false
  };

  joinGroup = async () => {
    fetch("groups/" + this.props.groupId + "/members", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      this.props.updateMyGroups();
      console.log("is group member before: " + this.state.isGroupMember);
      this.setState({ isGroupMember: true });
      console.log("is group member before: " + this.state.isGroupMember);
      this.getMembers();
    });
  };

  exitGroup = async () => {
    fetch("groups/" + this.props.groupId + "/members", {
      method: "delete",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      this.props.updateMyGroups();
      console.log("is group member before: " + this.state.isGroupMember);
      this.setState({ isGroupMember: false });
      console.log("is group member before: " + this.state.isGroupMember);
      this.getMembers();
    });
  };

  getMessages = async () => {
    this.setState({ messages: [] });
    //let message;
    let messagesFormated;
    let messages = await fetchData(
      "groups/" + this.props.groupId + "/messages"
    );
    console.log("MESSAGES");
    console.log(messages);
    // for (message of messages) {
    //   let user = await fetchData("users/" + message.creator_id);

    //   message["creatorName"] = user[0].first_name + " " + user[0].last_name;
    //   message["creatorPhotoUrl"] = user[0].profile_photo;
    //   this.setState({ messages: [...this.state.messages, message] });
    // }
    messagesFormated = await this.formatMessages(messages);
    console.log("MESSAGES FORMATED");
    console.log(messagesFormated);
    this.setState({ messages: messagesFormated });
    var el = this.refs.messages;
    el.scrollTop = el.scrollHeight;
  };

  async formatMessages(messages) {
    let message;
    for (message of messages) {
      let user = await fetchData("users/" + message.creator_id);
      message["creatorName"] = user[0].first_name + " " + user[0].last_name;
      message["creatorPhotoUrl"] = user[0].profile_photo;
    }
    return messages;
  }

  componentDidMount() {
    console.log("this.props.myGroups");
    console.log(this.props.myGroups);

    for (let group of this.props.myGroups) {
      // console.log("group!!!!");
      // console.log(group);
      if (group.group_id === this.props.groupId) {
        this.setState({ isGroupMember: true });

        break;
      }
    }
    this.getMembers();
    this.getMessages();

    // console.log("is group member:");
    // console.log(this.state.isGroupMember);
  }

  getMembers = async () => {
    let members;
    members = await fetchData("groups/" + this.props.groupId + "/members");
    console.log("MEMBERS");
    console.log(members.length);
    this.setState({ members: members.length });
  };

  render() {
    let messagesString = this.state.messages.length;
    if (this.state.messages.length === 0) {
      messagesString = "";
    } else if (this.state.messages.length === 1) {
      messagesString += " Μήνυμα";
    } else {
      messagesString += " Μηνύματα";
    }
    // const isGroupMember = this.state.isGroupMember;
    return (
      <div className="group-pop-up-container " onClick={this.props.exitButton}>
        <div
          className="group-pop-up-content"
          onClick={event => event.stopPropagation()}
        >
          <div className="group-pop-up-left-column">
            <div ref="messages" className="group-pop-up-messages-container">
              {this.state.messages.map(message => (
                <GroupMessage
                  key={message.id}
                  creatorName={message.creatorName}
                  creatorPhotoUrl={message.creatorPhotoUrl}
                  content={message.content}
                  createdAt={message.created_at}
                />
              ))}
            </div>

            {this.state.isGroupMember ? (
              <GroupMessageForm
                groupId={this.props.groupId}
                getMessages={this.getMessages}
              />
            ) : (
              <div></div>
            )}
          </div>
          <div className="group-pop-up-info">
            <button
              className="group-pop-up-exit-button"
              onClick={this.props.exitButton}
            >
              <img
                alt="exit button"
                className="exit-button-icon"
                src={exitGroupIcon}
              />
            </button>
            <span className="group-pop-up-name">{this.props.groupName}</span>
            <p className="group-pop-up-description">
              {this.props.groupDescription}
            </p>
            <div className="group-pop-up-numbers">
              <div className="group-pop-up-members">
                {this.state.members}
                {this.state.members === 1 ? " Μέλος" : " Μέλη"}
              </div>
              <div className="group-pop-up-messages"> {messagesString}</div>
            </div>

            <div className="join-group">
              <div className="join-group-info">
                {this.state.isGroupMember
                  ? "Αν επιθυμείς να διαγραφείς από την ομάδα πάτησε 'Έξοδος'. Δεν θα μπορείς να απαντάς σε μηνύματα και δεν θα λαμβάνεις ειδοποιήσεις."
                  : "Για να στείλεις μήνυμα σε αυτή την ομάδα πρέπει να γίνεις μέλος."}
              </div>
              {this.state.isGroupMember ? (
                <button className="exit-group-button" onClick={this.exitGroup}>
                  Έξοδος
                </button>
              ) : (
                <button className="join-group-button" onClick={this.joinGroup}>
                  Γίνε μέλος
                </button>
              )}
            </div>
            {/* <div>
              the user is{" "}
              <b>{this.state.isGroupMember ? "currently" : "not"}</b> member of
              the group
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default GroupPopUp;
