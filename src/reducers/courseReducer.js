import { COURSE_ACTIONS_TYPES } from "../actions/types";

const courseReducer = (state = [], action) => {
  switch (action.type) {
    case COURSE_ACTIONS_TYPES.FETCH_COURSE:
      return action.payload;
    case COURSE_ACTIONS_TYPES.FETCH_COURSES:
      return action.payload;
    case COURSE_ACTIONS_TYPES.CREATE_COURSE:
      return { message: "create course successfully" };
    case COURSE_ACTIONS_TYPES.EDIT_COURSE:
      return { message: "edit course successfully" };
    case COURSE_ACTIONS_TYPES.SUBSCRIBE_COURSE:
      // update courses state after subscribing

      return state.map((course) => {
        if (course._id === action.payload._id) {
          course.students = action.payload.students;
        }
        return course;
      });
    case COURSE_ACTIONS_TYPES.UNSUBSCRIBE_COURSE:
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

export default courseReducer;
