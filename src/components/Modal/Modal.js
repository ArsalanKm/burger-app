import React from "react";
import styles from "./Modal.module.css";
import Backdrop from "../BackDrop/BackDrop";

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  componentWillUpdate() {
    console.log("modal will update");
  }
  render() {
    return (
      <>
        <Backdrop
          backDropHandler={this.props.backDropHandler}
          show={this.props.show}
        />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}
export default Modal;
