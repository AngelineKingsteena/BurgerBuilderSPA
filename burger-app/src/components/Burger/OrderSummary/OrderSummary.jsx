import React, { Component } from "react";
import Aux from "../../../hoc/Auxilary/Auxilary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  state = {};

  componentDidUpdate() {
    console.log("order summary will update");
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h5>Your Order Details:</h5>
        <p>The ingredients summary of your order is:</p>
        <ul>{ingredientSummary}</ul>

        <p>
          <strong>Total Price : {this.props.priceSummary.toFixed(2)} $</strong>
        </p>
        <p>Continue to check out ? </p>
        <Button clicked={this.props.purchaseContinue} btnType="Success">
          CONTINUE
        </Button>
        <Button clicked={this.props.purchaseCancel} btnType="Danger">
          CANCEL
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
