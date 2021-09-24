import React from "react";
import { Component } from "react";
import Logo from "../Logo";
import BarMenu from "../BarMenu";
import "./homeTopBar.css";

class TopBar extends Component {
  render() {
    return (
      <div className="home-top-bar">
        <Logo />
        <BarMenu redirectHome={this.props.redirectHome} />
      </div>
    );
  }
}
export default TopBar;
