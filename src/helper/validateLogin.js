// import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import forOwn from "lodash/forOwn";

export function isNull(data) {
  // check for null string
  return data === "";
}

export function validateInput(data) {
  let errors = {};
  delete data["errors"];

  forOwn(data, (value, key) => {
    if (isNull(value)) {
      errors[key] = key + " is required";
    }
  });

  data["errors"] = errors;

  // if (data.identifier && isNull(data.identifier)) {
  //   errors.identifier = "This field is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
