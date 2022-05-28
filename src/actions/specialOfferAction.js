import { STUDENT_ACTIONS_TYPES } from "./types";

export const checkNewStudent = () => {
  var specialOffer = localStorage.getItem("onlineCourseSpecialOffer");

  if (!specialOffer) {
    specialOffer = Date.now() + 5 * 60 * 60 * 1000;
    localStorage.setItem("onlineCourseSpecialOffer", specialOffer);
  }

  return {
    type: STUDENT_ACTIONS_TYPES.CHECK_NEWSTUDENT,
    payload: specialOffer,
  };
};
