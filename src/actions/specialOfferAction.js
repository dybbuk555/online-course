import { CHECK_NEWSTUDENT } from "./types";

export const checkNewStudent = () => (dispatch) => {
  var specialOffer = localStorage.getItem("onlineCourseSpecialOffer");

  if (!specialOffer) {
    specialOffer = Date.now() + 5 * 60 * 60 * 1000;
    localStorage.setItem("onlineCourseSpecialOffer", specialOffer);
  }

  dispatch({ type: CHECK_NEWSTUDENT, payload: specialOffer });
};
