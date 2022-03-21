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
      console.log("in reducer fetch course state:", state, "action", action);
      return action.payload;
    case FETCH_COURSES:
      console.log("in reducer fetch courses");
      return action.payload;
    case CREATE_COURSE:
      return { message: "create course successfully" };
    case EDIT_COURSE:
      return { message: "edit course successfully" };
    case SUBSCRIBE_COURSE:
      // update courses state after subscribing
      console.log("subscribe course reduer:", state, action);
      return state.map((course) => {
        console.log(
          "SSSSSSSSSSS courseId",
          course._id,
          "payloadid",
          action.payload._id
        );
        if (course._id === action.payload._id) {
          console.log("targert course, before updating student:", course);
          course.students = action.payload.students;
          console.log("targert course, update student:", course);
        }
        return course;
      });
    case UNSUBSCRIBE_COURSE:
      console.log("UNUNUNUNUNsubscribe course reduer:", state, action);
      return state.map((course) => {
        console.log(
          "UUUUUUUUUUUUSSSSSSSSSSS courseId",
          course._id,
          "payloadid",
          action.payload._id
        );
        if (course._id === action.payload._id) {
          console.log("targert course, before updating student:", course);
          course.students = action.payload.students;
          console.log("targert course, update student:", course);
        }
        return course;
      });
    default:
      return state;
  }
};
