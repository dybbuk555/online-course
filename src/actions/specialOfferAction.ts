import { STUDENT_ACTIONS_TYPES } from "./types";

export type SpecialOfferAction = {type:STUDENT_ACTIONS_TYPES,payload:string }

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
