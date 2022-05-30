import { SHOPCART_ACTIONS_TYPES,CourseType,ShopCartType, MESSAGE_ACTIONS_TYPES,ReducerStates} from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ActionWithPayload } from "../utils/reducer/reducer.utils";

export const addShopCart = (course:CourseType)=> (dispatch:ThunkDispatch<ReducerStates, void,ActionWithPayload<any>>) => {
  let shopCartString:string|null = localStorage.getItem("onlineCourseShopCart");
  let shopCart 
  if(shopCartString){
    // type guard
    try {
      shopCart = JSON.parse(shopCartString);
    } catch {}
  }

  if (!Array.isArray(shopCart)) {
    shopCart = [];
  }
  const alreadyAdded = shopCart.some((item) => {
    return item._id === course._id;
  });

  if (alreadyAdded) {
    dispatch({
      type: MESSAGE_ACTIONS_TYPES.ERROR,
      payload: "course already existis in shop cart",
    });
    return;
  }
  const { _id, price, title, category } = course;
  const instructor = course?.instructor?.username;
  const addCourse = { _id, price, title, category, instructor };
  shopCart.push(addCourse);
  localStorage.setItem("onlineCourseShopCart", JSON.stringify(shopCart));
  dispatch({ type: SHOPCART_ACTIONS_TYPES.ADD_SHOPCART, payload: addCourse });
  dispatch({
    type: MESSAGE_ACTIONS_TYPES.SUCCESS,
    payload: `add course:${title} to shop cart`,
  });
};

export const deleteShopCart = (courseId:string) => (dipatch: ThunkDispatch<ReducerStates, void,ActionWithPayload<any>>) => {
  let shopCartString = localStorage.getItem("onlineCourseShopCart");
  try {
    if(!shopCartString){throw Error}
    const shopCart = JSON.parse(shopCartString);
    let title = "";
    const newShopCarts = shopCart.filter((course:CourseType) => {
      if (course._id === courseId) {
        
        title = !!course.title ? course.title : ""
        return false;
      } else {
        return true;
      }
    });
    localStorage.setItem("onlineCourseShopCart", JSON.stringify(newShopCarts));
    dipatch({
      type: SHOPCART_ACTIONS_TYPES.DELETE_SHOPCART,
      payload: newShopCarts,
    });
    dipatch({
      type: MESSAGE_ACTIONS_TYPES.SUCCESS,
      payload: `remove course:${title} successfully!`,
    });
  } catch {
    dipatch({
      type: MESSAGE_ACTIONS_TYPES.ERROR,
      payload: "faill to remove course in shop cart",
    });
    return;
  }

};

export const fetchShopCart = () => {
  const  shopCartString = localStorage.getItem("onlineCourseShopCart");
  let shopCart = []
  if( shopCartString){
    shopCart = JSON.parse(shopCartString);
  }
  
  return { type: SHOPCART_ACTIONS_TYPES.FETCH_SHOPCART, payload: shopCart };
};
