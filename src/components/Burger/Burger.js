import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

const Burger = (props) => {
  const { ingredients } = props;

  let transformedIngredients = Object.keys(ingredients).map((item) => {
    return [...Array(ingredients[item])].map((_, i) => {
      return <BurgerIngredient key={item + i} type={item} />;
    });
  });

  let ingredientSum = 0;
  Object.values(ingredients).forEach((element) => (ingredientSum += element));

  if (ingredientSum === 0)
    transformedIngredients = <p>please start adding ingredients</p>;

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};


export default Burger;
