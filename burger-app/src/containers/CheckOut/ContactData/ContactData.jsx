import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axiosInstance from "./../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import WithErrorHandler from "./../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../../store/actions/index";

import { updateObject ,checkValidity} from "./../../../store/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      email: {
        elementtype: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street name"
        },
        value: "",
        validation: {
          required: true
        },

        valid: false,
        touched: false
      },
      zipCode: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your postal code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country "
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementtype: "select",
        elementConfig: {
          options: [
            { valueA: "[Choose]", displayValue: "[--Choose Option--]" },
            { valueA: "fastest", displayValue: "Fastest" },
            { valueA: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {
          required: true
        },
        valid: true
      }
    },

    formIsValid: false
  };

  
  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      //country/name..etc=user input-->value receives input because of two way binding
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    //console.log(this.props.ings);

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  changeHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    /*//this just does shallow clone since our object of interest in deeply nested object

    const updatedOrderForm = { ...this.state.orderForm };
    ///we clone inner elements also, for deep cloning,this points to email,zipcode,etc,
    //becoz spread operator gives pointer only,and so any changes will reflect in that object also

    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    console.log(updatedFormElement);
    updatedOrderForm[inputIdentifier] = updatedFormElement;  */

    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true
      }
    );
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementtype={formElement.config.elementtype}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.changeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) form = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.burgerBuilder.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, axiosInstance));
