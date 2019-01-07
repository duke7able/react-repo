import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./components/header";
import { isUserLoggedIn , setLogin , firstBrowserOpen} from "./helper/model";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Home from "./pages/home";
import "bootstrap/dist/css/bootstrap.min.css";

class AppRouter extends Component {
  constructor() {
    super();
    this.state= {
      isUserLoggedIn: isUserLoggedIn(),
      buttonText: isUserLoggedIn() ? "Logout" : "Login",
      FirstBrowserOpen: firstBrowserOpen()
    };
  }

  handleLogout = () => {
    this.setState({ isUserLoggedIn: false , buttonText : "Login"}, setLogin(false));
  }

  handleLogin = () => {
    this.setState({ isUserLoggedIn: true , buttonText : "Logout"});
  }

  handleFirstBrowserOpen = () => {
    this.setState({ FirstBrowserOpen: true });
    return true;
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header FirstBrowserOpen={this.state.FirstBrowserOpen} setOnBrowserOpen={this.handleFirstBrowserOpen}
          loggedIn={this.state.isUserLoggedIn} onLogout={this.handleLogout} buttonText={this.state.buttonText} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Login" render={routeProps => <Login {...routeProps} onLogin={this.handleLogin} />} />
          <Route path="/Home" component={Home} />
        </React.Fragment>
      </Router>
    );
  }
}

export default AppRouter;
