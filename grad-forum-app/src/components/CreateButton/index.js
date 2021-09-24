import React, { Component } from "react";
import "./createButton.css";
import createButtonIcon from "../../create.png";

class CreateButton extends Component {
  state = {};
  render() {
    return (
      <button className="create-button" onClick={this.props.toggleForm}>
        <img
          alt="create button"
          className="create-button-icon"
          src={createButtonIcon}
        />
      </button>
    );
  }
}

export default CreateButton;
