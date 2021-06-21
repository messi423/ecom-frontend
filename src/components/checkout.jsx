import React, { Component } from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { authAxios, cartView, getAddresses, paymentURL } from "../utils";
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

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

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

  submit = (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    this.setState({ loading: true });
    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      console.log("not loaded yet");
      return;
    }

    const card = elements.getElement(CardElement);
    stripe.createToken(card).then((result) => {
      if (result.error) {
        this.setState({ error: result.error.message, loading: false });
        console.log(result.error.message);
      } else {
        this.setState({ error: null });
        const { selected_address } = this.state;
        authAxios
          .post(paymentURL, {
            stripeToken: result.token.id,
            selected_address,
          })
          .then((res) => {
            console.log(res);
            this.setState({ loading: false, success: true });
          })
          .catch((err) => {
            this.setState({ loading: false, error: err.message });
          });
      }
    });
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
        {success && (
          <Message
            success
            header="Payment is successful !!"
            content={JSON.stringify(success)}
          />
        )}

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
              {success && (
                <Message positive>
                  <Message.Header>Your payment was successful</Message.Header>
                  <p>
                    Go to your <b>profile</b> to see the order delivery status.
                  </p>
                </Message>
              )}
              <Header>Would you like to complete the purchase?</Header>
              <Divider />
              <form onSubmit={this.submit}>
                <label>
                  <CardElement options={CARD_ELEMENT_OPTIONS} />
                </label>
                <Divider />
                <Divider />
                <Button
                  loading={loading}
                  primary
                  style={{ marginTop: "10px" }}
                  disabled={!this.props.stripe}
                >
                  Confirm order
                </Button>
              </form>
            </React.Fragment>
          )}
        </Container>
      </div>
    );
  }
}

const stripePromise = loadStripe(
  "pk_test_51HYPhiFXUm04DyJSvFSloc40eJmHEMg1XRntMY019aiPCefLTzPQidZijuIOnRvEHKirwVJk9gDF8vIVS4z3mxdQ00VCpHYqxs"
);
//const InjectedForm = injectStripe(CheckoutForm);

class WrappedForm extends Component {
  render() {
    return (
      <React.Fragment>
        <Container text>
          <h1>Complete your order</h1>
          <Elements stripe={stripePromise}>
            <ElementsConsumer>
              {({ stripe, elements }) => (
                <CheckoutForm stripe={stripe} elements={elements} />
              )}
            </ElementsConsumer>
          </Elements>
        </Container>
      </React.Fragment>
    );
  }
}

export default WrappedForm;
