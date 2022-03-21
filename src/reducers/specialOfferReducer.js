import { CHECK_NEWSTUDENT } from "../actions/types";

export default (state = "", action) => {
  switch (action.type) {
    case CHECK_NEWSTUDENT:
      const timeDiff = Math.floor((action.payload - Date.now()) / 1000);
      return { timeDiff };
    default:
      return state;
  }
};
