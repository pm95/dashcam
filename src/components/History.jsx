import React from "react";
import { Link } from "react-router-dom";

import calendar from "../assets/calendar.png";
import home from "../assets/home.png";

import { serverUrl } from "../Config";

import "./styles/History.css";

class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoBlobs: []
    };

    this.fetchVideoList = this.fetchVideoList.bind(this);
  }

  fetchVideoList() {
    const email = localStorage.getItem("email");
    fetch(serverUrl + "/api/history", { method: "POST", body: email })
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data.videos;
      })
      .then(videoNames => {
        videoNames.map(vid => {
          return fetch(serverUrl + "/api/getvideo", {
            method: "POST",
            body: vid
          })
            .then(res => {
              return res.blob();
            })
            .then(data => {
              this.setState({
                videoBlobs: [
                  ...this.state.videoBlobs,
                  URL.createObjectURL(data)
                ]
              });
            })
            .catch(err => {
              console.error(err);
            });
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.fetchVideoList();
  }

  render() {
    return (
      <div className="history-container">
        <div className="history-top">
          <img src={calendar} alt="history"></img>
        </div>
        <div className="history-bottom">
          <h1>Your Trip History</h1>

          <div className="history-video-container">
            {this.state.videoBlobs.map(vid => {
              return (
                <video
                  key={vid}
                  className="history-video"
                  muted
                  controls
                  playsInline
                  src={vid}
                  type="video/*"
                ></video>
              );
            })}
          </div>

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

export default History;
