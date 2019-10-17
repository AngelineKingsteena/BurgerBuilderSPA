import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" }
];
const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price : <strong>{props.price.toFixed(2)} $</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          label={ctrl.label}
          key={ctrl.label}
          added={() => props.add(ctrl.type)}
          disabled={props.addDisabled[ctrl.type]}
          removed={() => props.remove(ctrl.type)}
        />
      ))}
      ;
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.purchasing}
      >
        {props.isAuth ? "ORDER NOW" : "SIGN-UP TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
