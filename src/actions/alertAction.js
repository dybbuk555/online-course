import { SUCCESS, ERROR, CLEAR } from "./types";

export const messageSuccess = (message) => {
  return {
    type: SUCCESS,
    payload: message,
  };
};

export const messageError = (message) => {
  return {
    type: ERROR,
    payload: message,
  };
};

export const messageClear = () => {
  return {
    type: CLEAR,
  };
};
