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

    fetch("http://10.35.42.221:5000/api/submit", {
      method: "POST",
      mode: "no-cors",
      body: data
    })
      .then(res => {
        console.log("success");
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
    if (this.state.imageURL === "") {
      return (
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
    } else if (this.state.imageURL === "loading") {
      return (
        <>
          <h1 style={{ color: "white" }}>
            Uploading your video, please hang on ...
          </h1>
        </>
      );
    } else if (this.state.imageURL === "success") {
      return (
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
    } else if (this.state.imageURL === "error") {
      return (
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
