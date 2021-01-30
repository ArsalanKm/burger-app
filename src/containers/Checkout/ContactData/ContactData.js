import React, { Component } from "react";
import Button from "../../../components/Button/Button";
import styles from "./ContactData.module.css"
export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };
  render() {
    return (
      <div>
        <h4>Enter your Contact Data</h4>
        <form className={styles.ContactData}>
          <input type="text" name="name" placeholder="you name" />
          <input type="email" name="email" placeholder="you name" />
          <input type="text" name="street" placeholder="you name" />
          <input type="text" name="postal" placeholder="you name" />
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
