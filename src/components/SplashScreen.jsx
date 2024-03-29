import React from "react";
import { Link } from "react-router-dom";

import "./styles/SplashScreen.css";

class SplashScreen extends React.Component {
  render() {
    return (
      <div className="splashscreen">
        <div className="splashscreen-background"></div>
        <div className="login-container">
          <h1>Secure Dashboard</h1>
          <Link to="/main">
            <button>Login</button>
          </Link>
          <Link to="/main">
            <button>Sign Up</button>
          </Link>
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

export default SplashScreen;
