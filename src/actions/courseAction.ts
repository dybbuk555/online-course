import { MESSAGE_ACTIONS_TYPES,COURSE_ACTIONS_TYPES, CourseType ,ReducerStates,FetchCouresParamsTypes,CourseSortType} from "./types";
import { ThunkDispatch, } from "redux-thunk";
import { ActionWithPayload } from "../utils/reducer/reducer.utils";

import { authHeader } from "../helpers/auth-header";
import server from "../apis/server";
import { orderBy } from "lodash";
import history from "./../helpers/history";

export const unSubscribeCourse = (course:CourseType) => async (dispatch:ThunkDispatch<ReducerStates, void,ActionWithPayload<any>>):Promise<void> => {
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

export const subscribeCourse = (course:CourseType) => async (dispatch:ThunkDispatch<ReducerStates, void,ActionWithPayload<any>>, getState:() => ReducerStates) => {
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

export const fetchCourse = (courseId:CourseType) => async (dispatch:ThunkDispatch<ReducerStates, void,ActionWithPayload<any>>) => {
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

export const fetchCourses = (parameters:FetchCouresParamsTypes) => async (dispatch:ThunkDispatch<ReducerStates, void,ActionWithPayload<any>>) => {
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

export const sortCourses = (sortBy:CourseSortType) => (dispatch:ThunkDispatch<ReducerStates, void,ActionWithPayload<any>>, getState:() => ReducerStates) => {
  let sortedArray;
  switch (sortBy) {
    case "Instructor":
      sortedArray = orderBy(
        getState().courses,
        (item) => item.instructor.username,
        ["asc"]
      );
      break;
    case "reverse":
      sortedArray = getState().courses.slice().reverse();
      break;
    default:
      sortedArray = orderBy(
        getState().courses,
        [sortBy.toLowerCase()],
        ["asc"]
      );
  }

  dispatch({ type: COURSE_ACTIONS_TYPES.FETCH_COURSES, payload: sortedArray });
};

export const createCourse = (formValues:CourseType) => async (dispatch:ThunkDispatch<ReducerStates, void,ActionWithPayload<any>>) => {
  server
    .post("/course", { formValues }, { headers: authHeader() })
    .then(() => {
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
  (formValues:CourseType, courseId:string) => async (dispatch:ThunkDispatch<ReducerStates, void,ActionWithPayload<any>> ) => {
    server
      .put(
        `/course/${courseId}/edit`,
        { formValues },
        { headers: authHeader() }
      )
      .then(() => {
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
