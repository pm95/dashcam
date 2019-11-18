import React from "react";
import { Link } from "react-router-dom";

import "./NewTrip.css";

class NewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageURL: "" };
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);

    this.setState({
      imageURL: URL.createObjectURL(this.uploadInput.files[0])
    });

    fetch("http://10.35.42.221:5000/api/submit", {
      method: "POST",
      mode: "no-cors",
      body: data
    })
      .then(res => {
        alert("trip video uploaded successfully");
      })
      .catch(err => {
        alert("error when uploading your trip");
        console.error(err);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div className="newtrip">
          <h1>Record New Trip</h1>
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
              <img
                src={this.state.imageURL}
                alt="vid"
                className="trip-video-container"
              />
            )}
          </div>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      </form>
    );
  }
}

export default NewTrip;
