import React from "react";
import Page from "./Page";

import undrawCalendar from "../assets/undrawCalendar.png";

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
        videoNames.map(async vid => {
          console.log(vid);
          try {
            const res = await fetch(serverUrl + "/api/getvideo", {
              method: "POST",
              body: vid
            });
            const data = await res.blob();
            this.setState({
              videoBlobs: [...this.state.videoBlobs, URL.createObjectURL(data)]
            });
          } catch (err) {
            console.error(err);
          }
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
      <Page pageTitle="Your Trip History" pageImgSrc={undrawCalendar}>
        <div className="history-video-container">
          {this.state.videoBlobs.map(vid => {
            return (
              <video
                key={vid}
                className="history-video"
                muted
                controls
                playsInline
                autoPlay
                src={vid}
                type="video/MOV"
              ></video>
            );
          })}
        </div>
      </Page>
    );
  }
}

export default History;
