import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "./components/Navbar";
import AlertsWrapper from "./components/AlertsWrapper";
import Bfooter from "./components/Bfooter";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import store from "./store";
import { getDir } from "./reducers/selectors/i18n";
import { getUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(getUser());
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Provider store={store}>
        <Router>
          <div className="relative flex flex-col min-h-screen">
            <div className="alert-notify mx-auto fixed top-0 w-96 inset-x-0">
              <div className="mt-6">
                <AlertsWrapper />
              </div>
            </div>
            <div className="w-full fixed top-0  z-20">
              <Navbar />
            </div>

            <main className="mt-16 relative flex-1 w-full">
              <Switch>
                {!isAuthenticated && (
                  <Redirect from="/dashboard" to="/" exact />
                )}
                {isAuthenticated && (
                  <Redirect from="/login" to="/dashboard" exact />
                )}
                {isAuthenticated && (
                  <Redirect from="/register" to="/dashboard" exact />
                )}
                <Route path="/" component={HomePage} exact />
                {isAuthenticated && (
                  <Route path="/dashboard" component={Dashboard} exact />
                )}
                <Route path="/login" component={Login} exact />
                <Route path="/register" component={Register} exact />
              </Switch>
            </main>
            <div>
              <Bfooter />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  dir: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  dir: getDir(state),
  auth: state.auth
});
export default connect(mapStateToProps)(App);
