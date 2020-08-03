import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../actions/types";

//Initiate default auth state
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING: {
      return {
        ...state, //return current state
        isLoading: true, //set isloading to true
      };
    }
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true, //set isAuthenticated to true
        isLoading: false, //set isloading to false
        user: action.payload, // Pass payload from the user endpoint to our auth actions
      };
    }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: {
      localStorage.setItem("token", action.payload.token); //set and save jwt token to local storage
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    }
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case REGISTER_FAIL: {
      localStorage.removeItem("token"); //remove jwt token to local storage
      return {
        ...state, // return current state
        token: null, //set token, user to null
        user: null,
        isAuthenticated: false, //set isAuthenticated to false
        isLoading: false,
      };
    }

    default: {
      return state; //default state
    }
  }
}
