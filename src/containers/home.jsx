import React from "react";
import {
  Button,
  Icon,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Dimmer,
  Loader,
  Segment,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { fetchCart } from "../store/actions/cart";
import { CART_RESTORE } from "../store/actions/actionTypes";

class CustomLayout extends React.Component {
  // componentDidUpdate(prevState, prevProps) {
  //   if (
  //     prevProps.order !== this.props.order &&
  //     localStorage.getItem("token") !== null
  //   ) {
  //     this.props.fetchCart();
  //   }

  //   if (prevProps !== this.props && localStorage.getItem("token") === null) {
  //     this.setState({ order: null });
  //   }
  // }

  // static getDerivedStateFromProps(props, state) {
  //   console.log("derived");
  //   console.log(localStorage.getItem("token"));
  //   if (props.authenticated === true && state.order === null) {
  //     console.log(localStorage.getItem("token"));
  //     props.fetchCart();
  //     return { order: props.order };
  //   }
  //   return null;
  // }

  componentDidMount() {
    console.log(!!localStorage.getItem("token"));
    if (this.props.authenticated) {
      this.props.fetchCart();
      console.log("after logged in token");
    }
  }

  render() {
    const { authenticated, loading, order } = this.props;
    //const { order, authenticated } = this.state;

    return (
      <Container>
        <div style={{ margin: 20 }}>
          <Menu inverted size="large">
            <Container>
              <Link to="/">
                <Menu.Item header>Home</Menu.Item>
              </Link>
              <Link to="/products">
                <Menu.Item header>Products</Menu.Item>
              </Link>
              {authenticated && order !== {} ? (
                loading ? (
                  <Dimmer active>
                    <Loader size="massive">Loading</Loader>
                  </Dimmer>
                ) : (
                  <React.Fragment>
                    <Menu.Menu position="right">
                      <Menu.Item>
                        <Link to="/">Profile</Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Button primary>
                          <Icon name="shopping cart" />
                          <Link to="/cart" style={{ color: "black" }}>{`${
                            order !== null ? order.items.length : 0
                          }`}</Link>
                        </Button>
                      </Menu.Item>
                      {/* <Dropdown
                      icon="cart"
                      loading={loading}
                      text={`${cart !== null ? cart.order_items.length : 0}`}
                      pointing
                      className="link item"
                    > 
                      <Dropdown.Menu>
                        {cart !== null ? (
                          <React.Fragment>
                            {cart.order_items.map(order_item => {
                              return (
                                <Dropdown.Item key={order_item.id}>
                                  {order_item.quantity} x {order_item.item.title}
                                </Dropdown.Item>
                              );
                            })}
                            {cart.order_items.length < 1 ? (
                              <Dropdown.Item>No items in your cart</Dropdown.Item>
                            ) : null}
                            <Dropdown.Divider />
  
                            <Dropdown.Item
                              icon="arrow right"
                              text="Checkout"
                              onClick={() =>
                                this.props.history.push("/order-summary")
                              }
                            />
                          </React.Fragment>
                        ) : (
                          <Dropdown.Item>No items in your cart</Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>*/}
                      <Menu.Item
                        header
                        onClick={() => {
                          this.props.logout();
                          this.props.cartRestore();
                          this.props.history.push("/");
                        }}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Menu>
                  </React.Fragment>
                )
              ) : (
                <Menu.Menu position="right">
                  <Link to="/login">
                    <Menu.Item header>Login</Menu.Item>
                  </Link>
                  <Link to="/signup">
                    <Menu.Item header>Signup</Menu.Item>
                  </Link>
                </Menu.Menu>
              )}
            </Container>
          </Menu>

          <Container>{this.props.children}</Container>

          <Segment
            inverted
            vertical
            style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
          >
            <Container textAlign="center">
              <Grid divided inverted stackable>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Group 1" />
                  <List link inverted>
                    <List.Item as="a">Link One</List.Item>
                    <List.Item as="a">Link Two</List.Item>
                    <List.Item as="a">Link Three</List.Item>
                    <List.Item as="a">Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Group 2" />
                  <List link inverted>
                    <List.Item as="a">Link One</List.Item>
                    <List.Item as="a">Link Two</List.Item>
                    <List.Item as="a">Link Three</List.Item>
                    <List.Item as="a">Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Group 3" />
                  <List link inverted>
                    <List.Item as="a">Link One</List.Item>
                    <List.Item as="a">Link Two</List.Item>
                    <List.Item as="a">Link Three</List.Item>
                    <List.Item as="a">Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header inverted as="h4" content="Footer Header" />
                  <p>
                    Extra space for a call to action inside the footer that
                    could help re-engage users.
                  </p>
                </Grid.Column>
              </Grid>

              <Divider inverted section />
              <Image centered size="mini" src="/logo.png" />
              <List horizontal inverted divided link size="small">
                <List.Item as="a" href="#">
                  Site Map
                </List.Item>
                <List.Item as="a" href="#">
                  Contact Us
                </List.Item>
                <List.Item as="a" href="#">
                  Terms and Conditions
                </List.Item>
                <List.Item as="a" href="#">
                  Privacy Policy
                </List.Item>
              </List>
            </Container>
          </Segment>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.token !== null,
    order: state.cart.order,
    loading: state.cart.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchCart: () => dispatch(fetchCart()),
    cartRestore: () => dispatch({ type: CART_RESTORE }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomLayout)
);
