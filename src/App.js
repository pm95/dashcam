import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

// import camera from "./assets/camera.png";
// import car from "./assets/car.png";
import dashboard from "./assets/dashboard.png";
import history from "./assets/history.png";
// import person from "./assets/person.png";
// import roll from "./assets/roll.png";
// import save from "./assets/save.png";
import cameraadd from "./assets/camera-add.png";

function Header() {
  return (
    <header>
      <h1>Secure Dashboard</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p>Pietro Malky © 2019</p>
    </footer>
  );
}

function Option(props) {
  return (
    <div className="main-wrapper" {...props}>
      {props.children}
    </div>
  );
}

class NewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageURL: "" };
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    if (typeof this.uploadInput.files[0] === "undefined") {
      alert("please record a trip first");
    } else {
      ev.preventDefault();

      const data = new FormData();
      data.append("file", this.uploadInput.files[0]);

      this.setState({
        imageURL: URL.createObjectURL(this.uploadInput.files[0])
      });

      fetch("http://192.168.1.87:5000/api/submit", {
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
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div className="newtrip">
          <h1>Secure Dashboard</h1>
          <input
            ref={ref => {
              this.uploadInput = ref;
            }}
            type="file"
            accept="video/*"
            capture="camera"
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
            <button>Return to main</button>
          </Link>
        </div>
      </form>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <Option>
          <div>
            <h2>Record new trip</h2>
          </div>
          <Link to="/new">
            <img alt="add" src={cameraadd}></img>
          </Link>
        </Option>
        <Option>
          <h2>Explore previous trips</h2>
          <Link to="/history">
            <img alt="htr" src={history}></img>
          </Link>
        </Option>
        <Option>
          <h2>View profile</h2>
          <Link to="/profile">
            <img alt="dsh" src={dashboard}></img>
          </Link>
        </Option>
      </div>
    );
  }
}

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <div className="App">
              {/* <video
                autoPlay
                muted
                loop
                timelineSelector="false"
                id="drivervid"
              >
                <source
                  src="https://giphy.com/embed/3oxRmD9a5pLTOOLigM"
                  type="video/mp4"
                ></source>
              </video> */}
              <Header></Header>
              <Main></Main>
              <Footer></Footer>
            </div>
          )}
        ></Route>
        <Route path="/new" render={props => <NewTrip />}></Route>
        <Route path="/history"></Route>
        <Route path="/profile"></Route>
      </Switch>
    </Router>
  );
}

export default App;
