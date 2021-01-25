import React from "react";
import styles from "./BackDrop.module.css";

const backdrop = (props) => {
  return props.show ? (
    <div className={styles.Backdrop} onClick={props.backDropHandler}></div>
  ) : null;
};

export default backdrop;
