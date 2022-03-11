import React from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../actions";
import courseCatgory from "./../../resources/svcs";
import SortButton from "../../helpers/sortButton";

class InstructorShow extends React.Component {
  componentDidMount() {
    this.props.fetchCourses({ filter: { userid: 123456 } });
  }
  renderCourseCard() {
    const { data } = this.props.course;
    console.log("renderCourseCard:", data);
    if (data) {
      return data.map((course) => {
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
                <p className="card-text">Price: {course.price} $</p>
                <p className="card-text">Description: {course.description}</p>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return;
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
  console.log("the state in instructor shows:", state);
  return state;
};
export default connect(mapStateToProps, { fetchCourses })(InstructorShow);
