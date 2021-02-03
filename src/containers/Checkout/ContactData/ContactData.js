import React, { Component } from "react";
import Button from "../../../components/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../api/axios-orders";
import Spinner from "../../../components/Spinner/spinner";
import { withRouter } from "react-router";
import Input from "../../../components/Input/Input";
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
    console.log(ingredients);
    console.log("continue");
    this.setState({ loading: true });
    const formData = {};
    for (let item in this.state.orderForm) {
      formData[item] = this.state.orderForm[item].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
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
