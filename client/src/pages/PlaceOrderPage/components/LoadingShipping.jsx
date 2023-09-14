import React from "react";
import { useSelector } from "react-redux";
import config from "../../../config";

const LoadingShipment = ({ children }) => {
  const placeOrder = useSelector(state => state.placeOrder);
  const { loadingShipping } = placeOrder;

  const loading_message = () => {
    setTimeout(() => {
      return <h3 style={{ textAlign: "center" }}>If page doesn't show in 5 seconds, refresh the page.</h3>;
    }, 3000);
  };

  return (
    <div>
      {loadingShipping ? (
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
