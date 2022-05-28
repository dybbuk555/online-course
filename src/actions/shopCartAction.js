import { SHOPCART_ACTIONS_TYPES } from "./types";
import { MESSAGE_ACTIONS_TYPES } from "./types";

export const addShopCart = (course) => (dispatch) => {
  let shopCart = localStorage.getItem("onlineCourseShopCart");
  try {
    shopCart = JSON.parse(shopCart);
  } catch {}
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
  const instructor = course.instructor.username;
  const addCourse = { _id, price, title, category, instructor };
  shopCart.push(addCourse);
  localStorage.setItem("onlineCourseShopCart", JSON.stringify(shopCart));
  dispatch({ type: SHOPCART_ACTIONS_TYPES.ADD_SHOPCART, payload: addCourse });
  dispatch({
    type: MESSAGE_ACTIONS_TYPES.SUCCESS,
    payload: `add course:${title} to shop cart`,
  });
};

export const deleteShopCart = (courseId) => (dipatch) => {
  let shopCart = localStorage.getItem("onlineCourseShopCart");
  try {
    shopCart = JSON.parse(shopCart);
  } catch {
    dipatch({
      type: MESSAGE_ACTIONS_TYPES.ERROR,
      payload: "faill to remove course in shop cart",
    });
    return;
  }
  let title = "";
  const newShopCarts = shopCart.filter((course) => {
    if (course._id === courseId) {
      title = course.title;
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
};

export const fetchShopCart = () => {
  let shopCart = localStorage.getItem("onlineCourseShopCart");
  try {
    shopCart = JSON.parse(shopCart);
  } catch {
    shopCart = [];
  }
  return { type: SHOPCART_ACTIONS_TYPES.FETCH_SHOPCART, payload: shopCart };
};
