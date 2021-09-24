import React from "react";
import { Component } from "react";
// import logoPhoto from "../../logo-photo.png";
import "./logo.css";

class Logo extends Component {
  render() {
    return (
      <div className="logo-container">
        {/* <img className="logo-image" src={logoPhoto} /> */}
        <p className="logo-text">GradForum</p>
      </div>
    );
  }
}
export default Logo;
