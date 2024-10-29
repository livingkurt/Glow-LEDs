import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../../config";

const Stripe = ({ pay_order, loadingPayment, setLoadingPayment, guest, date_1, date_2 }) => {
  const [stripePromise, setStripePromise] = useState(() => loadStripe(config.VITE_STRIPE_KEY));
  return (
    <div>
      <Elements stripe={stripePromise}>
        <StripeForm
          pay_order={pay_order}
          loadingPayment={loadingPayment}
          setLoadingPayment={setLoadingPayment}
          guest={guest}
          date_1={date_1}
          date_2={date_2}
        />
      </Elements>
    </div>
  );
};

export default Stripe;
