import React from "react";
import Button from "../../Button/Button";
const OrderSummary = (props) => {
  console.log(props);
  let { ingredients } = props;
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
      <strong style={{ display: "block" }}>price: {props.price}$</strong>
      <Button clicked={props.cancle} btnType="Danger"> CANCEL</Button>
      <Button clicked={props.continue} btnType="Success">CONTINUE</Button>
      <p>Continue to Checkout</p>
    </>
  );
};

export default OrderSummary;
