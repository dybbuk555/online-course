import { CREATE_COURSE, EDIT_COURSE } from "./types";

export const createCourse = (formValues) => async (dispatch, getState) => {
  console.log("this is createCourse action", formValues);
  dispatch({ type: CREATE_COURSE, payload: "create course" });
};

export const editCourse = (formValues) => async (dispatch, getState) => {
  console.log("this is editCourse action", formValues);
  dispatch({ type: EDIT_COURSE, payload: "Edit course" });
};
