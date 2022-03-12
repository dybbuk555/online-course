import React, { Fragment } from "react";
import { connect } from "react-redux";
import InstructorHeader from "./InstructorHeader";
import history from "../../helpers/history";
import { Router, Route, Switch } from "react-router-dom";
import CourseCreate from "./CourseCreate";
import CourseEdit from "./CourseEdit";
import InstructorShow from "./InstructorShow";

class InstructorPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Router history={history}>
          <InstructorHeader />
          <Switch>
            <Route exact path="/instructor/course/">
              <InstructorShow />
            </Route>
            <Route exact path="/instructor/course/new">
              <CourseCreate />
            </Route>
            <Route
              exact
              path="/instructor/course/:courseId/edit"
              component={CourseEdit}
            />

            <Route exact path="/instructor/course/statistic">
              <div className="container">
                <h1>Info about instructor</h1>
                <h2>Total Class:</h2>
                <h2> Students count:</h2>
                <h2> total income: (studentCount*price)</h2>
              </div>
            </Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {})(InstructorPage);
