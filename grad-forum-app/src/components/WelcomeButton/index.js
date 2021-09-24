import React, { Component } from "react";
import "./welcomeButton.css";
class WelcomeButton extends Component {
  state = {};
  render() {
    return (
      <button className="welcome-button" onClick={this.props.onClick}>
        {" "}
        {this.props.text}
      </button>
    );
  }
}

export default WelcomeButton;
