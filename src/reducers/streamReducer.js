import _ from "lodash";

const SIGN_IN = {};
const SIGN_OUT = {};
const CREATE_STREAM = {};
const FETCH_STREAMS = {};
const FETCH_STREAM = {};
const DELETE_STREAM = {};
const EDIT_STREAM = {};

// is all data gonna stroe in state??

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };

    default:
      return state;
  }
};
