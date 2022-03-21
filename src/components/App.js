import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./header/Header";
import UserRegister from "./users/UserRegister";
import UserLogin from "./users/UserLogin";
import UserPage from "./users/UserPage";
import InstructorPage from "./instructor/InstructorPage";
import CourseDetail from "./share/CourseDetail";
import history from "../helpers/history";
import PrivateRoute from "./PrivateRoute";
import { messageClear } from "../actions";
import { connect } from "react-redux";
import MainPage from "./main/MainPage";
import SpecialOffer from "./share/SpecialOffer";
import ErrorBoundary from "./share/ErrorBoundary";

class App extends React.Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      this.props.messageClear();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <ErrorBoundary>
        <div className="mb-5">
          {alert.message && (
            <div className={`fixed-bottom mb-0 alert opacity-50 ${alert.type}`}>
              {alert.message}
            </div>
          )}
          <Router history={history}>
            <div>
              <SpecialOffer />
              <Header />
              <Switch>
                <Route path="/register">
                  <UserRegister />
                </Route>
                <Route path="/login">
                  <UserLogin />
                </Route>
                <Route exact path="/">
                  <MainPage />
                </Route>
                <Route
                  exact
                  path="/course/:courseId/detail"
                  component={CourseDetail}
                ></Route>
                <PrivateRoute path="/instructor" component={InstructorPage} />
                <PrivateRoute path="/user/" component={UserPage} />
              </Switch>
            </div>
          </Router>
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return { alert };
};
export default connect(mapStateToProps, { messageClear })(App);
