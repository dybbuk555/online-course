import React from "react";
import { Field } from "redux-form";
import { reduxForm, reset } from "redux-form";

class ReviewForm extends React.Component {
  onSubmit = (formValues) => {
    //console.log("onSubmit in User form", formValues);
    console.log("ssssssssssubmit", formValues);
    this.props.onSubmit(formValues);
  };

  render(args) {
    console.log("let's render", this.props, args);

    return (
      <div className="leaveComment">
        <div className="card m-0">
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="p-0"
          >
            <h3 className="mx-2">Leave a comment:</h3>
            <div className="d-flex">
              <h5>Rating:</h5>
              <div className="rating">
                <Field
                  component="input"
                  type="radio"
                  name="rating"
                  value="5"
                  id="5"
                />
                <label htmlFor="5">☆</label>{" "}
                <Field
                  component="input"
                  type="radio"
                  name="rating"
                  value="4"
                  id="4"
                />
                <label htmlFor="4">☆</label>{" "}
                <Field
                  component="input"
                  type="radio"
                  name="rating"
                  value="3"
                  id="3"
                />
                <label htmlFor="3">☆</label>{" "}
                <Field
                  component="input"
                  type="radio"
                  name="rating"
                  value="2"
                  id="2"
                />
                <label htmlFor="2">☆</label>{" "}
                <Field
                  component="input"
                  type="radio"
                  name="rating"
                  value="1"
                  id="1"
                />
                <label htmlFor="1">☆</label>{" "}
                {/* <input type="radio" name="rating" value="5" id="5" />
                <label htmlFor="5">☆</label>{" "}
                <input type="radio" name="rating" value="4" id="4" />
                <label htmlFor="4">☆</label>{" "}
                <input type="radio" name="rating" value="3" id="3" />
                <label htmlFor="3">☆</label>{" "}
                <input type="radio" name="rating" value="2" id="2" />
                <label htmlFor="2">☆</label>{" "}
                <input type="radio" name="rating" value="1" id="1" />
                <label htmlFor="1">☆</label>{" "} */}
              </div>
            </div>
            <div className="row ">
              <div className="col-7 py-0">
                <Field
                  placeholder="I would like to say that..."
                  name="content"
                  component="textarea"
                  className="form-control"
                ></Field>
              </div>
              <div className="col-3 d-flex flex-column justify-content-between p-2">
                <div className="m-0">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      console.log("let's reset");
                      this.props.reset();
                    }}
                  >
                    cancel
                  </button>
                </div>
                <div className=" m-0 ">
                  <button className="btn btn-success">submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  console.log("validate", formValues);
  if (!formValues.content) {
    errors.content = "You must write some comment";
  }
  if (!formValues.rating) {
    errors.rating = "You must select a score";
  }
  if (formValues.rating < 0 || formValues.rating > 5) {
    errors.rating = "No such rating!!";
  }

  return errors;
};

export default reduxForm({
  form: "reviewForm",
  validate: validate,
})(ReviewForm);
