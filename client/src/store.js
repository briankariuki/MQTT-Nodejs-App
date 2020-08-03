import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {
  setLocale,
  loadTranslations,
  syncTranslationWithStore
} from "react-redux-i18n";

import translations from "./translations/translations";

const initialState = {};

const middleware = [thunk];

//Create store
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

//Configure the Translation Modules
syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale("en"));

export default store;
