import React, { Fragment } from "react";
import { connect } from "react-redux";
import UserHeader from "./UserHeader";

// user route
import UserLogout from "./UserLogout";
import { Router, Route, Routes } from "react-router-dom";
import history from "../../helpers/history";
import CourseShow from "../share/CourseShow";
import UserInfo from "./UserInfo";

class UserPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Router history={history}>
          <UserHeader />
          <Routes>
            <Route path="/user/logout" component={UserLogout} />
            <Route
              path="/user/course"
              render={() => {
                return <CourseShow filterType="student" />;
                // use render to pass props
              }}
            />
            <Route path="/user/statistic" component={UserInfo} />
          </Routes>
        </Router>
      </Fragment>
    );
  }
}

export default connect(null, {})(UserPage);
