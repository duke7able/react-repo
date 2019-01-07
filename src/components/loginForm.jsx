import React from 'react';
import FormFieldElement from './formFieldElement';
import {validateInput} from '../helper/validateLogin';
import { login } from '../helper/model';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {}
    };
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      login(this.state).then(
        (res) => { 
            this.props.history.replace('./profile');
            // wont be needing this monkey patch if implemented redux or had single source of truth approach
            window.location.reload();
        },
        (errors) => this.setState({ errors })
      );
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <FormFieldElement
          field="identifier"
          label="Email"
          type="Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <FormFieldElement
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group"><button className="btn btn-primary btn-lg" >Login</button></div>
      </form>
    );
  }
}

export default withRouter(LoginForm);