import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { GLButton } from "../../../../shared/GlowLEDsComponents";
import { useSelector } from "react-redux";

const cardElementOptions = {
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
      "::placeholder": { color: "white" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const StripeForm = ({ handleSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();

  const placeOrder = useSelector(state => state.placeOrder);
  const { hideCheckoutButton, paymentValidations } = placeOrder;

  return (
    <form onSubmit={e => handleSubmit(e, stripe, elements)}>
      <CardElement options={cardElementOptions} />
      {paymentValidations && (
        <label className="validation_text" style={{ textAlign: "center" }}>
          {paymentValidations}
        </label>
      )}
      {/* {!hideCheckoutButton && ( */}
      <GLButton type="submit" variant="primary" className="w-100per mt-1rem bob" disabled={!stripe}>
        {"Complete Order"}
      </GLButton>
      {/* )} */}
    </form>
  );
};

export default StripeForm;
