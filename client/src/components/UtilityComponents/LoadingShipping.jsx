// React
import React from "react";
import { GLButton } from "../GlowLEDsComponents";
require("dotenv").config();
// Components

const LoadingShipment = ({
  loading,
  error,
  children,
  set_error,
  set_loading_payment,
}) => {
  const loading_message = () => {
    setTimeout(() => {
      return (
        <h3 style={{ textAlign: "center" }}>
          If page doesn't show in 5 seconds, refresh the page.
        </h3>
      );
    }, 3000);
  };
  console.log({ LoadingShipment: error });

  const close_error = () => {
    // set_loading_payment(false);
    set_error();
  };
  console.log({ error });

  return (
    <div>
      {loading ? (
        <div className="jc-c column">
          <img
            src={process.env.PUBLIC_URL + "/loading.gif"}
            className="loading_gif"
            alt="Loading Circle"
            title="Loading Circle"
          />
          <img
            src={process.env.PUBLIC_URL + "/loading_overlay.png"}
            className="loading_png"
            alt="Loading Overlay"
            title="Loading Overlay"
          />
          <div className="payment_message">
            <h2 className="ta-c">
              Wait a moment while we process your Payment
            </h2>
            <p className="ta-c">Please Do not Refresh Page</p>
          </div>
          {loading_message()}
        </div>
      ) : error ? (
        <div className="error_message_payment jc-c column">
          <div>
            <h2 className="ta-c mv-5px">Error:</h2>
            {error.error
              .split("-")
              .map(error => <p className="ta-c mv-5px">{error}</p>)}
            <h2 className="ta-c mt-20px">Solution:</h2>
            <p className="ta-c  mb-1px">
              Double check you entered your shipping address correctly
            </p>
            <p className="ta-c mt-20px mb-1px">
              Contact {process.env.REACT_APP_CONTACT_EMAIL} for assistence
            </p>
          </div>
          <GLButton
            className="sidebar_close_button"
            aria-label="Close"
            onClick={() => close_error()}
          >
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
