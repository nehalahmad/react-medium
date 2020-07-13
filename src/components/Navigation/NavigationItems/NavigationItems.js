import React from "react";

import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import Auxilliary from "../../../hoc/Auxilliary/Auxilliary";

const navigationItems = (props) => (
  <ul className="navigation-items">
    <NavigationItem link="/" exact>
      Home
    </NavigationItem>
    {props.isAuthenticated ? (
      <Auxilliary>
        <NavigationItem link="/articles">Articles</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Auxilliary>
    ) : (
      <Auxilliary>
        <NavigationItem link="/login">Sign in</NavigationItem>
        <NavigationItem link="/register">Sign up</NavigationItem>
      </Auxilliary>
    )}
  </ul>
);

export default navigationItems;
