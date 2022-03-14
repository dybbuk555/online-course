import React from "react";
import CourseShow from "../share/CourseShow";

class InstructorShow extends React.Component {
  render() {
    return (
      <div>
        <CourseShow filterType="instructor" />
      </div>
    );
  }
}

export default InstructorShow;
