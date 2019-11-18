import React from "react";
import { Link } from "react-router-dom";

import user from "../assets/user.png";
import home from "../assets/home.png";

import "./styles/Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Pietro",
      lastName: "Malky",
      carMake: "Toyota",
      carModel: "4Runner"
    };
  }

  render() {
    return (
      <div className="profile-container">
        <div className="profile-top">
          <img src={user} alt="Profile"></img>
        </div>
        <div className="profile-bottom">
          <h1>Welcome, {this.state.firstName}</h1>
          <div className="profile-info-wrapper">
            <h2>Account Information</h2>
            <div className="profile-info-container">
              <label>First Name</label>
              <input type="text" value={this.state.firstName}></input>

              <label>Last Name</label>
              <input type="text" value={this.state.lastName}></input>

              <label>Car Make</label>
              <input type="text" value={this.state.carMake}></input>

              <label>Car Model</label>
              <input type="text" value={this.state.carModel}></input>
            </div>
          </div>

          <Link to="/">
            <button>
              <img src={home} alt="Home"></img>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Profile;
