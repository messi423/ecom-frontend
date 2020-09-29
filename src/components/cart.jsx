import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Icon,
  Item,
  Label,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { authAxios, cartView, removeCart } from "../utils";
import { fetchCart } from "../store/actions/cart";
import { connect } from "react-redux";

class CartView extends Component {
  state = {
    order: {},
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    authAxios
      .get(cartView)
      .then((res) => {
        console.log(res.data);
        this.setState({ order: res.data, loading: false });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({ error: err.message, loading: false });
      });
  }

  removeFromCart = (id) => {
    authAxios
      .delete(removeCart(id))
      .then((res) => {
        console.log(res.data);
        this.props.fetchCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Container>
        <Item.Group divided>
          {this.props.order.items.map((item) => {
            return (
              <Item key={item.id}>
                <Item.Image src={item.image} />

                <Item.Content>
                  <Item.Header as="h5">{item.type}</Item.Header>
                  <br />
                  <Item.Header as="h3">
                    <Link to={`/article/${item.id}`}>{item.name}</Link>
                  </Item.Header>
                  <Item.Meta>
                    <span className="price">${item.price}</span>
                    <br />
                    <span className="inStock">InStock {item.in_stock}</span>
                  </Item.Meta>
                  <Item.Description>paragraph</Item.Description>
                  <Item.Extra>
                    <Button
                      danger
                      floated="right"
                      onClick={() => this.removeFromCart(item.id)}
                    >
                      Remove From Cart
                      <Icon name="right chevron" />
                    </Button>

                    <Label>Limited</Label>
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>

        <Divider />
        <Link to="/checkout">
          <Button positive>Checkout</Button>
        </Link>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.cart.loading,
    error: state.cart.error,
    order: state.cart.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartView);
