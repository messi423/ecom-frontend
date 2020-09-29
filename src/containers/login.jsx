import React, { Component } from "react";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
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

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(username, password);
    this.props.onAuth(username, password);
  };

  render() {
    const { error, token, loading } = this.props;

    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/logo.png" /> Log-in to your account
          </Header>

          <Form size="large" onSubmit={this.handleSubmit}>
            {error && <Message>{error.message}</Message>}
            <Segment stacked>
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
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
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
                Log In
              </Button>
            </Segment>
          </Form>

          <Message>
            New to us? <a href="/signup"> Sign Up</a>
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
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
