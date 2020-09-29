import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Icon,
  Item,
  Label,
  Grid,
  Segment,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { authAxios, addToCart } from "../utils";
import { connect } from "react-redux";
import { fetchCart } from "../store/actions/cart";

class ProductList extends Component {
  state = {
    products: [],
    uwpro: [],
    lwpro: [],
    epro: [],
  };

  componentDidMount() {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios
      .get("http://127.0.0.1:8000/api/article/")
      .then((res) => {
        this.setState({
          products: res.data,
          uwpro: res.data.filter((pro) => pro.type === "uw"),
          lwpro: res.data.filter((pro) => pro.type === "lw"),
          epro: res.data.filter((pro) => pro.type === "e"),
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.authenticated !== this.props.authenticated) {
      this.props.fetchCart();
      console.log(localStorage.getItem("token"));
    }
  }

  handleAddCart = (id) => {
    const { authenticated } = this.props;

    console.log("add");
    console.log(this.props);
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
    return (
      <div>
        <Segment>
          <Header size="huge">Electronics</Header>
          <Grid container columns={1}>
            {this.state.epro.map((item) => {
              return (
                <Grid.Column>
                  <Item key={item.id}>
                    <Container>
                      <Item.Image src={item.image} />
                    </Container>
                    <Item.Content>
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
                          primary
                          floated="right"
                          onClick={() => this.handleAddCart(item.id)}
                        >
                          Add To Cart
                          <Icon name="right chevron" />
                        </Button>
                        <Label>Limited</Label>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Grid.Column>
              );
            })}
          </Grid>
        </Segment>

        <Segment>
          <Header size="huge">UpperWear</Header>
          <Grid container columns={4}>
            {this.state.uwpro.map((item) => {
              return (
                <Grid.Column>
                  <Item key={item.id}>
                    <Item.Image src={item.image} />

                    <Item.Content>
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
                          primary
                          floated="right"
                          onClick={() => this.handleAddCart(item.id)}
                        >
                          Add To Cart
                          <Icon name="right chevron" />
                        </Button>
                        <Label>Limited</Label>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Grid.Column>
              );
            })}
          </Grid>
        </Segment>

        <Segment>
          <Header size="huge">LowerWear</Header>
          <Grid container columns={4}>
            {this.state.lwpro.map((item) => {
              return (
                <Grid.Column>
                  <Item key={item.id}>
                    <Item.Image src={item.image} />

                    <Item.Content>
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
                          primary
                          floated="right"
                          onClick={() => this.handleAddCart(item.id)}
                        >
                          Add To Cart
                          <Icon name="right chevron" />
                        </Button>
                        <Label>Limited</Label>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Grid.Column>
              );
            })}
          </Grid>
        </Segment>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
