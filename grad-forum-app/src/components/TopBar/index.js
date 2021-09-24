import React from "react";
import { Component } from "react";
import BareButton from "../BareButton";
import Logo from "../Logo";
import Help from "../Help";

import "./topBar.css";

class TopBar extends Component {
  state = {
    helpVisible: false
  };

  clickHelp = () => {
    console.log("HELP LANDING: " + this.state.helpVisible);
    this.setState({ helpVisible: !this.state.helpVisible });
  };
  render() {
    return (
      <div className="top-bar">
        <Logo />
        <div className="top-bar-links">
          <BareButton text="Σχετικά" />
          <BareButton text="Βοήθεια" onClick={this.clickHelp} />
          {this.state.helpVisible && <Help closePopUp={this.clickHelp} />}
        </div>
      </div>
    );
  }
}
export default TopBar;
