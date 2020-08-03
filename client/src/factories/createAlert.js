let id = 0;

const defaultOptions = {
  color: "#2DCE89"
};

//create a new alert and pass in the options
export default function createAlert(options) {
  return {
    ...defaultOptions,
    ...options,
    id: id++
  };
}
