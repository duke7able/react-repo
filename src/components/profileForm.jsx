import React, { Component } from "react";
import FormFieldElement from "./formFieldElement";
import MutableVerticalList from "./mutableVerticalList";
import { validateInput } from "../helper/validateLogin";

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      gender: "other",
      errors: {}
    };
    // this.gender.selected = "other";
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.saveData);
  };

  saveData = () => {
    if (this.isValid()) {
      this.setState({ errors: {} });
      //   save the data to localstorage
    }
  };

  onRadioChange = e => {
    const { name, value } = e.target;
    this.setState({
      gender: value
    });
  };

  onVerticalListChange = items => {};

  // Name , Age , Gender and skills, that is list

  render() {
    const { errors, name, age, gender } = this.state;

    return (
      <form>
        <h1>Profile</h1>
        <FormFieldElement
          field="name"
          label="Name"
          value={name}
          error={errors.name}
          onChange={this.onChange}
        />
        <FormFieldElement
          field="age"
          label="Age"
          type="number"
          value={age}
          error={errors.age}
          onChange={this.onChange}
        />
        <label className="control-label">Gender</label>
        <div class="custom-control custom-radio">
          <input
            type="radio"
            class="custom-control-input"
            id="other"
            value="other"
            name="gender"
            onChange={this.onRadioChange}
            checked={gender === "other"}
          />
          <label class="custom-control-label" for="other">
            Dont Want to Specify
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input
            type="radio"
            class="custom-control-input"
            id="female"
            value="female"
            name="gender"
            onChange={this.onRadioChange}
            checked={gender === "female"}
          />
          <label class="custom-control-label" for="female">
            Female
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input
            type="radio"
            class="custom-control-input"
            id="male"
            value="male"
            name="gender"
            onChange={this.onRadioChange}
            checked={gender === "male"}
          />
          <label class="custom-control-label" for="male">
            Male
          </label>
        </div>
        <MutableVerticalList />
      </form>
    );
  }
}

export default ProfileForm;
