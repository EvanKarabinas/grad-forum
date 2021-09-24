import React from "react";
import { Component } from "react";
import TopBar from "../TopBar";
import WelcomeContent from "../WelcomeContent";
import Login from "../Login";
import Register from "../Register";
import "./landingPage.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.clickConnect = this.clickConnect.bind(this);
  }
  state = {
    display: "welcome",
    loginError: false,
    loginErrorMessage: ""
  };

  clickLogin = () => {
    this.setState({ display: "login" });
  };

  clickRegister = () => {
    this.setState({ display: "register" });
  };
  clickCancel = () => {
    this.setState({ display: "welcome", loginError: false });
  };

  clickConnect(usernameInput, passwordInput) {
    fetch("login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput
      })
    })
      .then(res => {
        if (res.ok) {
          // console.log(res.text());
          this.setState({ display: "connected" });
          this.props.redirectHome();
        } else {
          return res.text();
          //this.setState({ dispaly: "login" });
        }
      })
      .then(message => {
        console.log("Error message " + message);
        this.setState({ loginError: true, loginErrorMessage: message });
      });
  }

  render() {
    let content;

    if (this.state.display === "welcome") {
      content = (
        <WelcomeContent
          clickLogin={this.clickLogin}
          clickRegister={this.clickRegister}
        />
      );
    } else if (this.state.display === "login") {
      if (!this.state.loginError)
        content = (
          <Login
            clickConnect={this.clickConnect}
            clickCancel={this.clickCancel}
          />
        );
      else {
        content = (
          <React.Fragment>
            <Login
              clickConnect={this.clickConnect}
              clickCancel={this.clickCancel}
              loginError={this.state.loginError}
              loginErrorMessage={this.state.loginErrorMessage}
            />
          </React.Fragment>
        );
      }
    } else if (this.state.display === "register") {
      content = (
        <Register
          clickConnect={this.clickConnect}
          clickCancel={this.clickCancel}
        />
      );
    }

    return (
      <div>
        <TopBar />
        <div className="welcome-body-container">{content}</div>
      </div>
    );
  }
}
export default LandingPage;
