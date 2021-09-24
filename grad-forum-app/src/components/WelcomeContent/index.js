import React from "react";
import { Component } from "react";
import WelcomeLabel from "../WelcomeLabel";
import networkImg from "../../network.png";
import graduateImg from "../../graduate.png";
import cvImg from "../../cv.png";
import WelcomeButton from "../WelcomeButton";
import "./welcomeContent.css";

class WelcomeContent extends Component {
  render() {
    return (
      <div className="welcome-content-container-1">
        <h1 className="welcome-header">Ένα μέρος. Όλοι εδώ.</h1>
        <p className="welcome-paragraph">
          Μια ιστοσελίδα για τη διασύνδεση των αποφοίτων του τμήματος Μηχανικών
          Η/Υ και Πληροφορικής του Πανεπιστημίου Ιωαννίνων.
        </p>
        <WelcomeLabel imgUrl={graduateImg} text="Βρες παλιούς συμφοιτητές." />
        <WelcomeLabel
          imgUrl={networkImg}
          text="Δημιούργησε και λάβε μέρος σε ομάδες συζητήσεων."
        />
        <WelcomeLabel
          imgUrl={cvImg}
          text="Μοιράσου και ανακάλυψε αγγελίες εύρεσης εργασίας."
        />
        <div className="welcome-button-container">
          <WelcomeButton text="Είσοδος" onClick={this.props.clickLogin} />
          <WelcomeButton text="Γίνε μέλος" onClick={this.props.clickRegister} />
        </div>
      </div>
    );
  }
}

export default WelcomeContent;
