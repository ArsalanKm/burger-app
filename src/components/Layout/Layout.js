import React, { Component } from "react";

import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "..//Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = { show: false };
  sideDrawerClosedHandler = () => {
    this.setState({ show: false });
  };
  toggleButtonHandler = () => {
    console.log("toggle");
    this.setState((prevState) => {
      return { show: !prevState.show };
    });
  };
  render() {
    return (
      <>
        <Toolbar clicked={this.toggleButtonHandler} />
        <SideDrawer
          show={this.state.show}
          clicked={this.sideDrawerClosedHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </>
    );
  }
}
export default Layout;
