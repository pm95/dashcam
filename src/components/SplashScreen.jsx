import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./styles/SplashScreen.css";

localStorage.removeItem("email");

class LoginContainer extends React.Component {
  render() {
    return (
      <div className="login-container">
        <h1>Secure Dashboard</h1>

        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/">
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

  componentDidMount() {
    this.setState({
      authenticated: false,
      email: ""
    });
    localStorage.removeItem("email");
  }

  handleClick() {
    fetch("http://localhost:5000/api/login", {
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
          localStorage.setItem("email", data.email);
        }
      })
      .catch(err => {
        console.error(err);
      });
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

          <div className="login-form-container">
            <input
              value={this.state.email}
              placeholder="user@domain.com"
              name="email"
              type="text"
              onChange={this.handleChange}
            ></input>
            <button onClick={this.handleClick}>Login</button>
          </div>

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
  render() {
    return (
      <div className="splashscreen">
        <div className="splashscreen-background"></div>
        <LoginContainer></LoginContainer>
      </div>
    );
  }
}

export { SplashScreen, LoginForm };
