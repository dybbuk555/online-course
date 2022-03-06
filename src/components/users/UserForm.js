import React from "react";
import { Field, reduxForm } from "redux-form";
//import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";

class UserForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <div className="text-danger small">{error}</div>;
    } else if (touched && !error) {
      return <div className="text-success small">Looks good!</div>;
    }
  }

  renderInput = ({ input, meta, placeholder, type }) => {
    //console.log("input", input, meta);
    const className = `field ${
      meta.error && meta.touched ? "" : "" //"is-invalid" : "is-valid"
    }`;
    //console.log("renderInput", input, meta);
    // input from filed built-in
    // label from our defined
    return (
      <div className={className}>
        <i className="fa">
          <input
            className="form-control "
            {...input}
            placeholder={placeholder}
            type={type}
            autoComplete="on"
          />
        </i>

        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    console.log("onSubmit in User form", formValues);
    this.props.onSubmit(formValues);
  };

  render() {
    //console.log("render in form", this.props);
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className="mb-3">
          {this.props.name === "Login" ? null : (
            <Field
              name="username"
              component={this.renderInput}
              type="text"
              placeholder="&#xf007;  User Name"
            />
          )}
        </div>

        <div className="mb-3">
          <Field
            formType={this.props.name}
            name="email"
            component={this.renderInput}
            type="email"
            placeholder="&#xf0e0;  Email"
          />
        </div>

        <div className="mb-3">
          <Field
            formType={this.props.name}
            name="password"
            component={this.renderInput}
            type="password"
            placeholder="&#xf023;  Password"
          />
        </div>

        <button className="btn btn-outline-success input-block-level">
          {this.props.name}
        </button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.username) {
    errors.username = "You must enter a username";
  }
  if (!formValues.email) {
    errors.email = "You must enter an email";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }
  return errors;
};

export default reduxForm({
  form: "userForm",
  validate: validate,
})(UserForm);
