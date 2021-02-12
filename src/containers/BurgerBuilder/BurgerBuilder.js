import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../api/axios-orders";
import Spinner from "../../components/Spinner/spinner";
import withErroHandler from "../../hoc/withErrorHandler/withErroHandler";
import * as burgerBuilderActions from "../../store/actions/index";
class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };
  componentDidMount = () => {
    this.props.onInitIngredients();
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: "/checkout",
    });
  };
  purchaseCancleHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };
  purchaseHandler = () => {
    if (this.props.isAuthenticated) this.setState({ purchasing: true });
    else {
      this.props.onSetRedirect("/checkout");
      this.props.history.push("/auth");
    }
  };

  updatePurchasable = (tempIngredients) => {
    if (this.props.ings) {
      let sum = Object.values(tempIngredients).reduce((sum, el) => {
        return sum + el;
      }, 0);
      // this.setState(this.setState({ purchasable: sum > 0 }));
      return sum > 0;
    }
  };

  // increaseIngrediants = (ingrediant) => {
  //   const tempObj = { ...this.state.ingredients };
  //   tempObj[ingrediant] += 1;
  //   const priceAddition = INGREDIETN_PRICES[ingrediant];
  //   const newPrice = this.state.totalPrice + priceAddition;
  //   this.setState({ ingredients: tempObj, totalPrice: newPrice });
  //   this.updatePurchasable(tempObj);
  // };
  // decreaseIngrediants = (ingrediant) => {
  //   if (this.state.ingredients[ingrediant] !== 0) {
  //     const tempObj = { ...this.state.ingredients };
  //     const priceDeduction = INGREDIETN_PRICES[ingrediant];
  //     const newPrice = this.state.totalPrice - priceDeduction;
  //     tempObj[ingrediant] -= 1;
  //     this.setState({ ingredients: tempObj, totalPrice: newPrice });
  //     this.updatePurchasable(tempObj);
  //   }
  // };
  render() {
    let burger =
      this.props.error === true ? (
        <p>ingredients could not be loaded</p>
      ) : (
        <>
          <Burger ingredients={this.props.ings} />
          <BurgerControls
            decrease={this.props.onIngredientRemoved}
            increase={this.props.onIngredientAdded}
            price={this.props.price}
            purchasable={this.updatePurchasable(this.props.ings)}
            orderBtnHandler={this.purchaseHandler}
            ingredients={this.props.ings}
            isAuthenticated={this.props.isAuthenticated}
          />
        </>
      );
    let orderSummaryCheck = <Spinner />;

    if (this.props.ings)
      orderSummaryCheck = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          cancle={this.purchaseCancleHandler}
          continue={this.purchaseContinueHandler}
        />
      );
    if (this.state.loading) orderSummaryCheck = <Spinner />;
    if (this.props.error)
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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token ? true : false,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredients(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredients(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetRedirect: (path) =>
      dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErroHandler(BurgerBuilder, axios));
