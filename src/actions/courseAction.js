import { COURSE_ACTIONS_TYPES } from "./types";

import { MESSAGE_ACTIONS_TYPES } from "./types";
import { authHeader } from "../helpers/auth-header";
import server from "../apis/server";
import { orderBy } from "lodash";
import history from "./../helpers/history";

export const unSubscribeCourse = (course) => async (dispatch) => {
  server
    .delete(`/course/${course._id}/subscribe`, { headers: authHeader() })
    .then((response) => {
      dispatch({
        type: COURSE_ACTIONS_TYPES.UNSUBSCRIBE_COURSE,
        payload: response.data.course,
      });
      // history.go(0);
      dispatch({
        type: MESSAGE_ACTIONS_TYPES.SUCCESS,
        payload: `Sucessfully unsubscribe course: ${course.title}!`,
      });
    })
    .catch((error) => {
      if (!error.response) {
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.ERROR,
          payload: "fail to unsubscribe course, no response",
        });
      } else {
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.ERROR,
          payload: error.response.data.message,
        });
      }
    });
};

export const subscribeCourse = (course) => async (dispatch, getState) => {
  const state = getState();
  if (!state.auth.isSignedIn) {
    history.push("/login");
    dispatch({
      type: MESSAGE_ACTIONS_TYPES.ERROR,
      payload: "You need to log in to subscribe a course",
    });
  } else {
    server
      .post(`/course/${course._id}/subscribe`, {}, { headers: authHeader() })
      .then((response) => {
        dispatch({
          type: COURSE_ACTIONS_TYPES.SUBSCRIBE_COURSE,
          payload: response.data.course,
        });
        // history.go(0);
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.SUCCESS,
          payload: `Sucessfully subscribe course: ${course.title}!`,
        });
      })
      .catch((error) => {
        if (!error.response) {
          dispatch({
            type: MESSAGE_ACTIONS_TYPES.ERROR,
            payload: "fail to subscribe course, no response",
          });
        } else {
          dispatch({
            type: MESSAGE_ACTIONS_TYPES.ERROR,
            payload: error.response.data.message,
          });
        }
      });
  }
};

export const fetchCourse = (courseId) => async (dispatch) => {
  server
    .get(`/course/${courseId}`)
    .then((response) => {
      // to keep action state consistent => use array to store course
      dispatch({
        type: COURSE_ACTIONS_TYPES.FETCH_COURSE,
        payload: [response.data.course],
      });
    })
    .catch((error) => {
      if (!error.response) {
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.ERROR,
          payload: "fail to fetch course, no response",
        });
      } else {
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.ERROR,
          payload: error.response.data.message,
        });
      }
    });
};

export const fetchCourses = (parameters) => async (dispatch, getState) => {
  const { filterType, userId, keyWord } = parameters;
  console.log("fetchCourses filterType:", filterType);
  // authHeader is not needed, because all peoeple should be able to access all classes
  // filter = {instructor: userId}  for render instructor's classes
  // filter = {students: username}  for render my class
  // filter = {} for render main page
  server
    .get("/course", {
      params: { filterType, userId, keyWord },
    })
    .then((response) => {
      dispatch({
        type: COURSE_ACTIONS_TYPES.FETCH_COURSES,
        payload: response.data.courses,
      });
    })
    .catch((error) => {
      if (!error.response) {
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.ERROR,
          payload: "fail to fetch courses, no response",
        });
      } else {
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.ERROR,
          payload: error.response.data.message,
        });
      }
    });
};

export const sortCourses = (sortBy) => (dispatch, getState) => {
  let sortedArray;
  switch (sortBy) {
    case "Instructor":
      sortedArray = orderBy(
        getState().courses,
        (item) => item.instructor.username,
        ["aesc"]
      );
      break;
    case "reverse":
      sortedArray = getState().courses.slice().reverse();
      break;
    default:
      sortedArray = orderBy(
        getState().courses,
        [sortBy.toLowerCase()],
        ["aesc"]
      );
  }

  dispatch({ type: COURSE_ACTIONS_TYPES.FETCH_COURSES, payload: sortedArray });
};

export const createCourse = (formValues) => async (dispatch, getState) => {
  server
    .post("/course", { formValues }, { headers: authHeader() })
    .then((response) => {
      history.push("/instructor/course"); // avoid clearing alert message
      dispatch({
        type: MESSAGE_ACTIONS_TYPES.SUCCESS,
        payload: "Course created successfully",
      });
    })
    .catch((error) => {
      if (!error.response) {
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.ERROR,
          payload: "fail to create course, no response",
        });
      } else {
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.ERROR,
          payload: error.response.data.message,
        });
      }
    });
};

export const editCourse =
  (formValues, courseId) => async (dispatch, getState) => {
    server
      .put(
        `/course/${courseId}/edit`,
        { formValues },
        { headers: authHeader() }
      )
      .then((response) => {
        history.push("/instructor/course"); // avoid clearing alert message
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.SUCCESS,
          payload: "Course updated successfully",
        });
      })
      .catch((error) => {
        if (!error.response) {
          history.push("/instructor/course");
          dispatch({
            type: MESSAGE_ACTIONS_TYPES.ERROR,
            payload: "fail to update course, no response",
          });
        } else {
          history.push("/instructor/course");
          dispatch({
            type: MESSAGE_ACTIONS_TYPES.ERROR,
            payload: error.response.data.message,
          });
        }
      });
  };
