import React from "react";
import { connect } from "react-redux";
import { editCourse, fetchCourse } from "../../actions";
import CourseForm from "./CourseForm";
import { pick } from "lodash";

class CourseEdit extends React.Component {
  componentDidMount() {
    this.props.fetchCourse(this.props.match.params.courseId);
  }
  onSubmit = (formValues) => {
    console.log("submit edit:", formValues, this.props);
    this.props.editCourse(formValues, this.props.course._id);
  };

  render() {
    console.log(
      "state:",
      this.props.course,
      pick(this.props.course, "title", "price")
    );

    return (
      <div className="container mt-5 justify-content-center">
        <h1> Edit course</h1>
        <hr />
        <CourseForm
          onSubmit={this.onSubmit}
          initialValues={pick(
            this.props.course,
            "title",
            "description",
            "price",
            "content",
            "category"
          )}
          name="Edit"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { course: state.course.data };
};
export default connect(mapStateToProps, { editCourse, fetchCourse })(
  CourseEdit
);
