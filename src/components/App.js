import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamShow from "./streams/StreamShow";
import StreamList from "./streams/StreamList";
import Header from "./header/Header";

//
import UserRegister from "./users/UserRegister";
import UserLogin from "./users/UserLogin";
import UserShow from "./users/UserShow";
import InstructorShow from "./instructor/InstructorShow";
import history from "../helpers/history";
import PrivateRoute from "./PrivateRoute";
import { messageClear } from "../actions";
import { connect } from "react-redux";

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
      <div className="">
        {alert.message && (
          <div
            className={`alert ${alert.type}`}
            style={{ transition: "ease-out 2s" }}
          >
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

              {/* protected route */}
              <PrivateRoute path="/instructor" component={InstructorShow} />
              <PrivateRoute path="/user/" component={UserShow} />

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
