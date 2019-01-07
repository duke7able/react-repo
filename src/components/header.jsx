import React, { Component } from "react";
import { setLogin } from "./../helper/model";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn,
      buttonText: this.props.loggedIn ? "Logout" : "Login"
    };
  }

  _doLogout = () => {
    const { loggedIn } = this.state;
    const { history } = this.props;
    loggedIn &&
      setLogin(!loggedIn) &&
      this.setState({ buttonText: "Login", loggedIn: false });
    // basically redirecting back where it was
    if (history.location.pathname.includes("profile")) {
      // since if loggedout then it cannot be in profile
      history.replace("./home");
    } else if (!loggedIn) {
      // goto login
      history.replace("./Login");
    } else {
      // else logout and return back where you were
      history.replace(history.location.pathname);
    }
  };

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a href="/home" className="navbar-brand">
          react
        </a>
        <a>
          <button onClick={() => this._doLogout()} className="btn btn-primary">
            {this.state.buttonText}
          </button>
        </a>
      </nav>
    );
  }
}

export default withRouter(Header);
