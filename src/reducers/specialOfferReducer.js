import { CHECK_NEWSTUDENT } from "../actions/types";

export default (state = "", action) => {
  switch (action.type) {
    case CHECK_NEWSTUDENT:
      // a redundant variable: remainTime is to keep the componentDidMount lifeCycle going
      return {
        firstVisited: action.payload,
        remainTime: action.payload - Date.now(),
      };
    default:
      return state;
  }
};
