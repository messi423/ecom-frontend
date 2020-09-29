import axios from "axios";
import React, { Component } from "react";
import {
  Card,
  Icon,
  Image,
  Button,
  Rating,
  Divider,
  Container,
  Reveal,
  Item,
} from "semantic-ui-react";
import { authAxios, addToCart } from "../utils";
import { connect } from "react-redux";
import { fetchCart } from "../store/actions/cart";

class ProductDetail extends Component {
  state = {
    item: {},
    loading: null,
    error: null,
  };

  componentDidMount() {
    const articleId = this.props.match.params.articleId;
    axios
      .get(`http://127.0.0.1:8000/api/article/${articleId}/`)
      .then((res) => {
        this.setState({ item: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log("sa");
        console.log(err);
      });
  }

  handleAddCart = (id) => {
    console.log("add");
    authAxios
      .post(addToCart, { id })
      .then((res) => {
        console.log("added");
        this.props.fetchCart();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { item, error } = this.state;
    return (
      <Container>
        {error && <p>{error.message}</p>}

        <Reveal animated="move right">
          <Reveal.Content visible>
            <Image
              src="https://blog.hubspot.com/hubfs/types-of-image-files-extensions.jpg"
              size="huge"
            />
          </Reveal.Content>
          <Reveal.Content hidden>
            <Image src={item.image} size="big" />
          </Reveal.Content>
        </Reveal>

        <Divider />
        <Item>
          <Item.Header>{item.name}</Item.Header>
          <Item.Meta>
            <span className="price">${item.price}</span>
            <br />
            <span className="inStock">In Stock {item.in_stock}</span>
          </Item.Meta>
          <Item.Content header="Cute Dog" />

          <Item.Content>
            <Icon
              name="heart"
              color="red"
              size="large"
              circular
              floated="right"
            />
            <Button
              primary
              floated="right"
              onClick={() => this.handleAddCart(item.id)}
            >
              Add To Cart
              <Icon name="right chevron" />
            </Button>
            <Divider />
            <Rating icon="star" defaultRating={3} maxRating={4} />
          </Item.Content>
        </Item>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.cart.loading,
    error: state.cart.error,
    order: state.cart.order,
    authenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
