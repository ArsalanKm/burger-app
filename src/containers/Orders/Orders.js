import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../api/axios-orders";
import Spinner from "../../components/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErroHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
export class Orders extends Component {
  componentDidMount = () => {
    this.props.onFetchOrder(this.props.authToken);
  };
  renderOrders = () => {
    const keys = Object.keys(this.props.orders);
    return Object.values(this.props.orders).map((order, index) => {
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
    if (!this.props.loading) orders = this.renderOrders();
    return <div>{orders}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    authToken:state.auth.token
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (authToken) => dispatch(actions.fetchOrders(authToken)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
