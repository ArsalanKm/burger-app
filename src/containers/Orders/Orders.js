import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../api/axios-orders";
import Spinner from "../../components/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErroHandler";
export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount = () => {
    axios
      .get("./orders.json")
      .then((res) => {
        this.setState({ orders: res.data, loading: false });
      })
      .catch((error) => {});
  };
  renderOrders = () => {
    const keys = Object.keys(this.state.orders);
    return Object.values(this.state.orders).map((order, index) => {
      return (
        <Order
          key={keys[index]}
          ingredients={order.ingredients}
          price={order.price}
          id={keys[index]}
        />
      );
    });
  };
  render() {
    let orders = <Spinner />;
    if (!this.state.loading) orders = this.renderOrders();
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
