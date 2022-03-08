import React from "react";
import { Field, reduxForm } from "redux-form";
//import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";

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
    //console.log("input", input, meta);
    const className = `field ${
      meta.error && meta.touched ? "" : "" //"is-invalid" : "is-valid"
    }`;
    //console.log("renderInput", input, meta);
    // input from filed built-in
    // label from our defined
    console.log("args...", args);
    return (
      <div className={className}>
        <i className="fa">
          <input
            id={input.name}
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
        <div className="row g-3 align-items-center justify-content-end m-2">
          <div className="col-auto">
            <label htmlFor="title" className="form-label">
              title
            </label>
          </div>
          <div className="col-auto">
            <Field
              name="title"
              component={this.renderInput}
              type="text"
              placeholder="&#xf007; Title"
            />
          </div>
        </div>
        <div className="row g-3 align-items-center  justify-content-end m-2">
          <div className="col-auto">
            <label htmlFor="description" className="form-label">
              description
            </label>
          </div>
          <div className="col-auto">
            <Field
              formType={this.props.name}
              name="description"
              component={this.renderInput}
              type="text"
              placeholder="&#xf0e0; Description"
            />
          </div>
        </div>
        <div className="row g-3 align-items-center  justify-content-end m-2">
          <div className="col-auto">
            <label htmlFor="price" className="form-label">
              price
            </label>
          </div>
          <div className="col-auto">
            <Field
              formType={this.props.name}
              name="price"
              component={this.renderInput}
              type="number"
              placeholder="&#xf023; Price"
            />
          </div>
        </div>
        <div className="row g-3 align-items-center  justify-content-end m-2">
          <div className="col-auto">
            <label htmlFor="Content" className="form-label">
              Content
            </label>
          </div>
          <div className="col-auto">
            <Field name="Content" component="textarea" />
          </div>
        </div>

        {/* <div className="mb-3 row g-3 align-items-center">
          <Field
            name="title"
            component={this.renderInput}
            type="text"
            placeholder="&#xf007; Title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description">description</label>
          <Field
            formType={this.props.name}
            name="description"
            component={this.renderInput}
            type="text"
            placeholder="&#xf0e0; Description"
          />
        </div>

        <div className="mb-3">
          <Field
            formType={this.props.name}
            name="price"
            component={this.renderInput}
            type="number"
            placeholder="&#xf023; Price"
          />
        </div>

        <div className="mb-3">
          <Field name="Content" component="textarea" />
        </div> */}

        <div className="mb-3">
          <Field name="Category" component="select">
            <option value="Design">Design</option>
            <option value="Software">Software</option>
            <option value="Bussiness">Bussiness</option>
            <option value="Photography">Photography</option>
            <option value="Music">Music</option>
            <option value="Others">Others</option>
          </Field>
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
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must type some description";
  }
  if (!formValues.value) {
    errors.value = "You must enter the price";
  }
  if (formValues.value < 0) {
    errors.value = "Price should be larger than 0";
  }

  return errors;
};

export default reduxForm({
  form: "courseForm",
  validate: validate,
})(CourseForm);
