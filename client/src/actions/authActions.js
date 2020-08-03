import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "../actions/types";
import axios from "axios";
import { returnErrors } from "./errorActions";
// Check for token and get user

export const getUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING //Call USER_LOADING action
  });

  axios
    .get("api/user", tokenConfig(getState)) //send request to api/user endpoint and pass in a token to check if valid and return info about user
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data.user //set response to payload
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status)); //get errors and dispatch to returnErrors function
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register a User

export const register = ({ username, email, password }) => dispatch => {
  //set headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  //stringify the request body
  const body = JSON.stringify({ username, email, password });

  axios
    .post("api/register", body, config) // send a POST request to the api/register endpoint and pass in body and config
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS, //on success rsponse dispatch action type REGISTER_SUCCESS, and pass in the response.data as payload
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL") //if errors return errors and give it id of "REGISTER_FAIL"
      );
      dispatch({
        type: REGISTER_FAIL //dispatch REGISTER_FAIL endpoint
      });
    });
};

//Login user
export const login = ({ email, password }) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  axios
    .post("api/login", body, config) // send a POST request to the api/login endpoint and pass in body and config
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS, //dispatch LOGIN_SUCCESS action and pass in response.data as payload
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL") //if err, dispatch returnErrors and set error id to "LOGIN_FAIL"
      );
      dispatch({
        type: LOGIN_FAIL //then dispatch LOGIN_FAIL action
      });
    });
};

// logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS //dispatch LOGOUT_SUCCESS action
  };
};

//Config Headers helper function

export const tokenConfig = getState => {
  //Token from LocalStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // add token to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
