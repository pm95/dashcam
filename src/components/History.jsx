import React from "react";
import { Link } from "react-router-dom";

import calendar from "../assets/calendar.png";
import home from "../assets/home.png";

import "./styles/History.css";

class History extends React.Component {
  render() {
    return (
      <div className="history-container">
        <div className="history-top">
          <img src={calendar} alt="history"></img>
        </div>
        <div className="history-bottom">
          <h1>Your Trip History</h1>
          <Link to="/main">
            <button>
              <img src={home} alt="Home"></img>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default History;
