import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../actions";

class UserInfo extends React.Component {
  componentDidMount() {
    if (this.props.auth && this.props.auth.isSignedIn) {
      this.props.fetchCourses({
        userId: this.props.auth.user.userId,
        filtertype: "student",
      });
    }
  }

  statisticFunction(courses) {
    const courseCategories = {};
    const categoryRender = [];
    let totalExpense = 0;
    courses.forEach((course) => {
      totalExpense += course.price;
      if (course.category in courseCategories) {
        courseCategories[course.category]["count"] += 1;
        courseCategories[course.category]["categoryExpense"] += course.price;
      } else {
        courseCategories[course.category] = {
          count: 1,
          categoryExpense: course.price,
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
          <h5>{`Category expense: ${courseCategories[category]["categoryExpense"]}$`}</h5>
        </li>
      );
    }
    return { categoryRender, totalExpense };
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
              <h2>Hello {user.username}!</h2>
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
              <h2> Total expense: {statistics.totalExpense} $</h2>
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

export default connect(mapStateToProps, { fetchCourses })(UserInfo);
