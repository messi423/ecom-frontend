import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class SignupForm extends Component {
  state = {
    username: "",
    password1: "",
    password2: "",
    email: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password1, password2, email } = this.state;
    console.log(username, email, password1, password2);
    this.props.onAuth(username, email, password1, password2);
  };

  render() {
    const { token, loading, error } = this.props;

    {
      if (token) {
        return <Redirect to="/" />;
      }
    }
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="orange" textAlign="center">
            Welcome To Modern Myntra
          </Header>

          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              {error && <Message>{error.message}</Message>}
              <Form.Input
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
              />

              <Form.Input
                fluid
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
              />

              <Form.Input
                name="password1"
                onChange={this.handleChange}
                value={this.state.password1}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />

              <Form.Input
                name="password2"
                onChange={this.handleChange}
                value={this.state.password2}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />

              <Button
                color="teal"
                fluid
                size="large"
                loading={loading}
                disabled={loading}
              >
                Sign Up
              </Button>
            </Segment>
          </Form>

          <Message>
            Already Have An Account? <a href="/login">Sign In</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
