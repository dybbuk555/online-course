import { MESSAGE_ACTIONS_TYPES, ReviewFormType,ReducerStates } from "./types";
import { ActionWithPayload } from "../utils/reducer/reducer.utils";
import { authHeader } from "../helpers/auth-header";
import server from "../apis/server";
import history from "./../helpers/history";
import { ThunkDispatch } from "redux-thunk";



export const createReview = (formValues:ReviewFormType) => async (dispatch:ThunkDispatch<ReducerStates,void,ActionWithPayload<any>>):Promise<void> => {
  server
    .post("/review", { formValues }, { headers: authHeader()})
    .then((response) => {
      history.go(0);
      dispatch({
        type: MESSAGE_ACTIONS_TYPES.SUCCESS,
        payload: "Review created successfully",
      });
    })
    .catch((error) => {
      if (!error.response) {
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.ERROR,
          payload: "fail to create review, no response",
        });
      } else {
        history.push("/login");
        dispatch({
          type: MESSAGE_ACTIONS_TYPES.ERROR,
          payload: error.response.data.message,
        });
      }
    });
};
