import React, { Fragment } from "react";
import { connect } from "react-redux";
import InstructorHeader from "./InstructorHeader";
import history from "../../helpers/history";
import { Router, Route, Switch } from "react-router-dom";

class InstructorShow extends React.Component {
  render() {
    return (
      <Fragment>
        <Router history={history}>
          <InstructorHeader />
          <Switch>
            <Route exact path="/instructor/course/">
              <h2>all courses</h2>
            </Route>
            <Route exact path="/instructor/course/new">
              <h2>create course</h2>
            </Route>
            <Route exact path="/instructor/course/:id/edit">
              <h2>edit </h2>
            </Route>
          </Switch>
        </Router>
        {/* <div className="navbar navbar-dark dark bg-primary text-white">
          <div className="container">
            <div className="align-items-start flex-column">
              <div className="row">
                <Link to="/" className="navbar-brand">
                  <h3> My teaching</h3>
                </Link>
              </div>

              <ul className="navbar-nav flex-row">
                <li className="nav-item mx-2">
                  <Link to="/" className="nav-link text-white">
                    All coures
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link to="/" className="nav-link text-white">
                    Create coures
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link to="/" className="nav-link text-white">
                    Edit coure
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {})(InstructorShow);
