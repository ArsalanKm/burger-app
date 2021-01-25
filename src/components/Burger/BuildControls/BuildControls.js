import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { lable: "Salad", type: "salad" },
  { lable: "Bacon", type: "bacon" },
  { lable: "Cheese", type: "cheese" },
  { lable: "Meat", type: "meat" },
];
const BuildControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price :<strong>{props.price.toFixed(2)}</strong>{" "}
      </p>
      {controls.map((item, index) => {
        return (
          <BuildControl
            decrease={() => props.decrease(item.type)}
            increase={() => props.increase(item.type)}
            key={index}
            lable={item.lable}
            ingredients={props.ingredients}
            type={item.type}

          />
        );
      })}

      <button
        disabled={!props.purchasable}
        className={styles.OrderButton}
        onClick={props.orderBtnHandler}
      >
        ORDER NOW
      </button>
    </div>
  );
};
export default BuildControls;
