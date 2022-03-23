import React from "react";
import { connect } from "react-redux";
import { createCourse } from "../../actions";
import CourseForm from "./CourseForm";

class CourseCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createCourse(formValues);
  };

  render() {
    return (
      <div className="container mt-5 justify-content-center">
        <h1> Create new course</h1>
        <hr />
        <CourseForm
          onSubmit={this.onSubmit}
          name="Create"
          initialValues={{ category: "Others" }}
        />
      </div>
    );
  }
}

export default connect(null, { createCourse })(CourseCreate);
