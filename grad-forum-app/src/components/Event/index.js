import React, { Component } from "react";
import "./event.css";
import location from "../../location.png";
import clock from "../../clock-b.png";
import { monthConversion } from "../../utils";
import FeedCommentsContainer from "../FeedCommentsContainer";
import { fetchData } from "../../utils";

class Event extends Component {
  _isMounted = false;

  state = {
    comments: [],
    attendees: [],
    joined: false
  };
  componentDidMount() {
    this._isMounted = true;

    //console.log("EVENT WITH ID: " + this.props.eventId);
    this.getComments();
    this.getEventAttendees();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  postComment = async commentContent => {
    await fetch("events/" + this.props.eventId + "/comments", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: commentContent
      })
    });
    await this.getComments();
    return;
  };

  getComments = async () => {
    let fetchedComments = await fetchData(
      "events/" + this.props.eventId + "/comments"
    );
    let formatedComments = await this.formatComments(fetchedComments);
    if (this._isMounted) {
      this.setState({ comments: formatedComments });
    }
  };

  async formatComments(comments) {
    let comment;
    for (comment of comments) {
      let user = await fetchData("users/" + comment.user_id);
      comment["creatorName"] = user[0].first_name + " " + user[0].last_name;
      comment["creatorPhotoUrl"] = user[0].profile_photo;
    }
    return comments;
  }

  getEventAttendees = async () => {
    let fetchedAttendees = await fetchData(
      "events/" + this.props.eventId + "/attendees"
    );
    if (this._isMounted) {
      this.setState({ attendees: fetchedAttendees });
      let attendant;
      this.setState({ joined: false });
      for (attendant of fetchedAttendees) {
        if (String(attendant.user_id) === localStorage.getItem("userId")) {
          this.setState({ joined: true });
        }
      }
    }
  };

  joinEvent = async () => {
    if (!this.state.joined) {
      console.log("Join Event");
      await fetch("events/" + this.props.eventId + "/attendees", {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      await this.getEventAttendees();
      console.log("joined : " + this.state.joined);
    } else {
      console.log("Leave Event");
      await fetch("events/" + this.props.eventId + "/attendees", {
        method: "delete",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      await this.getEventAttendees();
      console.log("joined : " + this.state.joined);
    }
  };

  render() {
    return (
      <div>
        <div className="event-container">
          <div className="event-left-column">
            <p className="event-year">
              {" "}
              {
                String(this.props.eventDate)
                  .split("T")[0]
                  .split("-")
                  .reverse()[2]
              }
            </p>
            <p className="event-month">
              {monthConversion(
                String(this.props.eventDate)
                  .split("T")[0]
                  .split("-")
                  .reverse()[1]
              )}
            </p>
            <p className="event-day">
              {" "}
              {
                String(this.props.eventDate)
                  .split("T")[0]
                  .split("-")
                  .reverse()[0]
              }
            </p>
            <div className="event-time-container">
              <img alt="clock" className="event-clock" src={clock} />
              <span className="event-time">
                {String(this.props.eventDate).substring(11, 16)}
              </span>
            </div>
          </div>

          <div className="event-center-column">
            <p className="event-title">{this.props.title}</p>
            <p className="event-description">{this.props.description}</p>
            <div className="event-place-container">
              <img alt="location" className="event-location" src={location} />
              <span className="event-place">{this.props.place}</span>
            </div>
            <div className="event-attendance">
              {this.state.joined ? (
                <button className="going-button" onClick={this.joinEvent}>
                  Έχετε δηλώσει ότι θα πάτε
                </button>
              ) : (
                <button
                  title="Δηλώστε οτι θα παρευρεθείτε στην εκδήλωση"
                  className="going-button"
                  onClick={this.joinEvent}
                >
                  Θα πάω
                </button>
              )}

              <div className="event-attendees">
                +{this.state.attendees.length} χρήστες θα παρευρεθούν
              </div>
            </div>
          </div>
          <div className="event-right-column">
            <p className="event-creation-date">
              {this.props.date
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
            </p>
            <div>
              <span className="event-creator"> αναρτήθηκε από : </span>
              <span className="event-creator-name">
                {this.props.creatorName}
              </span>
            </div>
          </div>
        </div>
        <FeedCommentsContainer
          comments={this.state.comments}
          postComment={this.postComment}
        />
      </div>
    );
  }
}

export default Event;
