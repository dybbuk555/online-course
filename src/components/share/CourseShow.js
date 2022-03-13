import React from "react";
import { connect } from "react-redux";
import { fetchCourses, subscribeCourse } from "../../actions";
import courseCatgory from "../../resources/svgs";
import SortButton from "./SortButton";
import { Link } from "react-router-dom";

class CourseShow extends React.Component {
  componentDidMount() {
    const { filterType } = this.props;
    const fetchType = { filtertype: false };
    if (filterType === "default") {
      fetchType.filtertype = "default";
    } else if (filterType === "instructor") {
      const userId = this.props.auth.user.userId;
      fetchType.filtertype = "instructor";
      fetchType.userId = userId;
    } else if (filterType === "student") {
      console.log("student fetchType");
    }
    this.props.fetchCourses(fetchType);
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
      return (
        <button
          className="btn btn-outline-primary w-100"
          onClick={() => {
            this.props.subscribeCourse(course);
          }}
        >
          subscribe
        </button>
      );
    }
  }
  renderCourseCard() {
    const { data } = this.props.course;

    if (data && data.length > 0) {
      const courseCards = data.map((course) => {
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
                <li className="list-group-item">Price: {course.price} $</li>
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
                    <button className="btn btn-outline-success w-100">
                      Detail
                    </button>
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
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
          {this.renderCourseCard()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { fetchCourses, subscribeCourse })(
  CourseShow
);
