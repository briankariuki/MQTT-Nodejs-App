import { combineReducers } from "redux";
import { i18nReducer } from "react-redux-i18n";
import messageReducer from "./messageReducer";
import alertsReducer from "./alertsReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

//Combine reducers
export default combineReducers({
  message: messageReducer,
  alert: alertsReducer,
  i18n: i18nReducer,
  auth: authReducer,
  error: errorReducer
});
