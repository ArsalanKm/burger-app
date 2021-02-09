import React, { Component } from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutsSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
export class Checkout extends Component {
 
  checkoutCanceled = () => {
    this.props.history.goBack();
  };
  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let purchasedRedirect=null
    if (this.props.ing) {
      let  purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
    }
    return (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceled}
          checkoutContinued={this.checkoutContinued}
          ingredients={this.props.ings}
          price={this.props.price}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};


export default connect(mapStateToProps)(Checkout);
