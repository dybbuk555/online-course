import React from "react";
import { Field, reduxForm } from "redux-form";
//import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import "font-awesome/css/font-awesome.min.css";
import history from "./../../helpers/history";

class CourseForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <div className="text-danger small">{error}</div>;
    } else if (touched && !error) {
      return <div className="text-success small">Looks good!</div>;
    }
  }

  renderInput = (args) => {
    const { input, meta, placeholder, type } = args;

    const className = `${
      meta.error && meta.touched ? "" : "" //"is-invalid" : "is-valid"
    }`;

    return (
      <div className={className}>
        <input
          style={{ width: "100%" }}
          className="form-control"
          {...input}
          placeholder={placeholder}
          type={type}
          autoComplete="on"
        />

        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className="row g-3 align-items-center justify-content-center m-2">
          <div className="col-md-2  col-4">
            <label htmlFor="title" className="form-label">
              TITLE
            </label>
          </div>
          <div className="col-md-10 col-8">
            <Field
              name="title"
              component={this.renderInput}
              type="text"
              placeholder="Title"
            />
          </div>
        </div>
        <div className="row g-3 align-items-center  justify-content-between m-2">
          <div className="col-md-2  col-4">
            <label htmlFor="description" className="form-label">
              DESCRIPTION
            </label>
          </div>
          <div className="col-md-10 col-8">
            <Field
              formType={this.props.name}
              name="description"
              component={this.renderInput}
              type="text"
              placeholder="Description"
            />
          </div>
        </div>
        <div className="row g-3 align-items-center justify-content-between m-2">
          <div className="col-md-2  col-4">
            <label htmlFor="price" className="form-label">
              PRICE
            </label>
          </div>
          <div className="col-md-10 col-8">
            <Field
              formType={this.props.name}
              name="price"
              component={this.renderInput}
              type="number"
              placeholder="Price"
            />
          </div>
        </div>
        <div className="row g-3 align-items-center justify-content-between m-2">
          <div className="col-md-2  col-4">
            <label htmlFor="Content" className="form-label">
              CONTENT
            </label>
          </div>
          <div className="col-md-10 col-8">
            <Field
              name="content"
              component="textarea"
              className="form-control"
              placeholder="Content"
              style={{ height: "250px" }}
            />
          </div>
        </div>

        <div className="row g-3 align-items-center justify-content-between m-2 mb-4">
          <div className="col-md-2  col-4">
            <label htmlFor="Content" className="form-label">
              CATEGORY
            </label>
          </div>
          <div className="col-md-10 col-8">
            <Field name="category" component="select" className="form-control">
              <option value="Design">Design</option>
              <option value="Software">Software</option>
              <option value="Bussiness">Bussiness</option>
              <option value="Photography">Photography</option>
              <option value="Music">Music</option>
              <option value="Others">Others</option>
            </Field>
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <a
            className="btn w-25 mt-2 btn-outline-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </a>
          <button
            className={`btn w-25 mt-2 ${
              this.props.name === "Create"
                ? "btn-outline-success"
                : "btn-outline-info"
            }`}
          >
            {this.props.name}
          </button>
        </div>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must type some description";
  }
  if (!formValues.price) {
    errors.price = "You must enter the price";
  }
  if (formValues.price < 0) {
    errors.price = "Price should be larger than 0";
  }

  return errors;
};

export default reduxForm({
  form: "courseForm",
  validate: validate,
  enableReinitialize: true,
})(CourseForm);
