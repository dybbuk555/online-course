import React from "react";
import CourseShow from "../share/CourseShow";

class UserShow extends React.Component {
  render() {
    return (
      <div>
        <CourseShow filterType="student" />
      </div>
    );
  }
}

export default UserShow;
