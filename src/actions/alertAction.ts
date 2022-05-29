import { MESSAGE_ACTIONS_TYPES, Message } from "./types";
import { Action, ActionWithPayload } from "../utils/reducer/reducer.utils";


export const messageSuccess = (message:Message):ActionWithPayload<Message> => {
  return {
    type: MESSAGE_ACTIONS_TYPES.SUCCESS,
    payload: message,
  };
};

export const messageError = (message:Message):ActionWithPayload<Message> => {
  return {
    type: MESSAGE_ACTIONS_TYPES.ERROR,
    payload: message,
  };
};

export const messageClear = ():Action => {
  return {
    type: MESSAGE_ACTIONS_TYPES.CLEAR,
  };
};
