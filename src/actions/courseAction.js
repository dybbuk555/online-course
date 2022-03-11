import {
  CREATE_COURSE,
  EDIT_COURSE,
  ERROR,
  SUCCESS,
  FETCH_COURSES,
} from "./types";
import { authHeader } from "../helpers/auth-header";
import server from "../apis/server";

export const fetchCourses = (filter) => async (dispatch, getState) => {
  // authHeader is not needed, because all peoeple should be able to access all classes
  // filter = {instructor: userid}  for render instructor's classes
  // filter = {students: username}  for render my class
  // filter = {} for render main page
  server
    .get("/course", { filter })
    .then((response) => {
      console.log("fetch courses response:", response);
      dispatch({ type: FETCH_COURSES, payload: response.data.courses });
    })
    .catch((error) => {
      if (!error.response) {
        dispatch({
          type: ERROR,
          payload: "fail to fetch courses, no response",
        });
      } else {
        dispatch({ type: ERROR, payload: error.response.data.message });
      }
    });
};

export const userCourse = () => async (dispatch, getStae) => {};

export const instructorCourse = () => async (dispatch, getState) => {};

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
