import { MESSAGE_ACTIONS_TYPES } from "../actions/types";

const alertReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_ACTIONS_TYPES.SUCCESS:
      return { type: "alert-success", message: action.payload };
    case MESSAGE_ACTIONS_TYPES.ERROR:
      return { type: "alert-danger", message: action.payload };
    case MESSAGE_ACTIONS_TYPES.CLEAR:
      return {};
    default:
      return state;
  }
};

export default alertReducer;
