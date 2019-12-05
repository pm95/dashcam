import React from "react";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import NewTrip from "./components/NewTrip";
import Main from "./components/Main";
import Profile from "./components/Profile";
import History from "./components/History";
import LoginFirst from "./components/LoginFirst";
import { SplashScreen, LoginForm, SignupForm } from "./components/SplashScreen";

import "./App.css";

function Header({ email }) {
  console.log(email);
  return (
    <header>
      <h1>SecureDashboard</h1>
      <p>Welcome, {email}</p>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p>Pietro Malky © 2019</p>
      <Link to="/">
        <button>Sign out</button>
      </Link>
    </footer>
  );
}

function SecureDashBoard({ email }) {
  return (
    <div className="App">
      <Header email={email}></Header>
      <div className="undraw"></div>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linksAreActive: false,
      email: null
    };
    this.activateLinks = this.activateLinks.bind(this);
  }

  activateLinks() {
    console.log("Activated main app links");
    this.setState({
      linksAreActive: true,
      email: localStorage.getItem("email")
    });
  }

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
            render={props => (
              <LoginForm activateLinks={this.activateLinks}></LoginForm>
            )}
          ></Route>
          <Route
            path="/signup"
            render={props => (
              <SignupForm activateLinks={this.activateLinks}></SignupForm>
            )}
          ></Route>

          {this.state.linksAreActive ? (
            <>
              <Route
                path="/main"
                render={props => (
                  <SecureDashBoard
                    {...props}
                    email={this.state.email}
                  ></SecureDashBoard>
                )}
              ></Route>
              <Route path="/new" render={props => <NewTrip></NewTrip>}></Route>
              <Route
                path="/profile"
                render={props => <Profile></Profile>}
              ></Route>
              <Route
                path="/history"
                render={props => <History></History>}
              ></Route>
            </>
          ) : (
            <LoginFirst></LoginFirst>
          )}
        </Switch>
      </Router>
    );
  }
}

export default App;
