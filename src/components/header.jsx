import React from "react";
import { withRouter } from "react-router-dom";

const _doLogout = (history, loggedIn, onLogout) => {
  loggedIn && onLogout();
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

/*
 * basically this method redirects to profile page if when browser is opened and user was logged in
 * then navigate it to profile once then the navigation is regular
 */
const _navigateToProfile = props => {
  props.loggedIn &&
    props.history.location.pathname !== "/profile" &&
    props.FirstBrowserOpen &&
    props.setOnBrowserOpen() &&
    props.history.replace("./profile");
};

const Header = props => {
  return (
    <React.Fragment>
      {_navigateToProfile(props)}
      <nav className="navbar navbar-light bg-light">
        <a href="/home" className="navbar-brand">
          react
        </a>
        <button
          onClick={() =>
            _doLogout(props.history, props.loggedIn, props.onLogout)
          }
          className="btn btn-primary"
        >
          {props.buttonText}
        </button>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(Header);
