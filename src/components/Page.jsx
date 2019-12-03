import React from "react";
import { Link } from "react-router-dom";
import home from "../assets/home.png";

import "./styles/Page.css";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-container">
        <div className="page-top">
          <h1>{this.props.pageTitle}</h1>
          <img src={this.props.pageImgSrc} alt="Page Img"></img>
        </div>
        <div className="page-bottom">
          {this.props.children}
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
