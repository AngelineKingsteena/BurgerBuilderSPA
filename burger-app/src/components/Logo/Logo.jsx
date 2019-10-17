import React from "react";
import Burger from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const Logo = props => {
  return (
    <div className={classes.Logo}>
      <img src={Burger} alt="My burger" />
    </div>
  );
};

export default Logo;
