import React, { Component } from "react";
import { sendMessage } from "../actions/messageActions";
import { Translate } from "react-redux-i18n";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PublishMessage extends Component {
  state = {
    message: "",
    topic: "HelloServer",
    userId: this.props.auth.user.id
  };
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  onChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  submitMessage = e => {
    e.preventDefault();

    const newMessage = {
      userId: this.state.userId,
      topic: this.state.topic,
      message: this.state.message
    };
    this.setState({
      message: ""
    });
    this.props.sendMessage(newMessage);
  };
  render() {
    return (
      <div>
        <div className="relative rounded shadow px-6 py-6">
          <h2 className="text-2xl">
            <Translate value="dashboard.sendMessage" />
          </h2>

          <form className="mt-3" onSubmit={this.submitMessage}>
            <div className="my-4">
              <label
                className="block text-base text-polarpurple text-xs mb-2"
                htmlFor="message"
              >
                <Translate value="dashboard.msg" />
              </label>
              <textarea
                name="message"
                type="text"
                rows="5"
                onChange={this.onChange}
                value={this.state.message}
                className="appearance-none block w-full text-polardark bg-gray-100 border  rounded mb-3 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-polarpurple "
              ></textarea>
            </div>
            <button className="mt-6 flex items-center justify-center bg-polarpurple px-4 w-40 rounded py-3 text-white hover:shadow-lg focus:outline-none">
              <Translate value="dashboard.publish" />
              <svg
                className="ml-2 h-5 w-5 fill-current text-white"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10,20A10,10,0,1,1,20,10,10.011,10.011,0,0,1,10,20ZM10,2a8,8,0,1,0,8,8A8.009,8.009,0,0,0,10,2Zm1,12a1,1,0,0,1-.707-1.707L11.586,11H6A1,1,0,0,1,6,9h5.664l-1.25-1.31a1,1,0,0,1,1.447-1.381l2.863,3a.363.363,0,0,1,.053.079.541.541,0,0,0,.033.056l.029.042a.656.656,0,0,1,.084.14.95.95,0,0,1,.058.282.209.209,0,0,0,.009.042A.177.177,0,0,1,15,10a1.029,1.029,0,0,1-.078.384,1,1,0,0,1-.215.322l-3,3A.994.994,0,0,1,11,14Z"
                  transform="translate(0 0)"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  auth: state.auth
});

export default connect(mapStateToProps, { sendMessage })(PublishMessage);
