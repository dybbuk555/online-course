import React from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../actions";
import courseCatgory from "../../resources/svcs";
import SortButton from "../../helpers/sortButton";
import { Link } from "react-router-dom";

class CourseShow extends React.Component {
  componentDidMount() {
    const { filterType } = this.props;
    const fetchType = { filtertype: false };
    if (filterType === "default") {
      fetchType.filtertype = "default";
    } else if (filterType === "instructor") {
      const userId = this.props.auth.user.userId;
      fetchType.filtertype = "instrucor";
      fetchType.userId = userId;
    } else if (filterType === "student") {
      console.log("student fetchType");
    }
    this.props.fetchCourses(fetchType);
  }
  renderCourseCard() {
    const { data } = this.props.course;
    console.log("renderCourseCard:", data);
    console.log(data);
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
              </ul>
              <div className="card-body">
                <Link
                  className="btn btn-outline-info w-100"
                  to={`/instructor/course/${course._id}/edit`}
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        );
      });
      console.log("courseCards:", courseCards);
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
  console.log("the state in course shows:", state);
  return state;
};
export default connect(mapStateToProps, { fetchCourses })(CourseShow);
