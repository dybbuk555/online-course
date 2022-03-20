import { CREATE_REVIEW, FETCH_REVIEW, ERROR, SUCCESS } from "./types";
import { authHeader } from "../helpers/auth-header";
import server from "../apis/server";
import history from "./../helpers/history";

export const createReview = (formValues) => async (dispatch, getState) => {
  server
    .post("/review", { formValues }, { headers: authHeader() })
    .then((response) => {
      //history.push("/instructor/course"); // avoid clearing alert message
      dispatch({ type: SUCCESS, payload: "Review created successfully" });
    })
    .catch((error) => {
      if (!error.response) {
        dispatch({
          type: ERROR,
          payload: "fail to create review, no response",
        });
      } else {
        history.push("/login");
        dispatch({
          type: ERROR,
          payload: error.response.data.message,
        });
      }
    });
};
