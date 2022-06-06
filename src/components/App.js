import React, { Fragment } from "react";
import { Router, Routes, Route, Outlet } from "react-router-dom";
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
import ErrorBoundary from "./share/ErrorBoundary";
import GoToTop from "./share/goToTop";
import TopButton from "./share/TopButton";

class App extends React.Component {
  constructor(props) {
    super(props);
    // const historyListener = history.listen((location, action) => {
    //   console.log("history listenr location", location, "action:", action);
    //   this.props.messageClear();
    // });
    // console.log("historyListener:", historyListener);
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

          <Routes>
            <Route
              path="/"
              element={
                <Fragment>
                  <GoToTop />
                  <Header />
                  <TopButton />
                  <Outlet />
                </Fragment>
              }
            >
              <Route path="register" element={<UserRegister />} />
              <Route path="login" element={<UserLogin />} />
              <Route index element={<MainPage />} />
              <Route
                path="course/:courseId/detail"
                element={<CourseDetail />}
              />
              <Route
                path="instructor"
                element={
                  <PrivateRoute>
                    <InstructorPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="user"
                element={
                  <PrivateRoute>
                    <UserPage />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* <PrivateRoute path="/instructor" component={InstructorPage} />
            <PrivateRoute path="/user/" component={UserPage} /> */}
          </Routes>
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
