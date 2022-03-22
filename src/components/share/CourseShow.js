import React from "react";
import { connect } from "react-redux";
import {
  fetchCourses,
  subscribeCourse,
  unSubscribeCourse,
} from "../../actions";
import courseCatgory from "../../resources/svgs";
import SortButton from "./SortButton";
import { Link } from "react-router-dom";

class CourseShow extends React.Component {
  componentDidMount() {
    const { filterType } = this.props;
    this.props.fetchCourses({
      filterType,
      userId: this.props.auth.user ? this.props.auth.user.userId : null,
    });
  }

  functionalButton(course) {
    if (this.props.filterType === "instructor") {
      return (
        <Link
          className="btn btn-outline-info w-100"
          to={`/instructor/course/${course._id}/edit`}
        >
          Edit
        </Link>
      );
    } else {
      if (
        this.props.auth.isSignedIn &&
        course.students.indexOf(this.props.auth.user.userId) >= 0
      ) {
        return (
          <button
            className="btn btn-outline-danger w-100"
            onClick={() => {
              this.props.unSubscribeCourse(course);
            }}
          >
            Unsubscribe
          </button>
        );
      }
      return (
        <button
          className="btn btn-outline-primary w-100"
          onClick={() => {
            this.props.subscribeCourse(course);
          }}
        >
          Subscribe
        </button>
      );
    }
  }

  renderPromation(course) {
    if (this.props.newStudent.timeDiff && this.props.newStudent.timeDiff > 0) {
      return (
        <li className="list-group-item">
          <span className="fs-3">{course.price}$</span>

          <small className="mx-2">
            <del> {course.price * 4}$</del> 75% off
          </small>
        </li>
      );
    } else {
      return <li className="list-group-item">Price: {course.price} $</li>;
    }
  }

  renderCourseCard() {
    const { courses } = this.props;

    if (courses && courses.length > 0) {
      const courseCards = courses.map((course) => {
        return (
          <div className="col" key={course._id}>
            <div className="card h-100">
              <img
                src={courseCatgory[course.category.toLowerCase()]}
                className="card-img-top"
                alt="cousre image"
              />
              <div className="card-body">
                <h4 className="card-title">{course.title}</h4>
                <p className="card-text">Description: {course.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                {this.renderPromation(course)}

                <li className="list-group-item">
                  Instructor: {course.instructor.username}
                </li>
                <li className="list-group-item">
                  students: {course.students.length}
                </li>
              </ul>
              <div className="card-body">
                <div className="row">
                  <div className="col-6 p-0">
                    <Link
                      className="btn btn-outline-success w-100"
                      to={`/course/${course._id}/detail`}
                    >
                      Detail
                    </Link>
                    {/* <button className="btn btn-outline-success w-100">
                      Detail
                    </button> */}
                  </div>
                  <div className="col-6 p-0">
                    {this.functionalButton(course)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
      return courseCards;
    } else {
      return <h3>No courses to show</h3>;
    }
  }

  render() {
    return (
      <div className="container mt-3">
        <SortButton />
        <div className="row row-cols-1 row-cols-lg-3 g-4 mt-1">
          {this.renderCourseCard()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, courses } = state;
  return { newStudent: state.newStudent.firstVisited, auth, courses };
};

export default connect(mapStateToProps, {
  fetchCourses,
  subscribeCourse,
  unSubscribeCourse,
})(CourseShow);
