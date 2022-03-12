import {
  CREATE_COURSE,
  EDIT_COURSE,
  ERROR,
  SUCCESS,
  FETCH_COURSES,
  FETCH_COURSE,
} from "./types";
import { authHeader } from "../helpers/auth-header";
import server from "../apis/server";
import { orderBy } from "lodash";
import history from "./../helpers/history";

export const fetchCourse = (courseId) => async (dispatch) => {
  console.log("action: fetchCourse", courseId);
  server
    .get(`/course/${courseId}`)
    .then((response) => {
      dispatch({ type: FETCH_COURSE, payload: response.data.course });
    })
    .catch((error) => {
      if (!error.response) {
        dispatch({
          type: ERROR,
          payload: "fail to fetch course, no response",
        });
      } else {
        dispatch({ type: ERROR, payload: error.response.data.message });
      }
    });
};

export const fetchCourses =
  ({ userId, filtertype }) =>
  async (dispatch, getState) => {
    // authHeader is not needed, because all peoeple should be able to access all classes
    // filter = {instructor: userid}  for render instructor's classes
    // filter = {students: username}  for render my class
    // filter = {} for render main page
    server
      .get("/course", {
        params: { userId, filtertype },
      })
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

export const sortCourses = (sortBy) => async (dispatch, getState) => {
  const sortedArry = orderBy(getState().course.data, [sortBy.toLowerCase()]);
  dispatch({ type: FETCH_COURSES, payload: sortedArry });
};

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
      history.push("/instructor/course"); // avoid clearing alert message
      dispatch({ type: SUCCESS, payload: "Course created successfully" });
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
};

export const editCourse =
  (formValues, courseId) => async (dispatch, getState) => {
    console.log("this is editCourse action", formValues);
    console.log(courseId);

    server
      .put(
        `/course/${courseId}/edit`,
        { formValues },
        { headers: authHeader() }
      )
      .then((response) => {
        console.log("successfully update course ");
        history.push("/instructor/course"); // avoid clearing alert message
        dispatch({ type: SUCCESS, payload: "Course updated successfully" });
      })
      .catch((error) => {
        if (!error.response) {
          history.push("/instructor/course");
          dispatch({
            type: ERROR,
            payload: "fail to update course, no response",
          });
        } else {
          history.push("/instructor/course");
          dispatch({ type: ERROR, payload: error.response.data.message });
        }
      });
  };
