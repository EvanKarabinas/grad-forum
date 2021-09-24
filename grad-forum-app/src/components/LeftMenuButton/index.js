import React, { Component } from "react";
import "./leftMenuButton.css";

class LeftMenuButton extends Component {
  state = {};
  render() {
    return (
      <button
        onClick={this.props.fetchData}
        className={
          this.props.selected ? "left-menu-button-selected" : "left-menu-button"
        }
      >
        {this.props.text}
      </button>
    );
  }
}

export default LeftMenuButton;
