import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { Translate } from "react-redux-i18n";
import { getMessages, deleteMessage } from "../actions/messageActions";
import PropTypes from "prop-types";

class ShowMessages extends Component {
  componentDidMount() {
    this.props.getMessages();
  }
  delMessage = id => {
    this.props.deleteMessage(id);
  };
  render() {
    const { messages } = this.props.message;
    const { loading } = this.props.message;
    const topic = "HelloServer";
    return (
      <div>
        <div className="rounded shadow lg:p-6 py-6 px-2">
          <h2 className="text-2xl">
            <Translate value="dashboard.showMsgTitle" />
          </h2>

          {loading ? (
            <div className="flex flex-col items-center">
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <TransitionGroup>
              {messages.map(({ _id, Time, File }) => (
                <CSSTransition key={Time} timeout={500} classNames="fade">
                  <div className=" flex  border my-4 px-4 py-3 rounded">
                    <div className="border-r pr-4">
                      <svg
                        className="h-8 w-8 fill-current text-polarorange"
                        width="20"
                        height="16"
                        viewBox="0 0 20 16"
                      >
                        <path
                          d="M17,16H3a3,3,0,0,1-3-3V3A3,3,0,0,1,3,0H17a3,3,0,0,1,3,3V13A3,3,0,0,1,17,16ZM2,3.25V13a1,1,0,0,0,1,1H17a1,1,0,0,0,1-1V3.25L10.6,8.8a1,1,0,0,1-1.2,0ZM3.667,2,10,6.75,16.333,2Z"
                          transform="translate(0 0)"
                        />
                      </svg>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="lg:flex mb-2 items-center">
                        <p className="text-gray-800">{topic}</p>
                        <div className="flex items-center lg:ml-6 mt-1 lg:mt-0">
                          <svg
                            className="flex-shrink-0 fill-current text-polarorange h-4 w-4 hidden-md-down"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M10,20A10,10,0,1,1,20,10,10.011,10.011,0,0,1,10,20ZM10,2a8,8,0,1,0,8,8A8.009,8.009,0,0,0,10,2Zm4,9H10a1,1,0,0,1-1-1V6a1,1,0,1,1,2,0V9h3a1,1,0,1,1,0,2Z"
                              transform="translate(0 0)"
                            />
                          </svg>
                          <p className="text-sm lg:text-base text-polarorange md:ml-2">
                            {new Date(Time).toLocaleString("en-US", {
                              dateStyle: "full",
                              timeStyle: "short"
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-xl font-medium text-polardark">
                        {File}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={this.delMessage.bind(this, _id)}
                        className="bg-gray-200 h-10 w-10 rounded-full flex flex-col items-center justify-center focus:outline-none hover:bg-gray-300"
                      >
                        <svg
                          className="h-5 w-5 fill-current text-polargrey"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M15,20H5a3,3,0,0,1-3-3V6H1A1,1,0,0,1,1,4H6V2.328A2.421,2.421,0,0,1,8.5,0h3A2.422,2.422,0,0,1,14,2.328V4h5a1,1,0,0,1,0,2H18V17A3,3,0,0,1,15,20ZM4,6V17a1,1,0,0,0,1,1H15a1,1,0,0,0,1-1V6ZM8.5,2c-.286,0-.5.173-.5.328V4h4V2.328C12,2.173,11.786,2,11.5,2ZM13,15a1,1,0,0,1-1-1V10a1,1,0,0,1,2,0v4A1,1,0,0,1,13,15ZM7,15a1,1,0,0,1-1-1V10a1,1,0,0,1,2,0v4A1,1,0,0,1,7,15Z"
                            transform="translate(0 0)"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </div>
      </div>
    );
  }
}

ShowMessages.propTypes = {
  getMessages: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  message: state.message
});
export default connect(mapStateToProps, { getMessages, deleteMessage })(
  ShowMessages
);
