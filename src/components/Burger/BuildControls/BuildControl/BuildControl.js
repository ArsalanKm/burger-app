import React from "react";
import styles from "./BuildControl.module.css";
const BuildControl = (props) => {
  const { lable, increase, decrease } = props;
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{lable}</div>
      <button onClick={decrease} className={styles.Less}>
        Less
      </button>
      <button onClick={increase} className={styles.More}>
        More
      </button>
    </div>
  );
};
export default BuildControl;
