import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../actions";

class InstructorInfo extends React.Component {
  componentDidMount() {
    if (this.props.auth && this.props.auth.isSignedIn) {
      this.props.fetchCourses({
        userId: this.props.auth.user.userId,
        filtertype: "instructor",
      });
    }
  }
  statisticFunction(courses) {
    if (typeof courses !== "object") return {};
    const courseCategories = {};
    // courseCateories ={Software:{count:5,categorIncome:20000}}
    const categoryRender = [];
    let totalStudents = 0;
    let totalIncome = 0;
    courses.forEach((course) => {
      totalStudents += course.students.length;
      totalIncome += course.students.length * course.price;
      if (course.category in courseCategories) {
        courseCategories[course.category]["count"] += 1;
        courseCategories[course.category]["categoryIncome"] +=
          course.price * course.students.length;
        courseCategories[course.category]["categoryStudent"] +=
          course.students.length;
      } else {
        courseCategories[course.category] = {
          count: 1,
          categoryIncome: course.price * course.students.length,
          categoryStudent: course.students.length,
        };
      }
    });
    for (const category in courseCategories) {
      categoryRender.push(
        <li
          className="list-group-item list-group-item-info text-wrap"
          key={category}
        >
          <h3>{`Total ${category} class: ${courseCategories[category]["count"]}`}</h3>
          <h5 className="mr-5">
            {` Category students: ${courseCategories[category]["categoryStudent"]}`}
          </h5>
          <h5>{`    Category income: ${courseCategories[category]["categoryIncome"]}$`}</h5>
        </li>
      );
    }
    return { categoryRender, totalStudents, totalIncome };
  }

  renderInfo() {
    if (this.props.auth && this.props.auth.isSignedIn) {
      const { user } = this.props.auth;
      const { courses } = this.props;
      const statistics = this.statisticFunction(courses);
      console.log(courses);
      return (
        <Fragment>
          <h1>INFO:</h1>
          <ul className="list-group">
            <li className="list-group-item">
              <h2>Instructor: {user.username}</h2>
            </li>
            <li className="list-group-item">
              <h2>Total Classes : {courses.length}</h2>
              <div className="row justify-content-center text-center">
                <div className="">
                  <ul className="list-group list-group-flush">
                    {statistics.categoryRender}
                  </ul>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <h2> Students count: {statistics.totalStudents}</h2>
            </li>
            <li className="list-group-item">
              <h2> Total income: {statistics.totalIncome} $</h2>
            </li>
          </ul>
        </Fragment>
      );
    }
  }
  render() {
    return <div className="container mt-5">{this.renderInfo()}</div>;
  }
}
const mapStateToProps = (state) => {
  const { auth, courses } = state;

  return { auth, courses };
};

export default connect(mapStateToProps, { fetchCourses })(InstructorInfo);
