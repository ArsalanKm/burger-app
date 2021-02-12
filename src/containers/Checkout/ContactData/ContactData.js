import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/Button/Button";
import styles from "./ContactData.module.css";

import Spinner from "../../../components/Spinner/spinner";
import { Redirect } from "react-router";
import Input from "../../../components/Input/Input";

import * as orderActions from "../../../store/actions/index";

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your name",
        },
        value: "",
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your zipcode",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your country",
        },
        value: "",
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your email",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [{ value: "fastest", displayValue: "Fastest" }],
        },
        value: "",
      },
    },
    loading: false,
  };
  orderHandler = (event) => {
    event.preventDefault();
    const { ingredients } = this.props;

    // this.setState({ loading: true });
    const formData = {};
    for (let item in this.state.orderForm) {
      formData[item] = this.state.orderForm[item].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    this.props.onOrderBurger(order, this.props.authToken);
  };
  InputChangedHandler = (event, id) => {
    const form = {
      ...this.state.orderForm,
    };
    const updatedElement = {
      ...form[id],
    };
    updatedElement.value = event.target.value;
    form[id] = updatedElement;
    this.setState({ orderForm: form });
  };
  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler} className={styles.ContactData}>
        {formElementsArray.map((formElement, index) => {
          return (
            <Input
              changed={(e) => this.InputChangedHandler(e, formElement.id)}
              key={index}
              elementType={formElement.config.elementType}
              value={formElement.config.value}
              elementConfig={formElement.config.elementConfig}
            />
          );
        })}

        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    let purchased = null;
    if (this.props.purchased) {
      purchased = <Redirect to="/" />;
    }
    let error = null;
    if (this.props.error)
      error = <p className={styles.Error}>{this.props.error}</p>;

    let ingRedirect = null;
    if (this.props.ingredients === null) ingRedirect = <Redirect to="/" />;
    return (
      <div>
        {ingRedirect}
        {error}
        {purchased}
        <h4 className={styles.Message}>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPtice,
    loading: state.order.loading,
    error: state.order.error,
    purchased: state.order.purchased,
    authToken: state.auth.authToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, authToken) =>
      dispatch(orderActions.purchaseBurger(orderData, authToken)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
