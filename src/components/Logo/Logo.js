import React from "react";
import burgerLog from "../../assets/images/burger-logo.png";
import styles from "./Logo.module.css";
import { Link } from "react-router-dom";
const Logo = (props) => {
  return (
    <div className={styles.Logo} style={{ height: props.height }}>
      <Link to="/">
        <img src={burgerLog} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
