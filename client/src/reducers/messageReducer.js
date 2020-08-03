import {
  GET_MESSAGES,
  SEND_MESSAGE,
  DELETE_MESSAGE,
  MESSAGES_LOADING
} from "../actions/types";

const initialState = {
  messages: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES: {
      return {
        ...state,
        messages: action.payload, //append API response to messages array
        loading: false //set loading to false
      };
    }
    case DELETE_MESSAGE: {
      return {
        ...state,
        messages: state.messages.filter(
          message => message._id !== action.payload //get Id of mapped message that the user has deleted, then remove it from the array using the filter() method
        )
      };
    }
    case SEND_MESSAGE: {
      return {
        ...state,
        messages: [action.payload, ...state.messages] //return array of previous messages plus the response from the messages endpoint after publishing a message
      };
    }
    case MESSAGES_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    default: {
      return state; //return default state
    }
  }
}
