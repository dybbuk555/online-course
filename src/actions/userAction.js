import server from "../apis/server";
import jwt from "jwt-decode";
import { MESSAGE_ACTIONS_TYPES } from "./types";
import { USER_ACTIONS_TYPES } from "./types";
import history from "./../helpers/history";

export const userSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    server
      .post("/user/login", { email, password })
      .then((response) => {
        const jwtDecoded = jwt(response.data.jwtToken);

        localStorage.setItem("user", JSON.stringify(response.data)); // local: encoeded
        dispatch({ type: USER_ACTIONS_TYPES.SIGN_IN, payload: jwtDecoded }); // reducer state: decoded
        history.push("/"); // avoid clearing alert message
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.SUCCESS,
          payload: "successfully log in!",
        });
      })
      .catch((error) => {
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.ERROR,
          payload: "fail to log in!",
        });
      });

    return;
  };

export const userLogout = () => {
  localStorage.removeItem("user");
  history.push("/");
  return {
    type: USER_ACTIONS_TYPES.SIGN_OUT,
  };
};

export const userRegister = (formValues) => async (dispatch, getState) => {
  const response = await server.post("/user/register", { ...formValues });
  if (response.data && response.data.jwtToken) {
    const token = response.data.jwtToken;
    const jwtDecoded = jwt(token);
    localStorage.setItem("user", JSON.stringify(response.data)); // local: encoeded
    dispatch({ type: USER_ACTIONS_TYPES.SIGN_IN, payload: jwtDecoded }); // reducer state: decoded
    history.push("/");
  } else {
    dispatch({
      type: MESSAGE_ACTIONS_TYPES.ERROR,
      payload: "fail to register user!",
    });
  }
};
