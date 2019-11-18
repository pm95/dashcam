import React from "react";
import { Link } from "react-router-dom";
import carColored from "../assets/carColored.png";
import home from "../assets/home.png";
import "./styles/NewTrip.css";

class NewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageURL: "" };
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.renderUpload = this.renderUpload.bind(this);
  }

  handleUploadImage(ev) {
    this.setState({
      imageURL: "loading"
    });

    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);

    fetch("http://localhost:5000/api/submit", {
      method: "POST",
      body: data
    })
      .then(res => {
        return res.text();
      })
      .then(d => {
        console.log(d);
        this.setState({
          imageURL: "success"
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          imageURL: "error"
        });
      });
  }

  renderUpload() {
    let result = null;
    switch (this.state.imageURL) {
      case "":
        result = (
          <>
            <form onSubmit={this.handleUploadImage}>
              <div className="newtrip">
                <input
                  id="file-upload"
                  ref={ref => {
                    this.uploadInput = ref;
                  }}
                  type="file"
                  accept="video/*"
                  capture="camera"
                  required
                />
                <button>Submit</button>
                <div>
                  {this.state.imageURL === "" ? null : (
                    <p>Uploaded {this.state.imageURL}</p>
                  )}
                </div>
              </div>
            </form>
            <Link to="/">
              <button>
                <img src={home} alt="Home"></img>
              </button>
            </Link>
          </>
        );
        break;
      case "loading":
        result = (
          <>
            <h1 style={{ color: "white" }}>
              Uploading your video, please hang on ...
            </h1>
          </>
        );
        break;
      case "success":
        result = (
          <>
            <h1 style={{ color: "white" }}>Video uploaded successfully</h1>
            <button
              onClick={() => {
                this.setState({
                  imageURL: ""
                });
              }}
            >
              Upload new trip
            </button>
            <Link to="/">
              <button>
                <img src={home} alt="Home"></img>
              </button>
            </Link>
          </>
        );
        break;
      case "error":
        result = (
          <>
            <h1 style={{ color: "rgb(252, 67, 76)" }}>
              Error when uploading video
            </h1>
            <h2 style={{ color: "rgb(252, 67, 76)" }}>
              Likely due to server disconnect ...
            </h2>
            <button
              onClick={() => {
                this.setState({
                  imageURL: ""
                });
              }}
            >
              Upload new trip
            </button>
            <Link to="/">
              <button>
                <img src={home} alt="Home"></img>
              </button>
            </Link>
          </>
        );
    }
    return result;
  }

  render() {
    return (
      <div className="new-trip-container">
        <div className="new-trip-top">
          <h1>Record New Trip</h1>
          <img src={carColored} alt="Car"></img>
        </div>
        <div className="new-trip-bottom">{this.renderUpload()}</div>
      </div>
    );
  }
}

export default NewTrip;
