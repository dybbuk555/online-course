import { CREATE_COURSE, EDIT_COURSE } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_COURSE:
      return { message: "create course successfully" };
    case EDIT_COURSE:
      return { message: "edit course successfully" };
    default:
      return state;
  }
};
