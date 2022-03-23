import jwt from "jwt-decode";
export function authHeader() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const jwtDecoded = jwt(user.jwtToken);

    if (user && user.jwtToken) {
      return { Authorization: "Bearer " + user.jwtToken };
    } else {
      console.log("fail to get token");
      return {};
    }
  } catch (error) {
    console.log("fail to parse token or token expried");
    return {};
  }
}
