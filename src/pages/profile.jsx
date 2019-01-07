import React from "react";
import { isUserLoggedIn } from "../helper/model";
import "../css/common.css";
import ProfileForm from "../components/profileForm";
import Container from "../components/container";

const Profile = () => {
  if (isUserLoggedIn()) {
    return (
      <Container>
          <ProfileForm />
      </Container>
    );
  } else {
    return (
      <div className="row page">
        <h3>You need to log in first</h3>
      </div>
    );
  }
};

export default Profile;
