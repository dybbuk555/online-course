import {
  ADD_SHOPCART,
  DELETE_SHOPCART,
  FETCH_SHOPCART,
  ERROR,
  SUCCESS,
} from "./types";

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
    dispatch({ type: ERROR, payload: "course already existis in shop cart" });
    return;
  }
  const { _id, price, title, category } = course;
  const instructor = course.instructor.username;
  const addCourse = { _id, price, title, category, instructor };
  shopCart.push(addCourse);
  localStorage.setItem("onlineCourseShopCart", JSON.stringify(shopCart));
  dispatch({ type: ADD_SHOPCART, payload: addCourse });
  dispatch({ type: SUCCESS, payload: `add course:${title} to shop cart` });
};

export const deleteShopCart = (courseId) => (dipatch) => {
  let shopCart = localStorage.getItem("onlineCourseShopCart");
  try {
    shopCart = JSON.parse(shopCart);
  } catch {
    dipatch({ type: ERROR, payload: "faill to remove course in shop cart" });
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
  dipatch({ type: DELETE_SHOPCART, payload: newShopCarts });
  dipatch({ type: SUCCESS, payload: `remove course:${title} successfully!` });
};

export const fetchShopCart = () => {
  let shopCart = localStorage.getItem("onlineCourseShopCart");
  try {
    shopCart = JSON.parse(shopCart);
  } catch {
    shopCart = [];
  }
  return { type: FETCH_SHOPCART, payload: shopCart };
};
