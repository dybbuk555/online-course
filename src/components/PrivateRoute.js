import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log("PrivateRoute rest:", rest);
  console.log(localStorage.getItem("user"));
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
