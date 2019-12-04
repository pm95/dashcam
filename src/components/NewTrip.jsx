import React from "react";
import Page from "./Page";
import { serverUrl } from "../Config";

import undrawNewTrip from "../assets/undrawNewTrip.png";
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
    ev.preventDefault();
    const email = localStorage.getItem("email");

    if (email && email !== "NOT FOUND" && email !== "") {
      this.setState({
        uploadState: "loading"
      });

      const data = new FormData();
      const file = this.uploadInput.files[0];
      const videoName = file.name;

      data.append("file", file);
      data.append("videoName", videoName);
      data.append("email", email);

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
    } else {
      alert("You must log in first");
    }
  }

  handleExistingImageUpload() {
    alert("re-submitting previous attempt");
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
              </div>
            </form>
          </>
        );
        break;
      case "loading":
        result = (
          <>
            <h1>Uploading your video, please hang on ...</h1>
          </>
        );
        break;
      case "success":
        result = (
          <>
            <h1 style={{ color: "#84a887" }}>Video uploaded successfully</h1>
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
            <h1 style={{ color: "#a88484" }}>
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
            <h1 style={{ color: "rgb(255, 86, 100)" }}>
              Error when uploading video
            </h1>
            <h2 style={{ color: "rgb(205, 36, 50)" }}>
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
      <Page pageTitle="New Trip" pageImgSrc={undrawNewTrip}>
        {this.renderUpload()}
      </Page>
    );
  }
}

export default NewTrip;
