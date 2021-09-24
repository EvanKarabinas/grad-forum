import React, { Component } from "react";
import "./profilePopUp.css";
import { fetchData, fetchPhoto } from "../../utils";

import exitPopUp from "../../exit-group.png";

class ProfilePopUp extends Component {
  state = {
    popUpVisible: true,
    user: [],
    profilePhoto: "",
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    passwordOldInput: "",
    passwordNewInput: "",
    message: <div className="profile-pop-up-hidden">*</div>
  };

  componentDidMount() {
    this.fetchUser();
  }

  handleFirstNameInput = e => {
    this.setState({ firstNameInput: e.target.value });
  };

  handleLastNameInput = e => {
    this.setState({ lastNameInput: e.target.value });
  };

  handleEmailInput = e => {
    this.setState({ emailInput: e.target.value });
  };
  handlePasswordOldInput = e => {
    this.setState({ passwordOldInput: e.target.value });
  };

  handlePasswordNewInput = e => {
    this.setState({ passwordNewInput: e.target.value });
  };

  handlePhotoInput = e => {
    this.setState({ profilePhoto: URL.createObjectURL(e.target.files[0]) });
    console.log("PHOTO URL:" + URL.createObjectURL(e.target.files[0]));
  };

  fetchUser = async () => {
    let user = await fetchData("users/" + localStorage.getItem("userId"));
    this.setState({
      user: user[0],
      firstNameInput: user[0].first_name,
      lastNameInput: user[0].last_name,
      emailInput: user[0].email,
      profilePhoto: fetchPhoto(user[0].profile_photo)
    });
  };

  updateUser = e => {
    e.preventDefault();
    if (this.state.firstNameInput === "")
      return this.setState({
        message: (
          <div className="profile-pop-up-error">
            Το πεδίο Όνομα δεν πρέπει να είναι κενό.
          </div>
        )
      });

    if (this.state.lastNameInput === "")
      return this.setState({
        message: (
          <div className="profile-pop-up-error">
            Το πεδίο Επίθετο δεν πρέπει να είναι κενό.
          </div>
        )
      });

    if (this.state.emailInput === "")
      return this.setState({
        message: (
          <div className="profile-pop-up-error">
            Το πεδίο Email δεν πρέπει να είναι κενό.
          </div>
        )
      });

    fetch("users/" + localStorage.getItem("userId"), {
      method: "post",
      credentials: "include",
      body: new FormData(e.target)
    }).then(res => {
      console.log(res.text());
      if (res.ok) {
        this.setState({
          message: (
            <div className="profile-pop-up-success">
              ✅ Οι αλλαγές πραγματοποιήθηκαν επιτυχώς
            </div>
          )
        });
      } else {
        this.setState({
          message: <div className="profile-pop-up-error">Λάθος κωδικός</div>
        });
      }
    });
  };
  render() {
    return (
      <div className="profile-pop-up-shadow" onClick={this.props.clickProfile}>
        <form
          className="profile-pop-up-register-form"
          method="post"
          action={"users/" + localStorage.getItem("userId")}
          encType="multipart/form-data"
          onSubmit={this.updateUser}
        >
          <div
            className="profile-pop-up-container"
            onClick={e => e.stopPropagation()}
          >
            <div className="profile-pop-up-exit-button-container">
              <button
                className="profile-pop-up-exit-button"
                onClick={this.props.clickProfile}
              >
                <img
                  alt="exit button"
                  className="exit-button-icon"
                  src={exitPopUp}
                />
              </button>
            </div>

            <p className="profile-pop-up-title">Επεξεργασία Προφίλ</p>
            {this.state.message}

            <div className="profile-pop-up-content">
              <div className="profile-pop-up-image-container">
                <img
                  className="profile-pop-up-image"
                  alt="profile"
                  src={this.state.profilePhoto}
                ></img>
                <label
                  htmlFor="file-upload"
                  className="profile-pop-up-image-button"
                >
                  <i className="fa fa-cloud-upload" /> Αλλαγή Φωτογραφίας Προφίλ
                </label>
                <input
                  id="file-upload"
                  type="file"
                  name="profile_photo"
                  accept="image/*"
                  onChange={this.handlePhotoInput}
                />
              </div>

              <div className="profile-pop-up-row">
                <div className="profile-pop-input-container">
                  <p className="profile-pop-up-label">Όνομα</p>
                  <input
                    className="profile-pop-up-input"
                    type="text"
                    name="first_name"
                    value={this.state.firstNameInput}
                    onChange={this.handleFirstNameInput}
                  />
                </div>
                <div className="profile-pop-input-container">
                  <p className="profile-pop-up-label">Επίθετο</p>
                  <input
                    className="profile-pop-up-input"
                    type="text"
                    name="last_name"
                    value={this.state.lastNameInput}
                    onChange={this.handleLastNameInput}
                  />
                </div>
              </div>
              <div className="profile-pop-up-row">
                <div className="profile-pop-input-container">
                  <p className="profile-pop-up-label">Email</p>
                  <input
                    className="profile-pop-up-input-email"
                    type="text"
                    name="email"
                    value={this.state.emailInput}
                    onChange={this.handleEmailInput}
                  />
                </div>
              </div>
              <p className="profile-pop-up-subtitle">
                {" "}
                Αλλαγή Κωδικού πρόσβασης
              </p>
              <div className="profile-pop-up-row">
                <div className="profile-pop-input-container">
                  <p className="profile-pop-up-label">Κωδικός πρόσβασης</p>
                  <input
                    className="profile-pop-up-input"
                    type="password"
                    name="old_password"
                    value={this.state.passwordOldlInput}
                    onChange={this.handlePasswordOldInput}
                  />
                </div>
                <div className="profile-pop-input-container">
                  <p className="profile-pop-up-label">
                    {" "}
                    Νέος κωδικός πρόσβασης{" "}
                  </p>
                  <input
                    className="profile-pop-up-input"
                    type="password"
                    name="new_password"
                    value={this.state.passwordNewlInput}
                    onChange={this.handlePasswordNewInput}
                  />
                </div>
              </div>
            </div>

            <div className="profile-pop-up-buttons-container">
              <button className="profile-pop-up-button-save" type="submit">
                Αποθήκευση
              </button>
              <button
                className="profile-pop-up-button-cancel"
                onClick={this.props.clickProfile}
              >
                Ακύρωση
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ProfilePopUp;
