import React from "react";
import Page from "./Page";

import undrawCalendar from "../assets/undrawCalendar.png";

import { serverUrl } from "../Config";

import "./styles/History.css";

class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoBlobs: [],
      videoDict: {}
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
            const blobURL = URL.createObjectURL(data);
            this.setState({
              videoBlobs: [...this.state.videoBlobs, blobURL],
              videoDict: { ...this.state.videoDict, [blobURL]: vid }
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

  deleteVideo(blobURL) {
    const videoName = this.state.videoDict[blobURL];
    fetch(serverUrl + "/api/deletevideo", {
      method: "POST",
      body: videoName
    })
      .then(res => {
        return res.text();
      })
      .then(data => {
        if (data === "success") {
          // remove key from blobUrl:video name "dictionary"
          let newVideoDict = { ...this.state.videoDict };
          delete newVideoDict[blobURL];

          //   filter out blob from video blobs array
          const newVideoBlobs = [...this.state.videoBlobs].filter(vb => {
            return vb !== blobURL;
          });

          //   set the new state
          this.setState({
            videoDict: { ...newVideoDict },
            videoBlobs: [...newVideoBlobs]
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <Page pageTitle="Your Trip History" pageImgSrc={undrawCalendar}>
        <div className="history-video-container">
          {this.state.videoBlobs.map(vid => {
            return (
              <div key={vid} className="history-video-button-wrapper">
                <video
                  className="history-video"
                  muted
                  controls
                  playsInline
                  autoPlay
                  src={vid}
                  type="video/MOV"
                ></video>
                <p onClick={() => this.deleteVideo(vid)}>X</p>
              </div>
            );
          })}
        </div>
      </Page>
    );
  }
}

export default History;
