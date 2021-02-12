import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../BackDrop/BackDrop";
import styles from "./SideDrawer.module.css";

const SideDrawer = (props) => {
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.show) attachedClasses = [styles.SideDrawer, styles.Open];
  return (
    <>
      <Backdrop show={props.show} backDropHandler={props.clicked} />
      <div className={attachedClasses.join(" ")}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
