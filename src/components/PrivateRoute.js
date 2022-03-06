import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem("user") ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};
