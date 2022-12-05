import axios from "axios";
const URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:9000"
    : "https://online-course-backend.onrender.com";
    // migrate from heroku to render
    //"https://safe-plains-62599.herokuapp.com";

export default axios.create({
  baseURL: URL,
});
