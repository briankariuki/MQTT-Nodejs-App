import React, { Component } from "react";
import { Translate } from "react-redux-i18n";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import animationData from "../assets/illustration_01.json";

class HomePage extends Component {
  componentDidMount() {
    document.title = "Welcome | Polar WebApp";
  }
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    return (
      <div className="max-w-screen-xl lg:w-4/5 lg:mt-16 mt-4 w-9/10 mx-auto overflow-x-hidden">
        <div className="lg:flex items-center">
          <div className="lg:w-1/2 order-last">
            <div className="lottie-container mx-auto">
              <Lottie
                options={defaultOptions}
                isStopped={this.state.isStopped}
                isPaused={this.state.isPaused}
              />
            </div>
          </div>
          <div className="lg:w-1/2 order-first overflow-x-hidden mb-20">
            <h2 className="mt-4 leading-tight font-semibold lg:text-5xl text-3xl text-center lg:text-left">
              <Translate value="homepage.title" />
            </h2>
            <p className="font-medium text-polargrey my-10 text-center lg:text-left">
              <Translate value="homepage.paragraph1" />
            </p>

            <div className="mt-10">
              <Link to="/register">
                <button className="flex items-center justify-center mx-auto lg:ml-0 bg-polarpurple px-4 w-40 rounded py-3 text-white hover:shadow-lg focus:outline-none">
                  <Translate value="homepage.buttonText" />
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
