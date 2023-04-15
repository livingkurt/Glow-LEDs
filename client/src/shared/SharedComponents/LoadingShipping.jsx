// React
import React from "react";
import { GLButton } from "../GlowLEDsComponents";
import { useSelector } from "react-redux";
require("dotenv").config();
// Components

const LoadingShipment = ({
  loading,
  error,
  children,
  set_error,
  set_loading_payment,
  get_shipping_rates,
  set_verify_shipping,
  set_loading_shipping
}) => {
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;

  function calculateTotalOunces(cartItems) {
    let totalOunces = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      const weightInOunces = item.weight_pounds * 16 + item.weight_ounces;
      totalOunces += weightInOunces * item.qty;
    }
    return totalOunces;
  }
  function calculateTotalPounds(cartItems) {
    let totalOunces = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      const weightInOunces = item.weight_pounds * 16 + item.weight_ounces;
      totalOunces += weightInOunces * item.qty;
    }
    const totalPounds = totalOunces / 16;
    return totalPounds;
  }

  const loading_message = () => {
    setTimeout(() => {
      return <h3 style={{ textAlign: "center" }}>If page doesn't show in 5 seconds, refresh the page.</h3>;
    }, 3000);
  };

  const close_error = () => {
    // set_loading_payment(false);
    set_error();
  };
  const run_address_without_verification = () => {
    // set_loading_payment(false);
    set_loading_shipping(true);
    set_verify_shipping(false);
    get_shipping_rates(false);
    set_error();
  };

  return (
    <div>
      {loading ? (
        <div className="jc-c column">
          <img src={process.env.PUBLIC_URL + "/loading.gif"} className="loading_gif" alt="Loading Circle" title="Loading Circle" />
          <img
            src={process.env.PUBLIC_URL + "/loading_overlay.png"}
            className="loading_png"
            alt="Loading Overlay"
            title="Loading Overlay"
          />
          <div className="payment_message">
            <h2 className="ta-c">Wait a moment while we process your Payment</h2>
            <p className="ta-c">Please Do not Refresh Page</p>
          </div>
          {loading_message()}
        </div>
      ) : error ? (
        <div className="error_message_payment jc-c column">
          <div>
            <h2 className="ta-c mv-5px">Error:</h2>
            {error.error.split("-").map(error => (
              <p className="ta-c mv-5px">{error}</p>
            ))}
            <h2 className="ta-c mt-20px">Solution:</h2>
            {error.error.includes("maximum per package") && (
              <p className="ta-c  mb-1px">
                The total weight of the items in your cart is {calculateTotalPounds(cartItems)} lbs You need to remove items from your cart
                and try again.
              </p>
            )}
            {!error.error.includes("maximum per package") && (
              <>
                <p className="ta-c  mb-1px">Double check you entered your shipping address correctly</p>
                <hr></hr>
                <p className="ta-c  mb-1px">Sometimes your address is correct but our system throws a false negative</p>
                <GLButton variant="primary" className="jc-b m-auto" aria-label="Close" onClick={() => run_address_without_verification()}>
                  Run Address without Verification
                </GLButton>
              </>
            )}
            <hr></hr>
            <p className="ta-c  mb-1px">If that does not work please:</p>
            <p className="ta-c mt-20px mb-1px">Contact {process.env.REACT_APP_CONTACT_EMAIL} for assistence</p>
          </div>

          <GLButton className="sidebar_close_button" aria-label="Close" onClick={() => close_error()}>
            <i className="fas fa-times" aria-label="Close" />
          </GLButton>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoadingShipment;
