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
  
  error 
) => {
  return {
    
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error:error
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
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        // this.setState({ loading: false, purchasing: false });
        // this.props.history.push("/");
      })
      .catch((error) => {
        // this.setState({ loading: false, purchasing: false });
        // console.log(error);

        dispatch(purchaseBurgerFail(error));
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
export const fetchOrders = (authToken, userId) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    const queryParams =
      "?auth=" + authToken + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("./orders.json" + queryParams)
      .then((res) => {
        dispatch(fetchOrderSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchOrderFail(error));
      });
  };
};
