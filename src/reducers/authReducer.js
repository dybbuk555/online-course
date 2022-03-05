import { SIGN_IN, SIGN_OUT } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));
const INITIAL_STATE = user
  ? {
      isSignedIn: true,
      user: user,
    }
  : { isSignedIn: false, user: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      // action.payload => decoded jwt data
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
