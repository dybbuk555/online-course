import { SIGN_IN, SIGN_OUT } from "../actions/types";
import jwt from "jwt-decode";

let user = null;
let isExpried = true;
try {
  const tokenPared = JSON.parse(localStorage.getItem("user"));
  user = jwt(tokenPared.jwtToken);
  isExpried = Date.now() / 1000 - user.exp > 0;
  console.log("jwt token is expired:", isExpried);
} catch (errors) {}
const INITIAL_STATE =
  user && !isExpried
    ? {
        isSignedIn: true,
        user: user,
      }
    : { isSignedIn: false, user: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      // action.payload => decoded jwt data
      return { ...state, isSignedIn: true, user: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, user: null };
    default:
      return state;
  }
};
