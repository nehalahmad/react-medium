import React from "react";
import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => (
  <header className="toolbar">
    <Logo />
    <div className="desktop-only">
      <NavigationItems isAuthenticated={props.isAuth} />
    </div>
  </header>
);

export default toolbar;
