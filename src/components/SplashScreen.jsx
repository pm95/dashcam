import React from "react";
import { Link, Redirect } from "react-router-dom";
import { serverUrl } from "../Config";
import "./styles/SplashScreen.css";

class LoginContainer extends React.Component {
  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return (
      <div className="login-container">
        <h1>Secure Dashboard</h1>

        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <div>
          <p style={{ fontSize: "10pt" }}>University of Arkansas</p>
          <p style={{ fontSize: "10pt" }}>CSCE 5623 Mobile Programming</p>
          <p style={{ fontSize: "10pt" }}>Pietro Malky © 2019</p>
        </div>
      </div>
    );
  }
}

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      plan: "Free",
      validEmail: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const val = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: val
    });
  }

  handleSignup(e) {
    e.preventDefault();
    fetch(serverUrl + "/api/signup", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(this.state)
    })
      .then(res => {
        return res.text();
      })
      .then(data => {
        if (data === "user created") {
          localStorage.setItem("email", this.state.email);
          this.setState({
            validEmail: true
          });
        } else {
          alert("That email is already taken");
          this.setState({
            email: "",
            validEmail: false
          });
          localStorage.clear();
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    localStorage.clear();
  }

  render() {
    if (this.state.validEmail) {
      return <Redirect to="/main"></Redirect>;
    }
    return (
      <div className="splashscreen">
        <div className="splashscreen-background"></div>

        <div className="signup-container">
          <h1>Create your account</h1>
          <form className="signup-form-container" onSubmit={this.handleSignup}>
            <input
              required
              value={this.state.firstName}
              placeholder="First Name"
              name="firstName"
              type="text"
              onChange={this.handleChange}
            ></input>
            <input
              required
              value={this.state.lastName}
              placeholder="Last Name"
              name="lastName"
              type="text"
              onChange={this.handleChange}
            ></input>
            <input
              required
              value={this.state.email}
              placeholder="user@domain.com"
              name="email"
              type="email"
              onChange={this.handleChange}
            ></input>
            <div>
              <label>Storage plan</label>
              <select
                value={this.state.plan}
                name="plan"
                type="text"
                onChange={this.handleChange}
              >
                <option value="Premium">Premium</option>
                <option value="Pro">Pro</option>
                <option value="Basic">Basic</option>
                <option value="Free">Free</option>
              </select>
            </div>
            <button>Sign Up</button>
          </form>

          <div>
            <p style={{ fontSize: "10pt" }}>University of Arkansas</p>
            <p style={{ fontSize: "10pt" }}>CSCE 5623 Mobile Programming</p>
            <p style={{ fontSize: "10pt" }}>Pietro Malky © 2019</p>
          </div>
        </div>
      </div>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      authenticated: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const val = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: val
    });
  }

  handleClick(e) {
    e.preventDefault();
    fetch(serverUrl + "/api/login", {
      method: "POST",
      body: this.state.email
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.email !== "NOT FOUND") {
          this.setState({
            authenticated: true
          });
          localStorage.setItem("email", this.state.email);
        } else {
          this.setState({
            email: ""
          });
          alert("We couldn't find that email, please try again");
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.setState({
      authenticated: false,
      email: ""
    });
    localStorage.clear();
  }

  render() {
    if (this.state.authenticated) {
      return <Redirect to="/main"></Redirect>;
    }
    return (
      <div className="splashscreen">
        <div className="splashscreen-background"></div>

        <div className="login-container">
          <h1>Email Login</h1>
          <form className="login-form-container" onSubmit={this.handleClick}>
            <input
              value={this.state.email}
              placeholder="user@domain.com"
              name="email"
              type="email"
              required
              onChange={this.handleChange}
            ></input>
            <button>Login</button>
          </form>

          <div>
            <p style={{ fontSize: "10pt" }}>University of Arkansas</p>
            <p style={{ fontSize: "10pt" }}>CSCE 5623 Mobile Programming</p>
            <p style={{ fontSize: "10pt" }}>Pietro Malky © 2019</p>
          </div>
        </div>
      </div>
    );
  }
}

class SplashScreen extends React.Component {
  componentDidMount() {
    localStorage.clear();
  }
  render() {
    return (
      <div className="splashscreen">
        <div className="splashscreen-background"></div>
        <LoginContainer></LoginContainer>
      </div>
    );
  }
}

export { SplashScreen, LoginForm, SignupForm };
