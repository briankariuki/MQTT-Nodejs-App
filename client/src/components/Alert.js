import PropTypes from "prop-types";
import React, { Component } from "react";

class Alert extends Component {
  render() {
    return (
      <li
        className="rounded shadow-lg py-4 px-5 my-2 flex items-center justify-between"
        style={{ backgroundColor: this.props.color }}
      >
        <span className="flex items-center">
          <svg
            className="fill-current text-white h-6 w-6"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              d="M10,20A10,10,0,1,1,20,10,10.011,10.011,0,0,1,10,20ZM10,2a8,8,0,1,0,8,8A8.009,8.009,0,0,0,10,2ZM8.939,14H8.932a1,1,0,0,1-.788-.383L5.712,10.509A1,1,0,1,1,7.287,9.277l1.634,2.086L12.7,6.394A1,1,0,1,1,14.3,7.606l-4.569,6A1,1,0,0,1,8.939,14Z"
              transform="translate(0 0)"
            />
          </svg>
          <p className="ml-3 text-lg font-medium text-white">
            {this.props.text}
          </p>
        </span>
        <button
          onClick={this.props.onDismissClick}
          className="bg-green-600 h-8 w-8 rounded-full flex flex-col items-center justify-center focus:outline-none hover:bg-green-200"
        >
          <svg
            className="h-3 w-3 fill-current text-polardark"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <path d="M7.414,6l4.293-4.293A1,1,0,1,0,10.293.293L6,4.586,1.707.293A1,1,0,0,0,.293,1.707L4.586,6,.293,10.293a1,1,0,1,0,1.414,1.414L6,7.414l4.293,4.293a1,1,0,0,0,1.414-1.414Z" />
          </svg>
        </button>
      </li>
    );
  }

  shouldComponentUpdate() {
    return false;
  }
}

Alert.propTypes = {
  color: PropTypes.string.isRequired,
  onDismissClick: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
};

export default Alert;
