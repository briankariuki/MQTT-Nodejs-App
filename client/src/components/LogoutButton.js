import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import PropTypes from "prop-types";

export class LogoutButton extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };
  render() {
    return (
      <Fragment>
        <button
          className="flex items-center bg-white px-4 rounded py-2 text-polardark hover:shadow-lg focus:outline-none"
          onClick={this.props.logout}
        >
          <svg
            className="mr-2 fill-current"
            width="14"
            height="18"
            viewBox="0 0 14 18"
          >
            <path
              d="M13,18a1,1,0,0,1-1-1A5,5,0,1,0,2,17a1,1,0,1,1-2,0,7,7,0,0,1,14,0A1,1,0,0,1,13,18ZM7,8a4,4,0,1,1,4-4A4.005,4.005,0,0,1,7,8ZM7,2A2,2,0,1,0,9,4,2,2,0,0,0,7,2Z"
              transform="translate(0)"
            />
          </svg>

          <p>Logout</p>
        </button>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(LogoutButton);
