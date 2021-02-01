import React, { Component } from "react";
import Button from "../../../components/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../api/axios-orders";
import Spinner from "../../../components/Spinner/spinner";
import { withRouter } from "react-router";
export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };
  orderHandler = (event) => {
    event.preventDefault();
    const { ingredients } = this.props;
    console.log(ingredients);
    console.log("continue");
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "arsalan",
        addresse: {
          street: "test",
          zipCode: "Germany",
        },
        email: "karimzadarsalan@gmail.com",
      },
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
        console.log(error);
      });
  };
  render() {
    let form = (
      <form className={styles.ContactData}>
        <input type="text" name="name" placeholder="your name" />
        <input type="email" name="email" placeholder="your email" />
        <input type="text" name="street" placeholder="yout address" />
        <input type="text" name="postal" placeholder="your postal" />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div>
        <h4 className={styles.Message}>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
