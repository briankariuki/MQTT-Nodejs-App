import React, { Component } from "react";
import { Translate } from "react-redux-i18n";
import { register } from "../actions/authActions";
import illustration from "../assets/illustration_02.svg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/errorActions";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  componentDidMount() {
    document.title = "Register for an Account | Polar WebApp";
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.error });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  registerUser = e => {
    e.preventDefault();
    const { username, email, password } = this.state;

    const newUser = {
      username,
      email,
      password
    };

    this.props.register(newUser);

    this.props.clearErrors();
  };
  render() {
    return (
      <div className="max-w-screen-xl lg:w-4/5 lg:mt-16 mt-4 w-9/10 mx-auto overflow-x-hidden">
        <div className="lg:flex items-center">
          <div className="lg:w-1/2 order-last">
            <div className="mx-auto lg:mt-20 mt-4 lottie-container">
              <img className="mx-auto" src={illustration} alt="" />
            </div>
          </div>
          <div className="lg:w-1/2 order-first overflow-x-hidden mb-20">
            <h2 className="mt-4 leading-tight font-semibold lg:text-5xl text-3xl text-center lg:text-left">
              <Translate value="register.title" />
            </h2>
            <p className="font-medium text-polargrey lg:my-10 my-4 text-center lg:text-left">
              <Translate value="register.paragraph1" />
            </p>
            <div className="lg:w-4/5">
              {this.state.msg ? (
                <div className="bg-red-100 rounded border border-red-800 py-4 px-4  text-red-800">
                  {this.state.msg}
                </div>
              ) : null}
              <form className="mt-3" onSubmit={this.registerUser}>
                <input
                  className="appearance-none block w-full text-polardark bg-gray-100 border  rounded mb-3 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-polarpurple "
                  placeholder="Email"
                  type="text"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                />
                <input
                  className="appearance-none block w-full text-polardark bg-gray-100 border  rounded mb-3 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-polarpurple "
                  placeholder="User Name"
                  type="text"
                  name="username"
                  onChange={this.onChange}
                  value={this.state.username}
                />
                <input
                  className="appearance-none block w-full text-polardark bg-gray-100 border  rounded mb-3 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-polarpurple "
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                />
                <div className="">
                  <button className="flex items-center mt-10 justify-center mx-auto lg:ml-0 bg-polarpurple px-4 w-40 rounded py-3 text-white hover:shadow-lg focus:outline-none">
                    <Translate value="register.buttonText" />
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
                </div>
              </form>
              <p className="mt-8 text-center text-lg">
                <Translate value="register.already" />
                <Link to="login">
                  <span className="ml-2 text-polarpurple hover:font-medium">
                    <Translate value="register.login" />
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
export default connect(mapStateToProps, { register, clearErrors })(Register);
