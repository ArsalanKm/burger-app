import React from "react";
import burgerLog from "../../assets/images/burger-logo.png";
import styles from "./Logo.module.css";

const Logo = (props) => {
  return (
    <div className={styles.Logo} style={{ height: props.height }}>
      <img src={burgerLog} alt="logo" />
    </div>
  );
};

export default Logo;
