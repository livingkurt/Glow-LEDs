import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="checkout-steps">
      <div className={step1 ? "active" : ""}>Guest</div>
      <div className={step2 ? "active" : ""}>Shipping</div>

      <div className={step3 ? "active" : ""}>Payment</div>
      <div className={step4 ? "active" : ""}>Complete</div>
    </div>
  );
};

export default CheckoutSteps;
