// React
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../../config";

const Stripe = props => {
  const [stripePromise, setStripePromise] = useState(() => loadStripe(config.REACT_APP_STRIPE_KEY));
  return (
    <div>
      <Elements stripe={stripePromise}>
        <StripeForm
          pay_order={props.pay_order}
          loading_payment={props.loading_payment}
          set_loading_payment={props.set_loading_payment}
          guest={props.guest}
          date_1={props.date_1}
          date_2={props.date_2}
        />
      </Elements>
    </div>
  );
};

export default Stripe;
