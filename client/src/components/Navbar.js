import React, { Component, Fragment } from "react";
import LanguageButton from "./LanguageButton";
import LogoutButton from "./LogoutButton";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import { Translate } from "react-redux-i18n";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {
    isOpen: false
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  logoutClick = e => {
    this.props.logout();
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authlinks = (
      <div className="mx-4 hidden-lg-down">
        <LogoutButton />
      </div>
    );

    let mobileNavClasses =
      "absolute z-20 top-0 left-0 hidden-lg-up text-black h-screen w-72 flex flex-col bg-white shadow-lg mobile-nav";
    if (this.state.isOpen) {
      mobileNavClasses += "mobile-nav-open";
    }
    let mobileNavToggle =
      "ml-4 focus:outline-none text-white z-20 hidden-lg-up ";
    if (this.state.isOpen) {
      mobileNavToggle += "change";
    }

    return (
      <nav className="relative bg-polardark py-3 px-6 lg:px-0">
        <div className="max-w-screen-xl lg:w-4/5 mx-auto flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center cursor-pointer">
              <svg
                className="h-6 w-6 fill-current text-white"
                viewBox="0 0 960.56 1031.16"
              >
                <g data-name="Layer 2">
                  <g data-name="Layer 1">
                    <path
                      fill="none"
                      stroke="#fff"
                      stroke-miterlimit="10"
                      stroke-width="93.64"
                      d="M33.26 507.4l452.71 456.8 440.9-456.8"
                    />
                    <path d="M479.44 735.7L114.7 367.85 479.44 0l364.73 367.85L479.44 735.7z" />
                  </g>
                </g>
              </svg>
              <h2 className="text-white font-medium text-xl ml-2">Polar</h2>
            </div>
          </Link>

          <div className="flex items-center">
            <LanguageButton />
            {isAuthenticated ? authlinks : null}
            <a
              href="https://github.com/briankariuki"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden-lg-down ml-4"
            >
              <button className="flex items-center bg-white px-4 rounded py-2 text-polardark hover:shadow-lg focus:outline-none">
                <svg
                  className="fill-current h-6 w-6 mr-2"
                  width="100"
                  height="100"
                  fill="none"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M512 0C229.12 0 0 229.12 0 512c0 226.56 146.56 417.92 350.08 485.76 25.6 4.48 35.2-10.88 35.2-24.32 0-12.16-.64-52.48-.64-95.36-128.64 23.68-161.92-31.36-172.16-60.16-5.76-14.72-30.72-60.16-52.48-72.32-17.92-9.6-43.52-33.28-.64-33.92 40.32-.64 69.12 37.12 78.72 52.48 46.08 77.44 119.68 55.68 149.12 42.24 4.48-33.28 17.92-55.68 32.64-68.48-113.92-12.8-232.96-56.96-232.96-252.8 0-55.68 19.84-101.76 52.48-137.6-5.12-12.8-23.04-65.28 5.12-135.68 0 0 42.88-13.44 140.8 52.48 40.96-11.52 84.48-17.28 128-17.28 43.52 0 87.04 5.76 128 17.28 97.92-66.56 140.8-52.48 140.8-52.48 28.16 70.4 10.24 122.88 5.12 135.68 32.64 35.84 52.48 81.28 52.48 137.6 0 196.48-119.68 240-233.6 252.8 18.56 16 34.56 46.72 34.56 94.72 0 68.48-.64 123.52-.64 140.8 0 13.44 9.6 29.44 35.2 24.32C877.44 929.92 1024 737.92 1024 512 1024 229.12 794.88 0 512 0z"
                    fill="#1B1F23"
                  />
                </svg>
                Github
              </button>
            </a>

            <button className={mobileNavToggle} onClick={this.toggle}>
              <div className="bar-1"></div>
              <div className="bar-2 my-1"></div>
              <div className="bar-3"></div>
            </button>
          </div>
        </div>

        <div className={mobileNavClasses}>
          <div className="pattern h-48 flex">
            <div className="flex-1 flex flex-col justify-center items-center cursor-pointer">
              <svg
                className="h-12 w-12 fill-current text-white"
                viewBox="0 0 960.56 1031.16"
              >
                <g data-name="Layer 2">
                  <g data-name="Layer 1">
                    <path
                      fill="none"
                      stroke="#fff"
                      stroke-miterlimit="10"
                      stroke-width="93.64"
                      d="M33.26 507.4l452.71 456.8 440.9-456.8"
                    />
                    <path d="M479.44 735.7L114.7 367.85 479.44 0l364.73 367.85L479.44 735.7z" />
                  </g>
                </g>
              </svg>
              <h2 className="text-white text-2xl mt-4">
                {user ? `${user.name}` : "Polar"}
              </h2>
              <h2 className="text-white mt-4">
                {user ? `${user.email}` : null}
              </h2>
            </div>
          </div>
          <div className="flex-1 h-full">
            <Link onClick={this.toggle} to="/" className="">
              <div className="py-4 px-6 w-full text-lg text-polardark focus:outline-none">
                <Translate value="navbar.home" />
              </div>
            </Link>
            <Link onClick={this.toggle} to="/dashboard" className="">
              <div className="py-4 px-6 w-full text-lg text-polardark focus:outline-none">
                <Translate value="navbar.dashboard" />
              </div>
            </Link>
            {!isAuthenticated ? (
              <Fragment>
                <Link onClick={this.toggle} to="/register" className="">
                  <div className="py-4 px-6 w-full text-lg text-polardark focus:outline-none">
                    <Translate value="navbar.register" />
                  </div>
                </Link>
                <Link onClick={this.toggle} to="/login" className="">
                  <div className="py-4 px-6 w-full text-lg text-polardark focus:outline-none">
                    <Translate value="navbar.login" />
                  </div>
                </Link>
              </Fragment>
            ) : null}
          </div>
          <div className="">
            {isAuthenticated ? (
              <Fragment>
                <button
                  onClick={this.logoutClick}
                  className="bg-gray-200 w-full flex items-center px-6 rounded py-4 text-polardark focus:outline-none"
                >
                  <svg
                    className="mr-2 h-6 w-6 fill-current"
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                  >
                    <path
                      d="M13,18a1,1,0,0,1-1-1A5,5,0,1,0,2,17a1,1,0,1,1-2,0,7,7,0,0,1,14,0A1,1,0,0,1,13,18ZM7,8a4,4,0,1,1,4-4A4.005,4.005,0,0,1,7,8ZM7,2A2,2,0,1,0,9,4,2,2,0,0,0,7,2Z"
                      transform="translate(0)"
                    />
                  </svg>
                  Logout
                </button>
                <div className="border"></div>
              </Fragment>
            ) : null}
            <a
              href="https://github.com/briankariuki"
              target="_blank"
              rel="noopener noreferrer"
              onClick={this.toggle}
            >
              <button className="bg-gray-200 w-full flex items-center px-6 rounded py-4 text-polardark focus:outline-none">
                <svg
                  className="fill-current h-6 w-6 mr-2"
                  width="100"
                  height="100"
                  fill="none"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M512 0C229.12 0 0 229.12 0 512c0 226.56 146.56 417.92 350.08 485.76 25.6 4.48 35.2-10.88 35.2-24.32 0-12.16-.64-52.48-.64-95.36-128.64 23.68-161.92-31.36-172.16-60.16-5.76-14.72-30.72-60.16-52.48-72.32-17.92-9.6-43.52-33.28-.64-33.92 40.32-.64 69.12 37.12 78.72 52.48 46.08 77.44 119.68 55.68 149.12 42.24 4.48-33.28 17.92-55.68 32.64-68.48-113.92-12.8-232.96-56.96-232.96-252.8 0-55.68 19.84-101.76 52.48-137.6-5.12-12.8-23.04-65.28 5.12-135.68 0 0 42.88-13.44 140.8 52.48 40.96-11.52 84.48-17.28 128-17.28 43.52 0 87.04 5.76 128 17.28 97.92-66.56 140.8-52.48 140.8-52.48 28.16 70.4 10.24 122.88 5.12 135.68 32.64 35.84 52.48 81.28 52.48 137.6 0 196.48-119.68 240-233.6 252.8 18.56 16 34.56 46.72 34.56 94.72 0 68.48-.64 123.52-.64 140.8 0 13.44 9.6 29.44 35.2 24.32C877.44 929.92 1024 737.92 1024 512 1024 229.12 794.88 0 512 0z"
                    fill="#1B1F23"
                  />
                </svg>
                Github
              </button>
            </a>
          </div>
        </div>

        {this.state.isOpen ? (
          <div
            className="hidden-lg-up  top-0 left-0 absolute sidebar-backdrop cursor-pointer"
            onClick={this.toggle}
          ></div>
        ) : null}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Navbar);
