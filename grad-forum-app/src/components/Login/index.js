import React, { Component } from "react";
import LoginInput from "../loginInput";
import WelcomeButton from "../WelcomeButton";
import "./login.css";

class Login extends Component {
  state = { username: "", password: "" };

  handleUsernameInput = e => this.setState({ username: e.target.value });
  handlePasswordInput = e => this.setState({ password: e.target.value });
  connect = () => {
    this.props.clickConnect(this.state.username, this.state.password);
  };

  render() {
    return (
      <div className="login-content-container">
        <h1 className="login-header">Είσοδος</h1>
        <p className="login-paragraph">
          Μια ιστοσελίδα για τη διασύνδεση των αποφοίτων του τμήματος Μηχανικών
          Η/Υ και Πληροφορικής του Πανεπιστημίου Ιωαννίνων.
        </p>
        {this.props.loginError && (
          <div className="login-error-message">
            {this.props.loginErrorMessage}
          </div>
        )}
        <LoginInput
          value={this.state.username}
          onChangeValue={this.handleUsernameInput}
          type="text"
          name="username"
          placeholder="Όνομα χρήστη"
        />
        <LoginInput
          value={this.state.password}
          onChangeValue={this.handlePasswordInput}
          type="password"
          name="password"
          placeholder="Κωδικός πρόσβασης"
        />

        <div className="login-button-container">
          <WelcomeButton
            text="Σύνδεση"
            onClick={this.connect}
            getPassword={this.getPassword}
          />
          <WelcomeButton text="Ακύρωση" onClick={this.props.clickCancel} />
        </div>
      </div>
    );
  }
}

export default Login;
