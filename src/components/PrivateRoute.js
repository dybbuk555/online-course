import React from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isSignedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        isSignedIn ? <Component /> : <Navigate to={{ pathname: "/login" }} />
      }
    />
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(PrivateRoute);
