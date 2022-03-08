import React from "react";
import { connect } from "react-redux";
import { courseCreate } from "../../actions";
import CourseForm from "./CourseForm";

class CourseCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.userRegister(formValues);
  };

  render() {
    console.log("render", this.props);
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="offset-md-3 col-md-6 align-self-center text-center text-nowrap">
            <h3> Create new course</h3>
            <hr />
            <CourseForm onSubmit={this.onSubmit} name="Create" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { courseCreate })(CourseCreate);
