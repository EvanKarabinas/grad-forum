import React, { Component } from "react";
import LoginInput from "../loginInput";
import WelcomeButton from "../WelcomeButton";
import "./register.css";

class Register extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: "uploads/profile2.png"
  };

  handleUsernameInput = e => this.setState({ username: e.target.value });
  handlePasswordInput = e => this.setState({ password: e.target.value });
  handleFirstNameInput = e => this.setState({ firstName: e.target.value });
  handleLastNameInput = e => this.setState({ lastName: e.target.value });
  handleEmailInput = e => this.setState({ email: e.target.value });
  handlePhotoInput = e =>
    this.setState({ profilePhoto: URL.createObjectURL(e.target.files[0]) });

  connect = () => {
    this.props.clickConnect(this.state.username, this.state.password);
  };

  render() {
    return (
      <div className="register-content-container">
        <h1 className="register-header">Εγγραφή</h1>
        <p className="register-paragraph">
          Μια ιστοσελίδα για τη διασύνδεση των αποφοίτων του τμήματος Μηχανικών
          Η/Υ και Πληροφορικής του Πανεπιστημίου Ιωαννίνων.
        </p>
        <img
          alt="profile"
          className="register-profile-photo"
          src={this.state.profilePhoto}
        />
        {this.props.loginError && <div>Error in username or password.</div>}
        <form
          className="register-form"
          method="post"
          action="register"
          encType="multipart/form-data"
        >
          <LoginInput
            value={this.state.email}
            onChangeValue={this.handleEmailInput}
            type="email"
            name="email"
            placeholder="Email"
          />
          <LoginInput
            value={this.state.firstName}
            onChangeValue={this.handleFirstNameInput}
            type="text"
            name="first_name"
            placeholder="Όνομα"
          />
          <LoginInput
            value={this.state.lastName}
            onChangeValue={this.handleLastNameInput}
            type="text"
            name="last_name"
            placeholder="Επώνυμο"
          />
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
          <label htmlFor="file-upload" className="custom-file-upload">
            <i className="fa fa-cloud-upload" /> Φωτογραφία Προφίλ
          </label>
          <input
            id="file-upload"
            type="file"
            name="profile_photo"
            accept="image/*"
            onChange={this.handlePhotoInput}
          />

          <div className="register-button-container">
            <button type="submit" className="register-button">
              Εγγραφή
            </button>
            <WelcomeButton text="Ακύρωση" onClick={this.props.clickCancel} />
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
