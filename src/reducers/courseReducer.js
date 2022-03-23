import {
  CREATE_COURSE,
  EDIT_COURSE,
  FETCH_COURSES,
  FETCH_COURSE,
  SUBSCRIBE_COURSE,
  UNSUBSCRIBE_COURSE,
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_COURSE:
      return action.payload;
    case FETCH_COURSES:
      return action.payload;
    case CREATE_COURSE:
      return { message: "create course successfully" };
    case EDIT_COURSE:
      return { message: "edit course successfully" };
    case SUBSCRIBE_COURSE:
      // update courses state after subscribing

      return state.map((course) => {
        if (course._id === action.payload._id) {
          course.students = action.payload.students;
        }
        return course;
      });
    case UNSUBSCRIBE_COURSE:
      return state.map((course) => {
        if (course._id === action.payload._id) {
          course.students = action.payload.students;
        }
        return course;
      });
    default:
      return state;
  }
};
