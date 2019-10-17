import React from "react";
import Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h5>Please enter your delivery pertinent details</h5>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
