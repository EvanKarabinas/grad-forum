import React, { Component } from "react";
import "./eventFeedForm.css";

class EventFeedForm extends Component {
  state = {
    eventTitleInput: "",
    eventDescriptionInput: "",
    eventPlaceInput: "",
    eventDayInput: "31",
    eventMonthInput: "12",
    eventYearInput: "2019",
    eventHourInput: "12",
    eventMinutesInput: "00"
  };

  formatDate = () => {
    let date;

    date = this.state.eventYearInput + "-";

    if (this.state.eventMonthInput < 10) {
      date = date + "0" + this.state.eventMonthInput + "-";
    } else {
      date = date + this.state.eventMonthInput + "-";
    }

    if (this.state.eventDayInput < 10) {
      date = date + "0" + this.state.eventDayInput + "T";
    } else {
      date = date + this.state.eventDayInput + "T";
    }

    if (this.state.eventHourInput < 10) {
      date = date + "0" + this.state.eventHourInput + ":";
    } else {
      date = date + this.state.eventHourInput + ":";
    }

    if (this.state.eventMinutesInput < 10) {
      date = date + "0" + this.state.eventMinutesInput;
    } else {
      date = date + this.state.eventMinutesInput;
    }

    return date;
  };

  createEvent = () => {
    fetch("events", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: this.state.eventTitleInput,
        description: this.state.eventDescriptionInput,
        place: this.state.eventPlaceInput,
        event_date: this.formatDate()
      })
    }).then(res => {
      this.props.updateEventsFeed();
    });
  };

  updateEventTitleInput = e => {
    this.setState({
      eventTitleInput: e.target.value
    });
  };

  updateEventDescriptionInput = e => {
    this.setState({
      eventDescriptionInput: e.target.value
    });
  };

  updateEventPlaceInput = e => {
    this.setState({
      eventPlaceInput: e.target.value
    });
  };

  updateEventDayInput = e => {
    if (parseInt(e.target.value) > 31) {
      this.setState({
        eventDayInput: 31
      });
    } else {
      this.setState({
        eventDayInput: parseInt(e.target.value)
      });
    }
  };

  updateEventMonthInput = e => {
    if (parseInt(e.target.value) > 12) {
      this.setState({
        eventMonthInput: 12
      });
    } else {
      this.setState({
        eventMonthInput: parseInt(e.target.value)
      });
    }
  };

  updateEventYearInput = e => {
    if (parseInt(e.target.value) > 2100) {
      this.setState({
        eventYearInput: 2019
      });
    } else {
      this.setState({
        eventYearInput: parseInt(e.target.value)
      });
    }
    if (parseInt(e.target.value) < 2019) {
      this.setState({
        eventYearInput: this.state.eventYearInput
      });
    }
  };

  updateEventHourInput = e => {
    if (parseInt(e.target.value) > 23) {
      this.setState({
        eventHourInput: 23
      });
    } else {
      this.setState({
        eventHourInput: e.target.value
      });
    }
  };

  updateEventMinutesInput = e => {
    if (parseInt(e.target.value) > 59) {
      this.setState({
        eventMinutesInput: 59
      });
    } else {
      this.setState({
        eventMinutesInput: parseInt(e.target.value)
      });
    }
  };

  render() {
    let form;
    form = (
      <div className="event-feed-form-container-button">
        <div className="event-feed-form-container">
          <p className="event-feed-form-title">Δημιουργία Εκδήλωσης</p>

          <label className="event-feed-form-label">Τίτλος</label>
          <input
            className="event-feed-form-input-title"
            type="text"
            value={this.state.eventTitleInput}
            onChange={this.updateEventTitleInput}
          />

          <label className="event-feed-form-label">Περιγραφή</label>

          <input
            className="event-feed-form-input"
            type="text"
            value={this.state.eventDescriptionInput}
            onChange={this.updateEventDescriptionInput}
          />

          <label className="event-feed-form-label">Τοποθεσία</label>
          <input
            className="event-feed-form-input"
            type="text"
            value={this.state.eventPlaceInput}
            onChange={this.updateEventPlaceInput}
          />

          <div className="event-date-time-container">
            <div className="event-feed-form-date-container">
              <label className="event-feed-form-label">Ημερομηνία</label>
              <input
                className="event-feed-form-date-input"
                type="number"
                name="quantity"
                min="1"
                max="31"
                value={this.state.eventDayInput}
                onChange={this.updateEventDayInput}
              />
              <label> / </label>
              <input
                className="event-feed-form-date-input"
                type="number"
                name="quantity"
                min="1"
                max="12"
                value={this.state.eventMonthInput}
                onChange={this.updateEventMonthInput}
              />
              <label> / </label>
              <input
                className="event-feed-form-date-input"
                type="number"
                name="quantity"
                min="0"
                max="2100"
                value={this.state.eventYearInput}
                onChange={this.updateEventYearInput}
              />
            </div>
            <div className="event-feed-form-time-container">
              <label className="event-feed-form-label">Ώρα</label>
              <input
                className="event-feed-form-time-input"
                type="number"
                name="quantity"
                min="0"
                max="23"
                value={this.state.eventHourInput}
                onChange={this.updateEventHourInput}
              />
              <label> : </label>
              <input
                className="event-feed-form-time-input"
                type="number"
                name="quantity"
                min="0"
                max="59"
                value={this.state.eventMinutesInput}
                onChange={this.updateEventMinutesInput}
              />
            </div>
          </div>
        </div>

        <button
          title="Δημιουργία"
          className="event-feed-form-submit"
          onClick={this.createEvent}
        >
          +
        </button>
      </div>
    );
    return form;
  }
}

export default EventFeedForm;
