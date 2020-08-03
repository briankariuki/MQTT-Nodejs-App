import createAlert from "../factories/createAlert";
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

export function addAlert(options = {}) {
  return {
    payload: createAlert(options),
    type: SET_ALERT
  };
}

export function removeAlert(id) {
  return {
    payload: id,
    type: REMOVE_ALERT
  };
}
