import React from "react";
import { Link } from "react-router-dom";

import Option from "./Option";

import dashboard from "../assets/dashboard.png";
import history from "../assets/history.png";
import cameraadd from "../assets/camera-add.png";

import "./Main.css";

function Main() {
  return (
    <div className="main">
      <Option>
        <div>
          <h2>Record new trip</h2>
        </div>
        <Link to="/new">
          <img className="link-icon" alt="add" src={cameraadd}></img>
        </Link>
      </Option>
      <Option>
        <h2>Explore previous trips</h2>
        <Link to="/history">
          <img className="link-icon" alt="htr" src={history}></img>
        </Link>
      </Option>
      <Option>
        <h2>View profile</h2>
        <Link to="/profile">
          <img className="link-icon" alt="dsh" src={dashboard}></img>
        </Link>
      </Option>
    </div>
  );
}

export default Main;
