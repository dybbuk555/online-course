import { STUDENT_ACTIONS_TYPES, SpecialOfferType } from "./types";

export const checkNewStudent = () => {
  var specialOffer = localStorage.getItem("onlineCourseSpecialOffer") as number | null

  if (!specialOffer) {
    specialOffer = Date.now() + 5 * 60 * 60 * 1000;
    localStorage.setItem("onlineCourseSpecialOffer", specialOffer.toString());
  }

  return {
    type: STUDENT_ACTIONS_TYPES.CHECK_NEWSTUDENT,
    payload: specialOffer,
  };
};
