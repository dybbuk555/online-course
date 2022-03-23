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
      console.log("add shopcart");
      return [...state, action.payload];
    case DELETE_SHOPCART:
      return action.payload;
    // return state.filter((course) => {
    //   console.log(course._id, action.payload);
    //   return course._id !== action.payload;
    // });

    default:
      return state;
  }
};
