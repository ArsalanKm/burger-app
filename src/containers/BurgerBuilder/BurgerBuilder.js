import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const INGREDIETN_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  purchaseContinueHandler = () => {
    console.log("continue");
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
    return (
      <>
        <Modal
          backDropHandler={this.purchaseCancleHandler}
          show={this.state.purchasing}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            cancle={this.purchaseCancleHandler}
            continue={this.purchaseContinueHandler}
          />
        </Modal>
        <div>
          <Burger ingredients={this.state.ingredients} />
        </div>
        <BurgerControls
          decrease={this.decreaseIngrediants}
          increase={this.increaseIngrediants}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          orderBtnHandler={this.purchaseHandler}
        />
      </>
    );
  }
}
export default BurgerBuilder;
