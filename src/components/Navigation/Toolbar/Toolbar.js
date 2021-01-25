import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawToggle from "../../DrawToggle/DrawToggle";
export const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <DrawToggle clicked={props.clicked} />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.DesktopOnly}>
        <NavigationItems />
      </nav>

      {/* <nav className="nav nav-tabs nav-stacked">
          <a className="nav-link active" href="#">Active link</a>
          <a className="nav-link" href="#">Link</a>
          <a className="nav-link disabled" href="#">Disabled link</a>
      </nav> */}
    </header>
  );
};

export default Toolbar;
