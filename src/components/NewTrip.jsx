import React from "react";
import { Link } from "react-router-dom";
import carColored from "../assets/carColored.png";
import home from "../assets/home.png";

import { serverUrl } from "../Config";

import "./styles/NewTrip.css";

class NewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageURL: "", tripName: "", dataObj: null };
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.renderUpload = this.renderUpload.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleUploadImage(ev) {
    this.setState({
      imageURL: "loading"
    });

    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    data.append("tripName", this.state.tripName);

    fetch(serverUrl + "/api/submit", {
      method: "POST",
      body: data
    })
      .then(res => {
        return res.text();
      })
      .then(d => {
        this.setState({
          imageURL: "success"
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          imageURL: "error",
          dataObj: data
        });
      });
  }

  handleExistingImageUpload() {
    console.log("asdf");
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
    switch (this.state.imageURL) {
      case "":
        result = (
          <>
            <form onSubmit={this.handleUploadImage}>
              <div className="new-trip-data">
                <label>Enter trip name</label>
                <input
                  type="text"
                  name="tripName"
                  required
                  value={this.state.tripName}
                  onChange={this.handleInputChange}
                ></input>
                <button className="file-input-container">
                  New Trip
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
                  {this.state.imageURL === "" ? null : (
                    <p>Uploaded {this.state.imageURL}</p>
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
                  imageURL: ""
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
                  imageURL: ""
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
          <h1>Record New Trip</h1>
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
