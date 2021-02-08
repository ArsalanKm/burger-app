import * as actionTypes from "./actionTypes";
import axios from "../../api/axios-orders";
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
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
export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        console.log("[purchaseBurgerStart]", response.data);
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

export const purchaseInit=()=>{
  return {
    type:actionTypes.PURCHASE_INIT
  }
}