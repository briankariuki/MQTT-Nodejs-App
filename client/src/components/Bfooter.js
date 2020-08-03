import React, { Component } from "react";
import { Translate } from "react-redux-i18n";
class Bfooter extends Component {
  render() {
    return (
      <div className="bg-polardark py-4 px-6 lg:px-0">
        <div className="max-w-screen-xl lg:w-4/5 mx-auto lg:flex items-center justify-between">
          <div className="text-white">
            <div className="flex items-center justify-center">
              <Translate value="footer.made" />
              <span>
                <svg
                  className="h-4 w-4 mx-2 fill-current text-red-400"
                  width="20.004"
                  height="17"
                  viewBox="0 0 20.004 17"
                >
                  <path d="M10,17h0a1,1,0,0,1-.708-.294L1.527,8.926a5.245,5.245,0,0,1,0-7.4,5.234,5.234,0,0,1,7.39,0L10,2.614l1.084-1.086a5.234,5.234,0,0,1,7.391,0,5.246,5.246,0,0,1,0,7.4L10.71,16.707A1,1,0,0,1,10,17" />
                </svg>
              </span>
              <Translate value="footer.by" />{" "}
              <span className="ml-2">Brian kariuki KB</span>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4 lg:mt-0">
            <div className="">
              <a
                href="https://github.com/briankariuki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 px-4 hover:text-gray-100 mx-auto"
              >
                <span>Github</span>
              </a>
            </div>
            <div className="">
              <a
                href="https://twitter.com/briankariuki79"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 px-4 hover:text-gray-100 mx-auto"
              >
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bfooter;
