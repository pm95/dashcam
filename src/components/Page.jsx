import React from "react";
import { Link } from "react-router-dom";
import home from "../assets/home.png";

import "./styles/Page.css";

export default function Page(props) {
  return (
    <div className="page-container">
      <div className="page-top">
        <h1>{props.pageTitle}</h1>
        <img src={props.pageImgSrc} alt="Page Img" className="page-img"></img>
      </div>
      <div className="page-bottom">
        {props.children}
        <Link to="/main">
          <button>
            <img src={home} alt="Home"></img>
          </button>
        </Link>
      </div>
    </div>
  );
}
