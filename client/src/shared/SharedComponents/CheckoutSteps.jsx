import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  return (
    <div className="checkout-steps">
      <div className={step1 ? "active" : ""}>{current_user && current_user.first_name ? "Login" : "Email"}</div>
      <div className={step2 ? "active" : ""}>
        <Link to={current_user && current_user.first_name ? "/secure/checkout/shipping" : "/checkout/shipping"}>
          Shipping
        </Link>
      </div>
      <div className={step3 ? "active" : ""}>
        <Link to={current_user && current_user.first_name ? "/secure/checkout/placeorder" : "/checkout/placeorder"}>
          Payment
        </Link>
      </div>
      <div className={step4 ? "active" : ""}>Complete</div>
    </div>
  );
};

export default CheckoutSteps;
