import {
  FETCH_SHOPCART,
  ADD_SHOPCART,
  DELETE_SHOPCART,
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SHOPCART:
      return action.payload;
    case ADD_SHOPCART:
      if (state === null) {
        state = [];
      }
      console.log(state);
      return [...state, action.payload];
    case DELETE_SHOPCART:
      // implement filter in action
      return action.payload;

    default:
      return state;
  }
};
