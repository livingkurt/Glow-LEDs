// React
import React, { useState } from "react";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { PromosPage } from "../../pages";
import { decide_warning } from "../../utils/helper_functions";
import { isMobile } from "react-device-detect";
import { GLButton } from "../GlowLEDsComponents";

const StripeForm = props => {
  const stripe = useStripe();
  const elements = useElements();
  const [remove_button, set_remove_button] = useState(false);
  const [payment_validations, set_payment_validations] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    isMobile && window.scrollTo({ top: 0, behavior: "smooth" });
    props.set_loading_payment(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (error) {
      props.set_loading_payment(false);
      set_payment_validations(error.message);

      return;
    } else if (!error) {
      set_remove_button(true);

      props.pay_order(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          iconStyle: "solid",
          style: {
            base: {
              iconColor: "#c4f0ff",
              color: "#fff",
              fontWeight: 500,
              fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
              fontSize: "1.2rem",
              fontSmoothing: "antialiased",
              ":-webkit-autofill": { color: "white" },
              "::placeholder": { color: "white" }
            },
            invalid: {
              iconColor: "#ffc7ee",
              color: "#ffc7ee"
            }
          }
        }}
      />
      {payment_validations && (
        <label className="validation_text" style={{ textAlign: "center" }}>
          {payment_validations}
        </label>
      )}
      {new Date() > new Date(props.date_1) && new Date() < new Date(props.date_2) && (
        <li>
          <p style={{ color: "#ffca00" }}>Your Order will ship after 12/02/2021 🚚</p>
        </li>
      )}
      {!remove_button && (
        <GLButton type="submit" variant="primary" className="w-100per mt-1rem bob" disabled={!stripe}>
          Complete Order
        </GLButton>
      )}
    </form>
  );
};

export default StripeForm;
