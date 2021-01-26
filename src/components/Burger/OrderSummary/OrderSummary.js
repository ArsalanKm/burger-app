import React from "react";
import Button from "../../Button/Button";
class OrderSummary extends React.Component {
  componentWillUpdate(){
    console.log('order sunnary update ')
  }
  render() {
   
    let { ingredients } = this.props;
    const renderIngredients = Object.keys(ingredients).map((item, index) => {
      return (
        <li key={index}>
          {item.toUpperCase()}:{ingredients[item]}
        </li>
      );
    });
    return (
      <>
        <h3>Your Order</h3>
        <p>Ingredients</p>
        <ul>{renderIngredients}</ul>
        <strong style={{ display: "block" }}>
          price: {this.props.price.toFixed(2)}$
        </strong>
        <Button clicked={this.props.cancle} btnType="Danger">
          {" "}
          CANCEL
        </Button>
        <Button clicked={this.props.continue} btnType="Success">
          CONTINUE
        </Button>
        <p>Continue to Checkout</p>
      </>
    );
  }
}
export default OrderSummary;
