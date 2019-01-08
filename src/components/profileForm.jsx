import React, { Component } from "react";
import FormFieldElement from "./formFieldElement";
import MutableVerticalList from "./mutableVerticalList";
import { validateInput } from "../helper/validateLogin";
import { setData, getData } from "../helper/model";

const STORAGE_NAME = "ProfileForm";

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    if (getData(STORAGE_NAME)) {
      this.state = getData(STORAGE_NAME);
    } else {
      // default
      this.state = {
        name: "",
        age: "",
        gender: "other",
        errors: {},
        items: this.resetList()
      };
    }
  }

  resetList = () => {
    const items = [
      { content: " JavaScript" },
      { content: " Python" },
      { content: " PHP " },
      { content: " Java" },
      { content: " C++" }
    ];
    items.map((item, index) => {
      item.id = index;
    });
    return items;
  };

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.saveFormProgress);
  };

  handleListReset = () => {
    this.setState({ items: this.resetList() }, this.saveData);
  };

  saveFormProgress = () => {
    if (this.isValid()) {
      this.setState({ errors: {} });
    }
    this.saveData();
  };

  saveData = () => {
    setData(STORAGE_NAME, this.state);
  };

  onRadioChange = e => {
    const { value } = e.target;
    this.setState({ gender: value }, this.saveData);
  };

  handleListChange = items => {
    this.setState({ items }, this.saveData);
  };

  // Name , Age , Gender and skills, that is list

  render() {
    const { errors, name, age, gender } = this.state;

    return (
      <form method="post">
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
        <MutableVerticalList
          items={this.state.items}
          onListChange={this.handleListChange}
          onReset={this.handleListReset}
        />
      </form>
    );
  }
}

export default ProfileForm;
