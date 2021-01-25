import React from "react";
import styles from "./DrawToggle.module.css";
const DrawToggle = (props) => {
  return (
    <div className={styles.DrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawToggle;
