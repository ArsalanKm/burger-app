import React from "react";
import styles from "./CheckoutSummary.module.css";
import Burger from "../Burger/Burger";
import Button from "../Button/Button";
const CheckoutsSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>we hope it taste well</h1>

      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
        <h3>price: {props.price} $</h3>
      </div>
      <Button clicked={props.checkoutCanceled} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.checkoutContinued} btnType="Success">
        Continue
      </Button>
    </div>
  );
};

export default CheckoutsSummary;
