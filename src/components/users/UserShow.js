import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserHeader from "./UserHeader";

// user route
import UserLogout from "./UserLogout";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../helpers/history";

class UserShow extends React.Component {
  render() {
    return (
      <Fragment>
        <Router history={history}>
          <UserHeader />
          <h1>user default componenet</h1>
          <Switch>
            <Route path="/user/logout" component={UserLogout} />
            <Route
              path="/user/all"
              render={() => {
                return (
                  <div>
                    <h1>user all</h1>
                  </div>
                );
              }}
            />

            <Route
              path="/user/data"
              render={() => {
                return (
                  <div>
                    <h1>user data</h1>
                  </div>
                );
              }}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {})(UserShow);
