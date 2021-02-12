import * as actionTypes from "./actionTypes";
import axios from "../../api/axios-orders";
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (
  error = "unauthorized user please log in"
) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};
export const purchaseBurger = (orderData, authToken) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + authToken, orderData)
      .then((response) => {
        console.log("[purchaseBurgerSuccess]", response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        // this.setState({ loading: false, purchasing: false });
        // this.props.history.push("/");
      })
      .catch((error) => {
        // this.setState({ loading: false, purchasing: false });
        // console.log(error);
      
        dispatch(purchaseBurgerFail());
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders,
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED,
    error: error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};
export const fetchOrders = (authToken) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    axios
      .get("./orders.json?auth=" + authToken)
      .then((res) => {
        dispatch(fetchOrderSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchOrderFail());
      });
  };
};
