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
  Icon,
  Step,
  Confirm,
} from "semantic-ui-react";
import ImageUploader from 'react-images-upload';
import { authAxios } from "../utils";
import {
  getUser,
  getProfile,
  postAddress,
  deleteAddress,
  updateAddress,
} from "../utils";

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
    success: "",
    open: false,
    id: null,
    component_update: false,
    form_type: "update",
    pictures: [],
    selectedFile: null
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

  componentDidUpdate(prevState, prevprops) {
    const { ad_address } = this.state;
    if (!!this.state.component_update) {
      this.fetchUser();
      console.log("jasnjcknsdlnkdjskjnsa,");
      this.setState({ component_update: false, ad_address: !ad_address });
    }
  }

  fetchUser = () => {
    this.setState({ loading: true });
    authAxios
      .get(getUser)
      .then((res) => {
        console.log(res.data);
        const resp = res.data;
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

  updateProfile = (picture) => {
    this.setState({ loading: true });
    authAxios
      .put(getProfile, {image: picture})
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
          //component_update: true
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
          image: res.data.image,
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
    const { add1, add2, country, zip, form_type, id } = this.state;

    if (form_type === "post") {
      authAxios
        .post(postAddress, {
          address1: add1,
          address2: add2,
          zip: zip,
          country: country,
        })
        .then((res) => {
          console.log(res.data);
          this.setState({
            component_update: true,
            success: "Address Added Successfully !!",
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ errform: err });
        });
    }
    if (form_type === "update") {
      authAxios
        .put(updateAddress(id), {
          address1: add1,
          address2: add2,
          zip: zip,
          country: country,
        })
        .then((res) => {
          console.log(res.data);
          this.setState({ component_update: true });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ errform: err, success: "Address Updated !!" });
        });
    }
  };

  cadAddress = () => {
    const { ad_address } = this.state;
    this.setState({ ad_address: !ad_address, form_type: "post" });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deladdress = (id) => {
    //e.preventDefault();
    authAxios
      .delete(deleteAddress(id))
      .then((res) => {
        console.log(res.data);
        this.setState({
          component_update: true,
          id: null,
          success: "Address Deleted Successfully !",
        });
        //this.setState({ success: "Deleted Successfully !!" });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ errform: err, id: null });
      });
  };

  handleButtonClick = (id) => {
    this.setState({ open: true, id: id });
  };
  handleConfirm = (id) => {
    this.deladdress(id);
    this.setState({ id: null, open: false });
  };

  changeAddress = (id) => {
    const { ad_address } = this.state;
    this.setState({
      ad_address: !ad_address,
      id: id,
    });
  };

    onFileChange = event => { 
      this.setState({ selectedFile: event.target.files[0] }); 
    }; 


    onFileUpload = () => {  
      const formData = new FormData(); 
      formData.append( 
        "image", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
      console.log(this.state.selectedFile); 

      this.setState({ loading: true });
      authAxios
        .put(getProfile, formData, {headers: {
          'Content-Type': 'multipart/form-data',}
      })
        .then((res) => {
          console.log(res.data);
          this.setState({
            loading: false,
            component_update: true
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ error: err.message, loading: false });
        }); 
    };

  render() {
    const {
      error,
      user,
      image,
      success,
      addresses,
      payments,
      ad_address,
      loading,
      open,
      email,
      errform,
      id,
    } = this.state;

    return (
      <Container>
        {open && (
          <Confirm
            header="Delete Address!!"
            open={this.state.open}
            onCancel={() => {
              this.setState({ open: false, id: null });
            }}
            onConfirm={() => this.handleConfirm(id)}
            size="large"
          />
        )}

        {success !== "" && (
          <Message success header={success}>
            {success}
          </Message>
        )}
        {error && <Message error>{error}</Message>}
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
          <span> 
                <input type="file" onChange={this.onFileChange} /> 
                <button onClick={this.onFileUpload}> 
                  Upload! 
                </button> 
            </span> 
          {/* <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            /> */}
        </Segment>

        <Divider />
        <Segment>
          <Header>Your Regstered Address</Header>
          <Button
            floated="right"
            onClick={() => {
              this.setState({
                add1: "",
                add2: "",
                zip: "",
                country: "",
                form_type: "post",
              });
              this.cadAddress();
            }}
          >
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
                    <Table.Cell>
                      <span>
                        <Button
                          color="instagram"
                          size="medium"
                          onClick={() => {
                            this.setState({
                              add1: add.address1,
                              add2: add.address2,
                              zip: add.zip,
                              country: add.country,
                              form_type: "update",
                            });
                            this.changeAddress(add.id);
                          }}
                        >
                          Edit
                        </Button>
                      </span>
                      <span>
                        <Button
                          color="red"
                          size="medium"
                          onClick={() => this.handleButtonClick(add.id)}
                        >
                          Delete
                        </Button>
                      </span>
                    </Table.Cell>
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
                    <Table.Cell>Rs {pay.amount}</Table.Cell>
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
                placeholder="Street "
              />
              <Form.Input
                name="add2"
                onChange={this.handleChange}
                value={this.state.add2}
                iconPosition="left"
                placeholder="City, State"
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
                Submit
              </Button>
            </Form>
          </Container>
        )}
        <Divider />
        <Step.Group vertical>
          <Step completed>
            <Icon name="truck" />
            <Step.Content>
              <Step.Title>Shipping</Step.Title>
              <Step.Description>Choose your shipping options</Step.Description>
            </Step.Content>
          </Step>

          <Step completed>
            <Icon name="payment" />
            <Step.Content>
              <Step.Title>Billing</Step.Title>
              <Step.Description>Enter billing information</Step.Description>
            </Step.Content>
          </Step>

          <Step active>
            <Icon name="info" />
            <Step.Content>
              <Step.Title>Confirm Order</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
      </Container>
    );
  }
}

export default ProfileView;
