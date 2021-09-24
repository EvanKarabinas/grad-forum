import React from "react";
import { Component } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";

import Home from "./components/Home";

class App extends Component {
  state = {
    loggedIn: false,
    userId: null
  };

  componentWillMount() {
    this.redirectHome();
  }

  redirectHome = () => {
    fetch("session", { credentials: "include" }).then(res => {
      if (res.ok) {
        res.text().then(userId => {
          localStorage.setItem("userId", userId);
          this.setState({ loggedIn: true });
        });
      } else {
        this.setState({ loggedIn: false });
      }
      console.log("logged in :" + this.state.loggedIn);
    });
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <Home useId={this.state.userId} redirectHome={this.redirectHome} />
      );
    } else {
      return <LandingPage redirectHome={this.redirectHome} />;
    }
  }
}

export default App;
