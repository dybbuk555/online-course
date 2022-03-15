import server from "../apis/server";
import jwt from "jwt-decode";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  SUCCESS,
  ERROR,
} from "./types";
import history from "./../helpers/history";

export const userSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log("log innnnnnnnnnn");
    server
      .post("/user/login", { email, password })
      .then((response) => {
        const jwtDecoded = jwt(response.data.jwtToken);
        console.log("DDDDDDDDDDDDDDDecoded jwt:", jwtDecoded);
        localStorage.setItem("user", JSON.stringify(response.data)); // local: encoeded
        dispatch({ type: SIGN_IN, payload: jwtDecoded }); // reducer state: decoded
        history.push("/"); // avoid clearing alert message
        dispatch({ type: SUCCESS, payload: "successfully log in!" });
      })
      .catch((error) => {
        console.log("error in sign in:", error);
        dispatch({ type: ERROR, payload: "fail to log in!" });
      });

    return;
  };

export const userLogout = () => {
  console.log("action: signout:");
  localStorage.removeItem("user");
  history.push("/");
  return {
    type: SIGN_OUT,
  };
};

export const userRegister = (formValues) => async (dispatch, getState) => {
  const response = await server.post("/user/register", { ...formValues });
  if (response.data && response.data.jwtToken) {
    console.log("get token");
    const token = response.data.jwtToken;
    const jwtDecoded = jwt(token);
    localStorage.setItem("user", JSON.stringify(response.data)); // local: encoeded
    dispatch({ type: SIGN_IN, payload: jwtDecoded }); // reducer state: decoded
    history.push("/");
  } else {
    console.log(
      "oops something went wrong in user register and here's the response"
    );
    console.log(response);
  }
};
