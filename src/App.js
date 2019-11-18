import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NewTrip from "./components/NewTrip";
import Main from "./components/Main";
import Profile from "./components/Profile";

import "./App.css";

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

function SecureDashBoard() {
  return (
    <div className="App">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <SecureDashBoard></SecureDashBoard>}
        ></Route>
        <Route path="/new" render={props => <NewTrip />}></Route>
        <Route path="/history"></Route>
        <Route path="/profile" render={props => <Profile></Profile>}></Route>
      </Switch>
    </Router>
  );
}

export default App;
