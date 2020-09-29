import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import BaseRouter from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import CustomLayout from "./containers/home";
import * as actions from "./store/actions/auth";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter {...this.props} />
          </CustomLayout>
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
