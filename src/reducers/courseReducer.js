import { CREATE_COURSE, EDIT_COURSE, FETCH_COURSES } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      console.log("in reducer fetch courses");
      return { data: action.payload };
    case CREATE_COURSE:
      return { message: "create course successfully" };
    case EDIT_COURSE:
      return { message: "edit course successfully" };
    default:
      return state;
  }
};
