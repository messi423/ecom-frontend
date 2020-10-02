import React, { Component } from "react";
import {
  Container,
  Divider,
  Image,
  Message,
  Segment,
  Card,
  Table,
  Header,
  Button,
  Form,
} from "semantic-ui-react";
import { authAxios } from "../utils";
import { getUser, getProfile, postAddress } from "../utils";

class ProfileView extends Component {
  state = {
    user: null,
    image: null,
    addresses: [],
    payments: [],
    ad_address: false,
    loading: false,
    error: null,
    email: null,
    add1: "",
    add2: "",
    country: "",
    zip: "",
    errform: null,
  };

  //   state = {
  //     user: {},
  //     image: null,
  //     add1: "",
  //     add2: "",
  //     country: "",
  //     zip: "",
  //     ad_address: false,
  //     errform: null,
  //   };

  componentDidMount() {
    this.fetchProfile();
    this.fetchUser();
  }

  fetchUser = () => {
    this.setState({ loading: true });
    authAxios
      .get(getUser)
      .then((res) => {
        console.log(res.data);
        const resp = res.data[0];
        this.setState({
          user: resp.username,
          email: resp.email,
          addresses: resp.addresses,
          payments: resp.payments,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err.message, loading: false });
      });
  };

  fetchProfile = () => {
    this.setState({ loading: true });
    authAxios
      .get(getProfile)
      .then((res) => {
        console.log(res.data);
        this.setState({
          image: res.data[0].image,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err.message, loading: false });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { add1, add2, country, zip } = this.state;
    authAxios
      .post(postAddress, {
        address1: add1,
        address2: add2,
        zip: zip,
        country: country,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ errform: err });
      });
  };

  cadAddress = () => {
    const { ad_address } = this.state;
    this.setState({ ad_address: !ad_address });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      error,
      user,
      image,
      addresses,
      payments,
      ad_address,
      loading,
      email,
      errform,
    } = this.state;

    return (
      <Container>
        {error && <Message>{error}</Message>}
        <Segment>
          <Card>
            <Image src={image} wrapped />
            <Card.Content>
              <Card.Header>{user}</Card.Header>
              <Card.Meta>
                <span>{email}</span>
              </Card.Meta>
            </Card.Content>
          </Card>
        </Segment>

        <Divider />
        <Segment>
          <Header>Your Regstered Address</Header>
          <Button floated="right" onClick={this.cadAddress}>
            Add Address
          </Button>
          <Table color="yellow">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>Street /FlatNo. </Table.HeaderCell>
                <Table.HeaderCell>City State</Table.HeaderCell>
                <Table.HeaderCell>Country </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {addresses.map((add) => {
                return (
                  <Table.Row key={add.id}>
                    <Table.Cell>###</Table.Cell>
                    <Table.Cell>{add.address1}</Table.Cell>
                    <Table.Cell>{add.address2}</Table.Cell>
                    <Table.Cell>{add.country}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Segment>
        <Divider />
        <Segment>
          <Header>Your Successful Payments</Header>
          <Table compact="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>##</Table.HeaderCell>
                <Table.HeaderCell>Ordered Date</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {payments.map((pay) => {
                return (
                  <Table.Row key={pay.id}>
                    <Table.Cell>#</Table.Cell>
                    <Table.Cell>{pay.timestamp}</Table.Cell>
                    <Table.Cell>${pay.amount}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Segment>
        <Divider />
        <Divider />
        {ad_address && (
          <Container>
            {errform && <Message>{errform.message}</Message>}
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                name="add1"
                onChange={this.handleChange}
                value={this.state.add1}
                iconPosition="left"
                placeholder="Address"
              />
              <Form.Input
                name="add2"
                onChange={this.handleChange}
                value={this.state.add2}
                iconPosition="left"
                placeholder="Address"
              />
              <Form.Input
                name="zip"
                onChange={this.handleChange}
                value={this.state.zip}
                iconPosition="left"
                placeholder="Zip"
              />
              <Form.Input
                name="country"
                onChange={this.handleChange}
                value={this.state.country}
                iconPosition="left"
                placeholder="Country"
              />
              <Button color="twitter" size="medium">
                Add
              </Button>
            </Form>
          </Container>
        )}
      </Container>
    );
  }
}

export default ProfileView;
