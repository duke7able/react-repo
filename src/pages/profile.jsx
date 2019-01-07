import React from "react";
import { isUserLoggedIn } from "../helper/model";
import "../css/common.css";
import ProfileForm from "../components/profileForm";

const Profile = ({ props }) => {
  if (isUserLoggedIn()) {
    return (
      <div className="row profilePage">
        <div className="col-md-4 col-md-offset-4">
          <ProfileForm />
        </div>
      </div>
    );
  } else {
    return (
      <div className="row loginPage">
        <h3>You need to log in first</h3>
      </div>
    );
  }
};

export default Profile;
