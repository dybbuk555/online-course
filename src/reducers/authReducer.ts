import { USER_ACTIONS_TYPES ,UserDataType} from "../actions/types";
import { UserActionType } from "../actions";
import jwt from "jwt-decode";



let user:UserDataType | null = null
let isExpried = true;
try {
  const userLocalStorageData = localStorage.getItem("user")
  if(typeof userLocalStorageData === 'string'){
    const tokenParsed = JSON.parse(userLocalStorageData)
    user = jwt(tokenParsed.jwtToken) 
    if(user){
      isExpried = Date.now() / 1000 - user.exp > 0;
      console.log("jwt token is expired:", isExpried,user);
    }
 
  }

} catch (errors) {
  console.log("jwt data is invalid")

}
const INITIAL_STATE =
  user && !isExpried
    ? {
        isSignedIn: true,
        user: user,
      }
    : { isSignedIn: false, user: null };

const authReducer = (state = INITIAL_STATE, action: UserActionType) => {
  switch (action.type) {
    case USER_ACTIONS_TYPES.SIGN_IN:
      // action.payload => decoded jwt data
      return { ...state, isSignedIn: true, user: action.payload };
    case USER_ACTIONS_TYPES.SIGN_OUT:
      return { ...state, isSignedIn: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
