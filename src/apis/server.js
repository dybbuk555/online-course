import axios from "axios";
const URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:9000"
    : "http://safe-plains-62599.herokuapp.com";

export default axios.create({
  baseURL: URL,
});
