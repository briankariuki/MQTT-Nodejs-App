//Get the rtl or ltr depending on the language and locale selected
export function getDir(state) {
  return state.i18n.locale === "ar" ? "rtl" : "ltr";
}
