import { checkNewStudent } from "../actions/specialOfferAction";

const specialOfferReducer = (state = "", action) => {
  switch (action.type) {
    case checkNewStudent.CHECK_NEWSTUDENT:
      // a redundant variable: remainTime is to keep the componentDidMount lifeCycle going
      return {
        firstVisited: action.payload,
        remainTime: action.payload - Date.now(),
      };
    default:
      return state;
  }
};

export default specialOfferReducer;
