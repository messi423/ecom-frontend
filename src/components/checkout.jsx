import React, { Component } from "react";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { authAxios, cartView, getAddresses } from "../utils";
import {
  Grid,
  Item,
  Message,
  Segment,
  Image,
  Loader,
  Dimmer,
  Divider,
  Header,
  Select,
  Button,
  Container,
  ItemMeta,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

const OrderPreview = (props) => {
  const { order } = props;
  return (
    <React.Fragment>
      {order && (
        <React.Fragment>
          <Item.Group relaxed>
            {order.items.map((item) => {
              return (
                <Item key={item.id}>
                  <Item.Image size="tiny" src={item.image} />
                  <Item.Content verticalAlign="middle">
                    <ItemMeta>{item.name}</ItemMeta>
                    <ItemMeta>${item.price}</ItemMeta>
                  </Item.Content>
                </Item>
              );
            })}
          </Item.Group>

          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header>Order Total: ${order.total}</Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

class CheckoutForm extends React.Component {
  state = {
    order: null,
    loading: false,
    addresses: [],
    selected_address: "",
    error: null,
    success: null,
  };

  componentDidMount() {
    this.fetchCart();
    this.getAddressList();
  }

  fetchCart = () => {
    this.setState({ loading: true });
    authAxios
      .get(cartView)
      .then((res) => {
        console.log(res.data);
        this.setState({ order: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
        this.props.history.push("/cart");
      });
  };

  getAddressList = () => {
    this.setState({ loading: true });
    authAxios
      .get(getAddresses)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
          addresses: res.data.map((a) => {
            return {
              key: a.id,
              text: `${a.address1}, ${a.address2}, ${a.country}`,
              value: a.id,
            };
          }),
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
        this.props.history.push("/cart");
      });
  };

  handleSelectChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  submit = (ev) => {
    // ev.preventDefault();
    // this.setState({ loading: true });
    // if (this.props.stripe) {
    //   this.props.stripe.createToken().then((result) => {
    //     if (result.error) {
    //       this.setState({ error: result.error.message, loading: false });
    //     } else {
    //       this.setState({ error: null });
    //       const { selectedAddress } = this.state;
    //       authAxios
    //         .post("scheckoutURL", {
    //           stripeToken: result.token.id,
    //           selectedAddress,
    //         })
    //         .then((res) => {
    //           this.setState({ loading: false, success: true });
    //         })
    //         .catch((err) => {
    //           this.setState({ loading: false, error: err });
    //         });
    //     }
    //   });
    // } else {
    //   console.log("Stripe is not loaded");
    // }
  };

  render() {
    const {
      order,
      error,
      loading,
      success,
      addresses,
      selected_address,
    } = this.state;

    return (
      <div>
        {error && (
          <Message
            error
            header="There was some errors with your submission"
            content={JSON.stringify(error)}
          />
        )}
        {loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
            <Image src="/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : (
          <Container>
            <OrderPreview order={order} />
            <Divider />

            <Header>Select a billing address</Header>
            {addresses.length > 0 ? (
              <Select
                name="selected_address"
                value={selected_address}
                options={addresses}
                selection
                onChange={this.handleSelectChange}
              />
            ) : (
              <p>
                You need to <Link to="/profile">add a billing address</Link>
              </p>
            )}
            <Divider />

            {addresses.length < 1 ? (
              <p>
                You need to add addresses before you can complete your purchase
              </p>
            ) : (
              <React.Fragment>
                <Header>Would you like to complete the purchase?</Header>
                <Divider />
                <CardElement />
                {success && (
                  <Message positive>
                    <Message.Header>Your payment was successful</Message.Header>
                    <p>
                      Go to your <b>profile</b> to see the order delivery
                      status.
                    </p>
                  </Message>
                )}
                <Divider />
                <Divider />
                <Button
                  loading={loading}
                  disabled={loading}
                  primary
                  onClick={this.submit}
                  style={{ marginTop: "10px" }}
                >
                  Submit
                </Button>
              </React.Fragment>
            )}
          </Container>
        )}
      </div>
    );
  }
}

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
//const InjectedForm = injectStripe(CheckoutForm);

class WrappedForm extends Component {
  render() {
    return (
      <React.Fragment>
        <Container text>
          <h1>Complete your order</h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Container>
      </React.Fragment>
    );
  }
}

export default WrappedForm;
