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
} from "./types";
import history from "./../helpers/history";
import { authHeader } from "../helpers/auth-header";

export const userSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log("log innnnnnnnnnn");
    server
      .post("/user/login", { email, password })
      .then((response) => {
        const jwtDecoded = jwt(response.data.jwtToken);
        localStorage.setItem("user", JSON.stringify(response.data)); // local: encoeded
        dispatch({ type: SIGN_IN, payload: jwtDecoded }); // reducer state: decoded
        history.push("/");
      })
      .catch((error) => {
        console.log("error in sign in:", error);
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
////////////////////////////////////////////////////////////////

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  console.log(
    "action of create formValues",
    formValues,
    "userId",
    userId,
    "  getState",
    getState(),
    {
      userId,
    }
  );
  const response = await server.post("/streams", { ...formValues, userId });
  dispatch({ type: CREATE_STREAM, payload: response.data });
  // programmatic naviagtion
  history.push("/");
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await server.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const fetchStreams = () => async (dispatch) => {
  const response = await server.get(`/streams`);
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const deleteStreams = (id) => async (dispatch) => {
  console.log("dddddeleteStreams iid:", id);
  await server.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await server.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};
