// React
import * as React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { useSelector } from "react-redux";
import config from "../../../config";
import { useDispatch } from "react-redux";
import { set_error } from "../placeOrderSlice";

const LoadingShipment = ({ children }) => {
  const dispatch = useDispatch();

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;
  const placeOrder = useSelector(state => state.placeOrder);
  const { loading_shipping, error } = placeOrder;

  const loading_message = () => {
    setTimeout(() => {
      return <h3 style={{ textAlign: "center" }}>If page doesn't show in 5 seconds, refresh the page.</h3>;
    }, 3000);
  };

  const close_error = () => {
    dispatch(set_error());
  };

  // const run_address_without_verification = () => {
  //   // set_loading_payment(false);
  //   dispatch(set_loading_shipping(true));
  //   dispatch(set_verify_shipping(false));
  //   get_shipping_rates(false);
  //   dispatch(set_error());
  // };

  // function calculateTotalPounds(cartItems) {
  //   let totalOunces = 0;
  //   for (let i = 0; i < cartItems.length; i++) {
  //     const item = cartItems[i];
  //     const weightInOunces = (item?.weight_pounds * 16 || 0) + (item?.weight_ounces || 0);
  //     totalOunces += weightInOunces * item.qty;
  //   }
  //   const totalPounds = totalOunces / 16;
  //   return totalPounds;
  // }

  return (
    <div>
      {loading_shipping ? (
        <div className="jc-c column">
          <img
            src={config.PUBLIC_URL + "/loading.gif"}
            className="loading_gif"
            alt="Loading Circle"
            title="Loading Circle"
          />
          <img
            src={config.PUBLIC_URL + "/loading_overlay.png"}
            className="loading_png"
            alt="Loading Overlay"
            title="Loading Overlay"
          />
          <div className="payment_message">
            <h2 className="ta-c">Calculating Shipping Speeds</h2>
            <p className="ta-c">Please do not refresh page</p>
          </div>
          {loading_message()}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoadingShipment;
