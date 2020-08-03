import React from "react";
import axios from "axios";
import {
  GET_MESSAGES,
  SEND_MESSAGE,
  DELETE_MESSAGE,
  MESSAGES_LOADING
} from "../actions/types";
import { Translate } from "react-redux-i18n";
import { addAlert } from "./alertActions";
import { tokenConfig } from "./authActions";

//get messages function
export const getMessages = () => (dispatch, getState) => {
  dispatch(setMessagesLoading()); //set messages to loading
  axios.get("api/mqtt/messages", tokenConfig(getState)).then((
    res //GET request to api/mqtt/messages, pass in token for Authorization
  ) =>
    dispatch({
      type: GET_MESSAGES, //on success dispatch GET_MESSAGES and pass in the response as the payload
      payload: res.data
    })
  );
};

//send message function
export const sendMessage = message => (dispatch, getState) => {
  axios.post("api/mqtt/", message, tokenConfig(getState)).then((
    res //POST request to api/mqtt/, with the message, pass in token for Authorization
  ) =>
    Promise.all([
      //allows the dispatch to execute one after the other
      dispatch({
        type: SEND_MESSAGE, //first dispatch SEND_MESSAGE Action and pass in the response as payload
        payload: res.data
      }),
      dispatch(
        addAlert({ text: <Translate value="dashboard.successMessage" /> }) //then dispatch an addALert to alert in the browser that send message has been succesful
      )
    ])
  );
};
export const deleteMessage = id => (dispatch, getState) => {
  axios.delete(`api/mqtt/messages/${id}`, tokenConfig(getState)).then((
    res //DELETE request to api/mqtt/messages/${id},  pass in token for Authorization
  ) =>
    Promise.all([
      dispatch({
        type: DELETE_MESSAGE, //on success dispatch DELETE_MESSAGE Action and pass in the payload
        payload: id
      }),
      dispatch(
        addAlert({ text: <Translate value="dashboard.deleteMessage" /> }) //then dispatch an addALert to alert in the browser that message has been deleted succesfully
      )
    ])
  );
};
export const setMessagesLoading = () => {
  return {
    type: MESSAGES_LOADING //return MESSAGES_LOADING Action
  };
};
