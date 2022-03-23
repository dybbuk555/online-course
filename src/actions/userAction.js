import server from "../apis/server";
import jwt from "jwt-decode";
import { SIGN_IN, SIGN_OUT, SUCCESS, ERROR } from "./types";
import history from "./../helpers/history";

export const userSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    server
      .post("/user/login", { email, password })
      .then((response) => {
        const jwtDecoded = jwt(response.data.jwtToken);

        localStorage.setItem("user", JSON.stringify(response.data)); // local: encoeded
        dispatch({ type: SIGN_IN, payload: jwtDecoded }); // reducer state: decoded
        history.push("/"); // avoid clearing alert message
        dispatch({ type: SUCCESS, payload: "successfully log in!" });
      })
      .catch((error) => {
        dispatch({ type: ERROR, payload: "fail to log in!" });
      });

    return;
  };

export const userLogout = () => {
  localStorage.removeItem("user");
  history.push("/");
  return {
    type: SIGN_OUT,
  };
};

export const userRegister = (formValues) => async (dispatch, getState) => {
  const response = await server.post("/user/register", { ...formValues });
  if (response.data && response.data.jwtToken) {
    const token = response.data.jwtToken;
    const jwtDecoded = jwt(token);
    localStorage.setItem("user", JSON.stringify(response.data)); // local: encoeded
    dispatch({ type: SIGN_IN, payload: jwtDecoded }); // reducer state: decoded
    history.push("/");
  } else {
    dispatch({ type: ERROR, payload: "fail to register user!" });
  }
};
