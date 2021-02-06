import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../api/axios-orders";
import Spinner from "../../components/Spinner/spinner";
import withErroHandler from "../../hoc/withErrorHandler/withErroHandler";
import * as actionTypes from "../../store/actions";

const INGREDIETN_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1,
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount = () => {
    axios
      .get(
        "https://react-burger-app-99550-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };
  purchaseContinueHandler = () => {
    // console.log("continue");
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "arsalan",
    //     addresse: {
    //       street: "test",
    //       zipCode: "Germany",
    //     },
    //     email: "karimzadarsalan@gmail.com",
    //   },
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => this.setState({ loading: false, purchasing: false }))
    //   .catch((error) => {
    //     this.setState({ loading: false, purchasing: false });
    //     console.log(error);
    //   });
    const queryParams = [];
    for (let i in this.state.ingredients)
      queryParams.push(encodeURIComponent(i) + "=" + this.state.ingredients[i]);
    queryParams.push("price=" + this.state.totalPrice.toFixed(2));
    let queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };
  purchaseCancleHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };
  purchaseHandler = () => [this.setState({ purchasing: true })];

  updatePurchasable = (tempIngredients) => {
    let sum = Object.values(tempIngredients).reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState(this.setState({ purchasable: sum > 0 }));
  };

  increaseIngrediants = (ingrediant) => {
    const tempObj = { ...this.state.ingredients };
    tempObj[ingrediant] += 1;
    const priceAddition = INGREDIETN_PRICES[ingrediant];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({ ingredients: tempObj, totalPrice: newPrice });
    this.updatePurchasable(tempObj);
  };
  decreaseIngrediants = (ingrediant) => {
    if (this.state.ingredients[ingrediant] !== 0) {
      const tempObj = { ...this.state.ingredients };
      const priceDeduction = INGREDIETN_PRICES[ingrediant];
      const newPrice = this.state.totalPrice - priceDeduction;
      tempObj[ingrediant] -= 1;
      this.setState({ ingredients: tempObj, totalPrice: newPrice });
      this.updatePurchasable(tempObj);
    }
  };
  render() {
    let burger =
      this.state.error === true ? (
        <p>ingredients could not be loaded</p>
      ) : (
        <>
          <Burger ingredients={this.props.ings} />
          <BurgerControls
            decrease={this.props.onIngredientRemoved}
            increase={this.props.onIngredientAdded}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            orderBtnHandler={this.purchaseHandler}
            ingredients={this.props.ings}
          />
        </>
      );
    let orderSummaryCheck = <Spinner />;

    if (this.props.ings)
      orderSummaryCheck = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.state.totalPrice}
          cancle={this.purchaseCancleHandler}
          continue={this.purchaseContinueHandler}
        />
      );
    if (this.state.loading) orderSummaryCheck = <Spinner />;
    if (this.state.error)
      orderSummaryCheck = <p>we could'nt retrive ingredients</p>;

    return (
      <>
        <Modal
          backDropHandler={this.purchaseCancleHandler}
          show={this.state.purchasing}
        >
          {orderSummaryCheck}
        </Modal>

        {this.props.ings ? burger : <Spinner />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErroHandler(BurgerBuilder, axios));
