import React from "react";
import styles from "./BuildControl.module.css";
const BuildControl = (props) => {
  const { lable, increase, decrease, ingredients, type } = props;
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{lable}</div>
      <button
        disabled={ingredients[type] === 0}
        onClick={decrease}
        className={styles.Less}
      >
        Less
      </button>
      <button onClick={increase} className={styles.More}>
        More
      </button>
      <small className={styles.IngredientNum}> {ingredients[type]}</small>
    </div>
  );
};
export default BuildControl;
