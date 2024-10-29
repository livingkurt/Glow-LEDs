import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutSteps = ({ success, show_payment, shipping_completed }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  return (
    <div className="checkout-steps">
      <div className={success || show_payment || shipping_completed ? "active" : ""}>
        {current_user && current_user.first_name ? "Login" : "Email"}
      </div>
      <div className={success || show_payment ? "active" : ""}>{"Shipping"}</div>
      <div className={success ? "active" : ""}>{"Payment"}</div>
      <div className={success ? "active" : ""}>{"Complete"}</div>
    </div>
  );
};

export default CheckoutSteps;
