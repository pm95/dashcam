import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

import camera from "./assets/camera.png";
import car from "./assets/car.png";
import dashboard from "./assets/dashboard.png";
import history from "./assets/history.png";
import person from "./assets/person.png";
import roll from "./assets/roll.png";
import save from "./assets/save.png";
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
    this.state = { videoSrc: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const file = e.target.files[0];
    const videoSrc = URL.createObjectURL(file);
    this.setState(
      {
        videoSrc: videoSrc
      },
      () => {
        alert(videoSrc);
      }
    );
  }

  render() {
    return (
      <div className="new-trip">
        <h1>New Trip</h1>
        <input
          type="file"
          accept="video/*"
          capture="camera"
          id="recorder"
          onChange={this.handleChange}
        />
        {this.state.videoSrc === null ? (
          <p>No video recorded</p>
        ) : (
          <video src={this.state.videoSrc} autoPlay muted></video>
        )}
      </div>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

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
