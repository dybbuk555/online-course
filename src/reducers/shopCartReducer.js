import { FETCH_SHOPCART, ADD_SHOPCART } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SHOPCART:
      return action.payload;
    case ADD_SHOPCART:
      console.log("add shopcart");

      return [...state, action.payload];

    default:
      return state;
  }
};
