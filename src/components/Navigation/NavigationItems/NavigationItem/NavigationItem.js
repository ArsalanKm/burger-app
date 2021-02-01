import React from "react";
import styles from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";
const NavigationItem = (props) => {
  return (
    <li className={styles.NavigationItem}>
      <NavLink activeClassName={styles.active} exact to={props.link}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
