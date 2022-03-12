import { render } from "@testing-library/react";
import React from "react";
import CourseShow from "../share/CourseShow";

class MainPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Welcome to Online Course!</h1>
        <h2>A broad selection of courses</h2>
        <CourseShow filterType="default" />
      </div>
    );
  }
}

export default MainPage;
