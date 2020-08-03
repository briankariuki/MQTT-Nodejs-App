import { setLocale } from "react-redux-i18n";
import { supportedLocales, fallbackLocale } from "../factories/i18n";

export function setLocaleWithFallback(desiredLocale) {
  //map through supportedLocales then return a selected Locale or otherwise return fallbackLocale
  const finalLocale = Object.keys(supportedLocales).includes(desiredLocale)
    ? desiredLocale
    : fallbackLocale;

  return dispatch => dispatch(setLocale(finalLocale)); // send dispatch to setLocale to the value of finalLocale
}
