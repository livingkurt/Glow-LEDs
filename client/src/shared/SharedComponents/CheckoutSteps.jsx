import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutSteps = props => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div className="checkout-steps">
      <div className={props.step1 ? "active" : ""}>{userInfo && userInfo.first_name ? "Login" : "Email"}</div>
      <div className={props.step2 ? "active" : ""}>
        <Link to={userInfo && userInfo.first_name ? "/secure/checkout/shipping" : "/checkout/shipping"}>Shipping</Link>
      </div>
      <div className={props.step3 ? "active" : ""}>
        <Link to={userInfo && userInfo.first_name ? "/secure/checkout/placeorder" : "/checkout/placeorder"}>Payment</Link>
      </div>
      <div className={props.step4 ? "active" : ""}>Complete</div>
    </div>
  );
};

export default CheckoutSteps;
