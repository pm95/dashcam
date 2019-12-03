import React from "react";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-container">
        <div className="page-top">
          <h1>{this.props.pageTitle}</h1>
          <img src={this.props.imgSrc} alt="Page Img"></img>
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
