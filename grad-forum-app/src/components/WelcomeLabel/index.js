import React, { Component } from "react";
import "./welcomeLabel.css";
class WelcomeLabel extends Component {
  render() {
    return (
      <div className="welcome-label-container">
        <img
          alt=" url "
          className="welcome-label-image"
          src={this.props.imgUrl}
        />
        <span className="welcome-label-text">{this.props.text}</span>
      </div>
    );
  }
}

export default WelcomeLabel;
