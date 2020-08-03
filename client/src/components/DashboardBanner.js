import React, { Component } from "react";
import { Translate } from "react-redux-i18n";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import character from "../assets/character.svg";

class DashBoardBanner extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="relative rounded shadow-md px-6 py-10 pattern">
          <div>
            <h2 className="text-white text-2xl">
              <Translate value="dashboard.welcome" />{" "}
              {user ? `${user.name}` : "User"}
            </h2>
            <p className="text-white text-sm :lg:text-base">
              {" "}
              <Translate value="dashboard.tag" />
            </p>
          </div>
          <div className="absolute right-0 top-0">
            <img className="character mr-6 mt-2" src={character} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(DashBoardBanner);
