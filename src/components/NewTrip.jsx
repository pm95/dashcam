import React from "react";
import { Link } from "react-router-dom";
import carColored from "../assets/carColored.png";
import home from "../assets/home.png";

import { serverUrl } from "../Config";

import "./styles/NewTrip.css";

class NewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadState: "",
      tripName: "",
      dataObj: null,
      videoLoaded: false
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.renderUpload = this.renderUpload.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleUploadImage(ev) {
    this.setState({
      uploadState: "loading"
    });

    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    data.append("videoName", this.uploadInput.files[0].name);
    data.append("email", localStorage.getItem("email"));

    fetch(serverUrl + "/api/submit", {
      method: "POST",
      body: data
    })
      .then(res => {
        return res.text();
      })
      .then(d => {
        this.setState({
          uploadState: d
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          uploadState: "error",
          dataObj: data
        });
      });
  }

  handleExistingImageUpload() {
    if (this.state.dataObj !== null) {
      fetch(serverUrl + "/api/submit", {
        method: "POST",
        body: this.state.dataObj
      })
        .then(res => {
          return res.text();
        })
        .then(d => {
          this.setState({
            uploadState: d
          });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            uploadState: "error"
          });
        });
    }
  }

  handleInputChange(e) {
    const val = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: val
    });
  }

  renderUpload() {
    let result = null;
    switch (this.state.uploadState) {
      case "":
        result = (
          <>
            <form onSubmit={this.handleUploadImage}>
              <div className="new-trip-data">
                <button className="file-input-container">
                  Start New
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
                </button>

                <button>Submit</button>
                <div>
                  {this.state.uploadState === "" ? null : (
                    <p>Uploaded {this.state.uploadState}</p>
                  )}
                </div>
              </div>
            </form>
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
                  uploadState: ""
                });
              }}
            >
              Upload new trip
            </button>
          </>
        );
        break;
      case "failure":
        result = (
          <>
            <h1 style={{ color: "yellow" }}>
              Video/email combination already exists
            </h1>
            <button
              onClick={() => {
                this.setState({
                  uploadState: ""
                });
              }}
            >
              Upload new trip
            </button>
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
                this.handleExistingImageUpload();
              }}
            >
              Re-upload current trip
            </button>
            <button
              onClick={() => {
                this.setState({
                  uploadState: ""
                });
              }}
            >
              Upload new trip
            </button>
          </>
        );
        break;
      default:
        result = null;
    }
    return result;
  }

  render() {
    return (
      <div className="new-trip-container">
        <div className="new-trip-top">
          <h1>New Trip</h1>
          <img src={carColored} alt="Car"></img>
        </div>
        <div className="new-trip-bottom">
          {this.renderUpload()}
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

export default NewTrip;
