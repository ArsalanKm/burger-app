import React from "react";
import styles from "./Modal.module.css";
import Backdrop from "../BackDrop/BackDrop";

const Modal = (props) => {
  return (
    <>
      <Backdrop backDropHandler={props.backDropHandler} show={props.show} />
      <div
        className={styles.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </>
  );
};
export default Modal;
