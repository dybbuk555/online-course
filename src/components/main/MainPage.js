import React from "react";
import CourseShow from "../share/CourseShow";
import bookImage from "../../resources/images/book.jpg";

class MainPage extends React.Component {
  render() {
    return (
      <div className="container">
        <img className="w-100" src={bookImage} alt="" />
        <h1>Welcome to Online Course!</h1>
        <h2>A broad selection of courses</h2>
        <CourseShow filterType="default" />
      </div>
    );
  }
}

export default MainPage;
