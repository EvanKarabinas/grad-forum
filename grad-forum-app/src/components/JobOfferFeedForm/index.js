import React, { Component } from "react";
import "./jobOfferFeedForm.css";
import sendIcon from "../../send.png";

class JobOfferFeedForm extends Component {
  state = {
    jobOfferTitleInput: "",
    jobOfferDescriptionInput: "",
    jobOfferType: "offer"
  };

  createJobOffer = () => {
    fetch("jobOffers", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: this.state.jobOfferTitleInput,
        description: this.state.jobOfferDescriptionInput,
        type: this.state.jobOfferType
      })
    }).then(res => {
      console.log(res.text());
      this.props.updateJobOffersFeed();
    });
  };

  updateJobOfferTitleInput = e => {
    this.setState({
      jobOfferTitleInput: e.target.value
    });
  };

  updateJobOfferDescriptionInput = e => {
    this.setState({
      jobOfferDescriptionInput: e.target.value
    });
  };

  chooseOfferType = () => {
    this.setState({
      jobOfferType: "offer"
    });
  };

  chooseDemandType = () => {
    this.setState({
      jobOfferType: "demand"
    });
  };

  render() {
    let form;
    form = (
      <div className="job-offer-feed-form-container">
        <div className="job-offer-feed-form-center-column">
          <p className="job-offer-feed-form-title">Δημιουργία Αγγελίας</p>
          <div className="job-offer-feed-form-label ">Η Αγγελία αφορά :</div>
          <div className="job-offer-buttons-choice-container">
            {this.state.jobOfferType === "offer" ? (
              <button
                className="job-offer-buttons-choice-active"
                onClick={this.chooseOfferType}
              >
                Προσφορά
              </button>
            ) : (
              <button
                className="job-offer-buttons-choice"
                onClick={this.chooseOfferType}
              >
                Προσφορά
              </button>
            )}
            {this.state.jobOfferType === "demand" ? (
              <button
                className="job-offer-buttons-choice-active"
                onClick={this.chooseDemandType}
              >
                Ζήτηση
              </button>
            ) : (
              <button
                className="job-offer-buttons-choice"
                onClick={this.chooseDemandType}
              >
                Ζήτηση
              </button>
            )}
          </div>

          <label className="job-offer-feed-form-label">Τίτλος</label>
          <input
            className="job-offer-feed-form-input"
            type="text"
            value={this.state.jobOfferTitleInput}
            onChange={this.updateJobOfferTitleInput}
          />
          <label className="job-offer-feed-form-label">Περιγραφή</label>

          <textarea
            className="job-offer-feed-form-input"
            type="text"
            value={this.state.jobOfferDescriprionInput}
            onChange={this.updateJobOfferDescriptionInput}
          />
        </div>
        <button
          title="Δημιουργία"
          className="job-offer-feed-form-submit"
          onClick={this.createJobOffer}
        >
          <img alt="sendicon" className="job-offer-send-icon" src={sendIcon} />
        </button>
      </div>
    );
    return form;
  }
}

export default JobOfferFeedForm;
