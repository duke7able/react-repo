import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./components/header";
import { isUserLoggedIn } from "./helper/model";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Home from "./pages/home";
import "bootstrap/dist/css/bootstrap.min.css";

class AppRouter extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header loggedIn={isUserLoggedIn()} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Login" component={Login} />
          <Route path="/Home" component={Home} />
        </React.Fragment>
      </Router>
    );
  }
}

export default AppRouter;
