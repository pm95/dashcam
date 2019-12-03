import React from "react";
import Page from "./Page";
import { serverUrl } from "../Config";

import undrawProfile from "../assets/undrawProfile.png";
import "./styles/Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "firstName",
      lastName: "lastName",
      email: "user@domain.com",
      plan: "Free"
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateAccountInfo = this.updateAccountInfo.bind(this);
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
    fetch(serverUrl + "/api/updateuser", {
      method: "POST",
      body: JSON.stringify(this.state)
    })
      .then(res => {
        return res.text();
      })
      .then(data => {
        alert(data);
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    const email = localStorage.getItem("email");
    fetch(serverUrl + "/api/login", {
      method: "POST",
      body: email
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          plan: data.plan
        });
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

  render() {
    return (
      <Page pageTitle="Profile" pageImgSrc={undrawProfile}>
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
              type="text"
              style={{ cursor: "not-allowed" }}
              readOnly
              value={this.state.email}
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
        <button onClick={this.updateAccountInfo}>Update Info</button>
      </Page>
    );
  }
}

export default Profile;
