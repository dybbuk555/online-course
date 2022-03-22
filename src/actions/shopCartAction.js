import { ADD_SHOPCART, DELETE_SHOPCART, ERROR, SUCCESS } from "./types";

export const addShopCart = (course) => {
  console.log("addShopCart action:", course);
  let shopCart = localStorage.getItem("onlineCourseShopCart");
  try {
    shopCart = JSON.parse(shopCart);
  } catch {}

  if (Array.isArray(shopCart)) {
    const alreadyAdded = shopCart.some((item) => {
      return item._id === course._id;
    });
    if (alreadyAdded) {
      return { type: ERROR, payload: "course already existis in shop cart" };
    }
  } else {
    shopCart = [];
  }
  console.log("this is shopcart:", shopCart);
  const { _id, price, title } = course;
  const instructor = course.instructor.username;
  shopCart.push({ _id, price, title, instructor });
  console.log("this is shopcart:", shopCart);
  localStorage.setItem("onlineCourseShopCart", JSON.stringify(shopCart));

  return { type: SUCCESS, payload: `add course:${title} to shop cart` };
};
