import React, { Component } from "react";

import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "..//Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
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
        <Toolbar isAuthenticated={this.props.isAuthenticated} clicked={this.toggleButtonHandler} />
        <SideDrawer
          show={this.state.show}
          clicked={this.sideDrawerClosedHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token ? true : false,
  };
};
export default connect(mapStateToProps)(Layout);
