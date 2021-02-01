import styles from "./Order.module.css";
import React from "react";

const Order = (props) => {
  const renderIngredients = () => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
      ingredients.push({
        name: ingredientName,
        amount: props.ingredients[ingredientName],
      });
    }
    return ingredients.map((item) => {
      return (
        <span key={item.name}>
          {item.name}:{item.amount}
        </span>
      );
    });
  };
  return (
    <div className={styles.Order}>
      <p>
        <strong>price:{props.price}</strong>
      </p>
      ingredients: {renderIngredients()}

    </div>
  );
};

export default Order;
