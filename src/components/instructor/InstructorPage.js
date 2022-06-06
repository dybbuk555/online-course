import React, { Fragment } from "react";
import InstructorHeader from "./InstructorHeader";
import history from "../../helpers/history";
import { Router, Route, Routes } from "react-router-dom";
import CourseCreate from "./CourseCreate";
import CourseEdit from "./CourseEdit";
import CourseShow from "../share/CourseShow";
import InstructorInfo from "./InstructorInfo";

class InstructorPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Router history={history}>
          <InstructorHeader />
          <Routes>
            <Route
              exact
              path="/instructor/course/"
              render={() => {
                return <CourseShow filterType="instructor" />;
              }}
            />

            <Route exact path="/instructor/course/new">
              <CourseCreate />
            </Route>
            <Route
              exact
              path="/instructor/course/:courseId/edit"
              component={CourseEdit}
            />

            <Route exact path="/instructor/statistic">
              <InstructorInfo />
            </Route>
          </Routes>
        </Router>
      </Fragment>
    );
  }
}

export default InstructorPage;
