import React from "react";
import { Link } from "react-router-dom";

import user from "../assets/user.png";
import home from "../assets/home.png";

import "./styles/Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "firstName",
      lastName: "lastName",
      email: "user@domain.com",
      carMake: "Toyota",
      carModel: "4Runner",
      plan: "Free",
      capacity: "100 GB",
      available: "100 GB"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const val = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: val
    });
  }

  updateAccountInfo() {
    console.log(this.state);
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/getuserdata", {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  calcStorageCapacity() {
    switch (this.state.plan) {
      case "Free":
        return "100 GB";
      case "Basic":
        return "500 GB";
      case "Pro":
        return "1 TB";
      case "Premium":
        return "4 TB";
      default:
        return "100 GB";
    }
  }

  getCurrentLocation() {
    console.log(
      navigator.geolocation.getCurrentPosition(pos => {
        let crd = pos.coords;

        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      })
    );
  }

  render() {
    return (
      <div className="profile-container">
        <div className="profile-top">
          <img src={user} alt="Profile"></img>
        </div>
        <div className="profile-bottom">
          <h1>Welcome {this.state.firstName}</h1>
          <div className="profile-info-wrapper">
            <h2>Account Information</h2>
            <div className="profile-info-container">
              <label>First Name</label>
              <input
                onChange={this.handleChange}
                name="firstName"
                type="text"
                value={this.state.firstName}
              ></input>

              <label>Last Name</label>
              <input
                onChange={this.handleChange}
                name="lastName"
                type="text"
                value={this.state.lastName}
              ></input>

              <label>Email</label>
              <input
                onChange={this.handleChange}
                name="email"
                type="text"
                value={this.state.email}
              ></input>

              <label>Car Make</label>
              <input
                onChange={this.handleChange}
                name="carMake"
                type="text"
                value={this.state.carMake}
              ></input>

              <label>Car Model</label>
              <input
                onChange={this.handleChange}
                name="carModel"
                type="text"
                value={this.state.carModel}
              ></input>
            </div>
          </div>

          <div className="profile-info-wrapper">
            <h2>Subscription Information</h2>
            <div className="profile-info-container">
              <label>Plan</label>
              <select
                value={this.state.plan}
                name="plan"
                onChange={this.handleChange}
              >
                <option value="Premium">Premium</option>
                <option value="Pro">Pro</option>
                <option value="Basic">Basic</option>
                <option value="Free">Free</option>
              </select>
              <label>Storage Capacity</label>
              <input
                type="text"
                value={this.calcStorageCapacity()}
                readOnly
              ></input>
              <label>Available Storage</label>
              <input
                type="text"
                value={this.calcStorageCapacity()}
                readOnly
              ></input>
            </div>
          </div>

          <button onClick={() => this.updateAccountInfo()}>Update Info</button>
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

export default Profile;
