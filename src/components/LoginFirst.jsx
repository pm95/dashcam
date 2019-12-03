import React from "react";
import undrawError from "../assets/undrawError.png";
import "./styles/LoginFirst.css";

function LoginFirst() {
  return (
    <div className="login-first-container">
      <h1>You must login first</h1>
      <img
        src={undrawError}
        className="login-first-img"
        alt="Login Error"
      ></img>
    </div>
  );
}

export default LoginFirst;
