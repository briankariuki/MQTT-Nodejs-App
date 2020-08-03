import { GET_ERRORS, CLEAR_ERRORS } from "./types";

export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS, //return GET_ERRORS action on returnErrors() function
    payload: { msg, status, id }
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS //return CLEAR_ERRORS action on clearErrors()
  };
};
