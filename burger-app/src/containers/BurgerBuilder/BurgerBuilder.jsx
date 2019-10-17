import React, { Component } from "react";
import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "./../../hoc/WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }
  updatedPurchaseable = ingredients => {
    const count = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return count > 0;
  };

  updatePurchasing = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: !this.state.purchasing });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("./auth");
    }
  };

  cancelPurchase = () => {
    this.setState({ purchasing: false });
  };
  continuePurchase = () => {
    //alert("You continue!");
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabled = {
      ...this.props.ings
    };

    for (let keys in disabled) {
      disabled[keys] = disabled[keys] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <h1 style={{ textAlign: "center" }}>
        Ingredients can't be loaded, Sorry for the inconvenience ! :(
      </h1>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            add={this.props.onIngredientAdded}
            addDisabled={disabled}
            remove={this.props.onIngredientRemoved}
            price={this.props.price}
            purchaseable={this.updatedPurchaseable(this.props.ings)}
            purchasing={this.updatePurchasing}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancel={this.cancelPurchase}
          purchaseContinue={this.continuePurchase}
          priceSummary={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.cancelPurchase}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axiosInstance));
