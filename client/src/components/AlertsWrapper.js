import PropTypes from "prop-types";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { removeAlert } from "../actions/alertActions";
import Alert from "./Alert";

const AlertsWrapper = ({ actions, alerts }) => {
  const { removeAlert } = actions;

  let alertClasses = "alert-notification alerts ";

  if (alerts !== null && alerts.length > 0) {
    alertClasses += "alert-notification-open";
  }
  return (
    <ul className={alertClasses}>
      {alerts.map(alert => {
        const { id } = alert;
        return (
          <Alert {...alert} key={id} onDismissClick={() => removeAlert(id)} />
        );
      })}
    </ul>
  );
};

AlertsWrapper.propTypes = {
  actions: PropTypes.shape({
    removeAlert: PropTypes.func.isRequired
  }).isRequired,
  alerts: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ removeAlert }, dispatch)
});

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertsWrapper);
