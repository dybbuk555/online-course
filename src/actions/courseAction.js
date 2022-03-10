import { CREATE_COURSE, EDIT_COURSE, ERROR, SUCCESS } from "./types";
import { authHeader } from "../helpers/auth-header";
import server from "../apis/server";

export const createCourse = (formValues) => async (dispatch, getState) => {
  console.log(
    "this is createCourse action and authHeader",
    formValues,
    authHeader()
  );
  server
    .post("/course", { formValues }, { headers: authHeader() })
    .then((response) => {
      console.log("successfully create course ");
    })
    .catch((error) => {
      if (!error.response) {
        dispatch({
          type: ERROR,
          payload: "fail to create course, no response",
        });
      } else {
        dispatch({ type: ERROR, payload: error.response.data.message });
      }
    });
  dispatch({ type: CREATE_COURSE, payload: "create course" });
};

export const editCourse = (formValues) => async (dispatch, getState) => {
  console.log("this is editCourse action", formValues);
  dispatch({ type: EDIT_COURSE, payload: "Edit course" });
};
