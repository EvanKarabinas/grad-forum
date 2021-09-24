import React from "react";
import { Component } from "react";
import "./bareButton.css";

class BareButton extends Component {
  render() {
    return (
      <button className="bare-button" onClick={this.props.onClick}>
        {" "}
        {this.props.text}
      </button>
    );
  }
}
export default BareButton;
