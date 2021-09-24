import React, { Component } from "react";
import "./loginInput.css";
class LoginInput extends Component {
  render() {
    return (
      <input
        className="login-input"
        type={this.props.type}
        name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.props.onChangeValue}
      />
    );
  }
}

export default LoginInput;
