import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { supportedLocales } from "../factories/i18n";
import { setLocaleWithFallback } from "../actions/i18n";

class LanguageButton extends Component {
  handleLanguageLinkClick = (e, code) => {
    e.preventDefault();

    this.props.setLocaleWithFallback(code);
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  state = {
    isOpen: false
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    return (
      <div className="relative">
        <button
          className="flex items-center bg-white px-4 rounded py-2 text-polardark hover:shadow-lg focus:outline-none"
          onClick={this.toggle}
        >
          <svg
            className="mr-2 fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              d="M10.02,20H10A10,10,0,1,1,10,0h.028a10,10,0,0,1,0,20ZM7.08,11a11.023,11.023,0,0,0,2.931,6.608A11.436,11.436,0,0,0,12.962,11ZM2.069,11a8.052,8.052,0,0,0,5.338,6.561A12.815,12.815,0,0,1,5.061,11Zm12.906,0a13.213,13.213,0,0,1-2.358,6.552A8.049,8.049,0,0,0,17.93,11ZM12.65,2.461A12.99,12.99,0,0,1,14.978,9H17.93A8.053,8.053,0,0,0,12.65,2.461ZM10.026,2.4h0A11.432,11.432,0,0,0,7.079,9h5.88a11.148,11.148,0,0,0-2.933-6.6Zm-2.588.032A8.043,8.043,0,0,0,2.069,9h3A13.236,13.236,0,0,1,7.438,2.429Z"
              transform="translate(0 0)"
            />
          </svg>

          <p>{this.props.locale}</p>
          <svg
            className="ml-2 fill-current"
            width="10"
            height="6"
            viewBox="0 0 10 6"
          >
            <path d="M5,6a1,1,0,0,1-.707-.293l-4-4A1,1,0,0,1,1.707.293l3.3,3.3L8.305.418A1,1,0,0,1,9.7,1.857l-4,3.862A1,1,0,0,1,5,6" />
          </svg>
        </button>
        {this.state.isOpen ? (
          <div className="z-20 mx-auto mt-3 flex-1 rounded shadow-xl border  absolute  bg-white">
            {Object.keys(supportedLocales).map(code => (
              <div
                key={code}
                active={code === this.props.locale}
                onClick={e => this.handleLanguageLinkClick(e, code)}
                className="cursor-pointer hover:bg-gray-200 px-12 py-2"
              >
                <span>{supportedLocales[code]}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

LanguageButton.propTypes = {
  locale: PropTypes.string.isRequired,
  setLocaleWithFallback: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ locale: state.i18n.locale });

const mapDispatchToProps = { setLocaleWithFallback };

export default connect(mapStateToProps, mapDispatchToProps)(LanguageButton);
