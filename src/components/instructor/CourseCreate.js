import React from "react";
import { connect } from "react-redux";
import { createCourse } from "../../actions";
import CourseForm from "./CourseForm";

class CourseCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createCourse(formValues);
  };

  render() {
    console.log("render", this.props);
    return (
      <div className="container mt-5 justify-content-center">
        <h3> Create new course</h3>
        <hr />
        <CourseForm onSubmit={this.onSubmit} name="Create" />
      </div>
    );
  }
}

export default connect(null, { createCourse })(CourseCreate);
