import React from "react";
import { connect } from "react-redux";
import { courseEdit } from "../../actions";
import CourseForm from "./CourseForm";

class CourseEdit extends React.Component {
  onSubmit = (formValues) => {
    this.props.courseEdit(formValues);
  };

  render() {
    console.log("render", this.props);
    return (
      <div className="container mt-5 justify-content-center">
        <h3> Edit course</h3>
        <hr />
        <CourseForm onSubmit={this.onSubmit} name="Edit" />
      </div>
    );
  }
}

export default connect(null, { courseEdit })(CourseEdit);
