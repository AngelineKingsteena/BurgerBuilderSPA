import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxilary/Auxilary";
import BackDrop from "../BackDrop/BackDrop";

class Modal extends Component {
  state = {};

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentDidUpdate() {
    console.log("modal did update");
  }
  render() {
    return (
      <Aux>
        <BackDrop
          show={this.props.show}
          clicked={this.props.modalClosed}
        ></BackDrop>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translate(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
