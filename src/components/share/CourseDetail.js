import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchCourse } from "../../actions";
import "./courseDetail.css";
import courseCatgory from "../../resources/svgs";

class CourseDetail extends React.Component {
  componentDidMount() {
    this.props.fetchCourse(this.props.match.params.courseId);
  }
  detailHeader(course) {
    console.log(this.props);

    if (!Array.isArray(course)) {
      return (
        <Fragment>
          <h1>{course.title.toUpperCase()}</h1>
          <h4>{course.description}</h4>
          <p>{course.students.length} students</p>
          <p>Created by {course.instructor.username}</p>
        </Fragment>
      );
    }
  }
  contentRender(loop = 5) {
    return Array.apply(null, Array(loop)).map((empty, ind) => {
      return (
        <div key={ind}>
          <h5>Chapter {ind + 1}</h5>
          <p style={{ textIndent: "36px" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repellendus natus eos molestiae fugiat. Maxime, possimus autem?
            Voluptates praesentium facere ex eaque, non animi consequuntur
            reprehenderit mollitia quae incidunt perspiciatis ipsa.
          </p>
        </div>
      );
    });
  }

  render() {
    if (Array.isArray(this.props.course)) {
      return <Fragment></Fragment>;
    }
    const course = this.props.course;
    return (
      <Fragment>
        <div className="bg-secondary detailHeader" style={{ height: "30vh" }}>
          <div className="text-light text-wrapped">
            {this.detailHeader(course)}
          </div>
        </div>

        <div className="detailBody m-5">
          <div className="card" style={{ width: "60vw" }}>
            <div className="card-header">
              <h2>course content</h2>
            </div>
            <div className="card-body">{this.contentRender()}</div>
          </div>

          <div
            className="bg-danger commentArea"
            style={{ width: "500px", height: "300px" }}
          >
            <h3>comment area to be continued</h3>
          </div>
        </div>

        <div className="sideBar text-center">
          <img
            src={courseCatgory[course.category.toLowerCase()]}
            className="card-img-top"
            alt="cousre image"
            style={{
              position: "relative",
              width: "99%",

              top: "0.2%",
            }}
          />
          <h3>{course.price} $</h3>
          <button className="btn btn-outline-primary w-100 mt-1">
            Go to cart
          </button>
          <button className="btn btn-outline-warning w-100 mt-1">
            Subscribe now
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { course: state.courses };
};
export default connect(mapStateToProps, { fetchCourse })(CourseDetail);
