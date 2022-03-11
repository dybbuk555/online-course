import React from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../actions";
import courseCatgory from "./../../resources/svcs";
const lala = "design";
console.log(lala);
console.log(courseCatgory[lala]);
//const design = require("../../resources/svcs/design.svg");

class InstructorShow extends React.Component {
  componentDidMount() {
    this.props.fetchCourses({ filter: { userid: 123456 } });
  }
  renderCourseCard() {
    const { data } = this.props.course;
    console.log("renderCourseCard:", data);
    return data.map((course) => {
      return (
        <div className="col">
          <div className="card h-100">
            <img
              src={courseCatgory[course.category.toLowerCase()]}
              className="card-img-top"
              alt="cousre image"
            />
            <div className="card-body">
              <h1>{course.category}</h1>
              <h5 className="card-title">{course.title}</h5>
              <p className="card-text">{course.description}</p>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="container mt-">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {this.renderCourseCard()}
          <div className="col">
            <div className="card h-100">
              <img
                src={courseCatgory["design"]}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img
                src={courseCatgory["music"]}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">This is a short card.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <img
                src={courseCatgory["bussiness"]}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <img
                src={courseCatgory["others"]}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
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
