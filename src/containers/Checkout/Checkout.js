import React, { Component } from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutsSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
export class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients });
  };
  checkoutCanceled = () => {
    this.props.history.goBack();
  };
  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceled}
          checkoutContinued={this.checkoutContinued}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;
