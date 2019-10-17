import React from "react";
import classes from "./Order.module.css";

const Order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          border: "1px solid #ccc",
          padding: "5px",
          margin: "0 8px",
          display: "inline-block"
        }}
        key={ig.name}
      >
        {ig.name}({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Burger Ingredients : {ingredientOutput}</p>
      <p>
        Price :<strong> USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
