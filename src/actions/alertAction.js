import { MESSAGE_ACTIONS_TYPES } from "./types";

export const messageSuccess = (message) => {
  return {
    type: MESSAGE_ACTIONS_TYPES.SUCCESS,
    payload: message,
  };
};

export const messageError = (message) => {
  return {
    type: MESSAGE_ACTIONS_TYPES.ERROR,
    payload: message,
  };
};

export const messageClear = () => {
  return {
    type: MESSAGE_ACTIONS_TYPES.CLEAR,
  };
};
