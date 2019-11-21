import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NewTrip from "./components/NewTrip";
import Main from "./components/Main";
import Profile from "./components/Profile";
import History from "./components/History";
import { SplashScreen, LoginForm, SignupForm } from "./components/SplashScreen";

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

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={props => <SplashScreen></SplashScreen>}
          ></Route>
          <Route
            path="/login"
            render={props => <LoginForm></LoginForm>}
          ></Route>
          <Route
            path="/signup"
            render={props => <SignupForm></SignupForm>}
          ></Route>

          <Route
            path="/main"
            render={props => <SecureDashBoard></SecureDashBoard>}
          ></Route>
          <Route path="/new" render={props => <NewTrip></NewTrip>}></Route>
          <Route path="/profile" render={props => <Profile></Profile>}></Route>
          <Route path="/history" render={props => <History></History>}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
