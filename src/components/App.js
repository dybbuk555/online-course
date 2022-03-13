import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamShow from "./streams/StreamShow";
import StreamList from "./streams/StreamList";

//
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./header/Header";
import UserRegister from "./users/UserRegister";
import UserLogin from "./users/UserLogin";
import UserPage from "./users/UserPage";
import InstructorPage from "./instructor/InstructorPage";
import history from "../helpers/history";
import PrivateRoute from "./PrivateRoute";
import { messageClear } from "../actions";
import { connect } from "react-redux";
import MainPage from "./main/MainPage";

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
      <div className="mb-5">
        {alert.message && (
          <div className={`fixed-bottom mb-0 alert opacity-50 ${alert.type}`}>
            {alert.message}
          </div>
        )}
        <Router history={history}>
          <div>
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

              {/* protected route */}
              <PrivateRoute path="/instructor" component={InstructorPage} />
              <PrivateRoute path="/user/" component={UserPage} />

              {/* <Route path="/user/register" exact component={UserRegister} />
              <Route path="/user/register" exact component={UserRegister} />
              <Route path="/user/login" exact component={UserLogin} />
              <Route path="/user/logout" exact component={UserLogout} /> */}
              {/* <Route
                path="/user/myspace"
                exact
                component={<h1>this is my sapce</h1>}
              /> */}

              {/* <Route path="/user/register" exact component={UserRegister} />
              <Route path="/user/login" exact component={UserLogin} />
  
              <Route path="/streams/new" exact component={StreamCreate} />
              <Route path="/streams/edit/:id" exact component={StreamEdit} />
              <Route path="/streams/delete/:id" exact component={StreamDelete} />
              <Route path="/streams/:id" exact component={StreamShow} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return { alert };
};
export default connect(mapStateToProps, { messageClear })(App);
