import React, { Component } from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutsSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
export class Checkout extends Component {
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
    ings: state.ingredients,
  };
};
export default connect(mapStateToProps)(Checkout);
