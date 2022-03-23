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
  console.log(shopCart);
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

export const fetchShopCart = () => {
  let shopCart = localStorage.getItem("onlineCourseShopCart");
  try {
    shopCart = JSON.parse(shopCart);
  } catch {
    shopCart = [];
  }
  console.log("here is the list of shopcart:", shopCart);
  return { type: FETCH_SHOPCART, payload: shopCart };
};
