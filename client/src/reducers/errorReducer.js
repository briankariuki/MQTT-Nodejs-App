import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
  id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS: {
      return {
        msg: action.payload.msg, //set msg to error received from the API endpoints
        status: action.payload.status, // set the status i.e 404, 401, 400
        id: action.payload.id // an id to be able to clear errors
      };
    }
    case CLEAR_ERRORS: {
      return {
        msg: {}, //set msg to empty
        status: null, //set status and id to null
        id: null
      };
    }
    default: {
      return state; //return default state
    }
  }
}
