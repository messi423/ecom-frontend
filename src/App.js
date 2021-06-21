import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import BaseRouter from "./routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomLayout from "./containers/home";
import * as actions from "./store/actions/auth";
import { connect } from "react-redux";
import LoginForm from "./containers/login";
import SignupForm from "./containers/signup";

class App extends Component {
  // componentDidMount() {
  //   this.props.onTryAutoSignup();
  // }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
            <CustomLayout {...this.props}>
              <BaseRouter />
            </CustomLayout>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
