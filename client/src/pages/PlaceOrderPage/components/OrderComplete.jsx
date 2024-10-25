import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import config from "../../../config";
import { Button, Divider, Grid } from "@mui/material";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import { ArrowBack } from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { initializePlaceOrderPage } from "../placeOrderSlice";
import CheckoutSteps from "../../../shared/SharedComponents/CheckoutSteps";

const OrderComplete = ({ current_user, orderIds }) => {
  const dispatch = useDispatch();

  return (
    <div className="fade_in">
      <Helmet>
        <title>Order Complete | Glow LEDs</title>
        <meta property="og:title" content="Check Email" />
        <meta name="twitter:title" content="Check Email" />
        <link rel="canonical" href={"https://www.glow-leds.com/place_order"} />
        <meta property="og:url" content={"https://www.glow-leds.com/place_order"} />
      </Helmet>
      <div className="column jc-c">
        <Link to="/">
          <Button
            style={{ color: "white" }}
            startIcon={<ArrowBack />}
            onClick={() => dispatch(initializePlaceOrderPage())}
          >
            Back to Home
          </Button>
        </Link>
        <CheckoutSteps success={true} show_payment={true} shipping_completed={true} />
        <div className="ta-c m-auto ">
          <h2 className="ta-c">Thank you for your Glow LEDs Order</h2>
          {orderIds.length > 1 && (
            <div className="mb-15px">
              <p>Your order has been split into {orderIds.length} separate orders.</p>
              <p>These orders will be shipped separately.</p>
            </div>
          )}
          <Divider />
          {orderIds.map((orderId, index) => (
            <div key={orderId}>
              <h4 className="ta-c title_font ">
                Order {index > 1 ? index + 1 : ""} ID: {orderId}
              </h4>

              <div className="ta-c max-w-800px m-auto">
                <Grid container spacing={2}>
                  <Grid item xs={current_user && current_user?.hasOwnProperty("first_name") ? 6 : 12}>
                    <Link
                      to={
                        current_user && current_user?.hasOwnProperty("first_name")
                          ? "/secure/account/order/" + orderId
                          : "/checkout/order/" + orderId
                      }
                    >
                      <Button variant="contained" color="primary" fullWidth>
                        View Order {index > 1 ? index + 1 : ""}
                      </Button>
                    </Link>
                  </Grid>
                  {current_user && current_user?.hasOwnProperty("first_name") && (
                    <Grid item xs={6}>
                      <Link to="/secure/account/profile">
                        <Button variant="contained" color="primary" fullWidth>
                          Your Orders
                        </Button>
                      </Link>
                    </Grid>
                  )}
                </Grid>
              </div>
            </div>
          ))}
          <p className="ta-c max-w-800px lh-30px m-auto mt-15px mb-15px">
            You will be receiving a confirmation email with your order details shortly. Double check your spam folder if
            you don't see it in your inbox. Please reach out with any questions or concerns to{" "}
            {config.VITE_CONTACT_EMAIL}.
          </p>
          <Divider />
          <h2 className="ta-c mb-10px">What to Expect</h2>

          <p className="mb-10px ">Since everything is made to order...</p>
          <p className="mv-10px ">
            You will receive your hand crafted items within 1 - 3 weeks of placing your order domestically.
          </p>
          <p className="mv-10px ">Expect a three to six week delivery window for international orders.</p>
          <p className="mv-10px ">
            Keep in mind, items may ship out at different times on the Glow LEDs product journey.
          </p>
          <p className="mv-10px ">
            For more information about how we create our products and shipping times, refer to our FAQs.
          </p>
          <Link to="/faq">
            <Button variant="contained" color="primary" className="w-100per mt-10px">
              FAQ Page
            </Button>
          </Link>
          <Divider />
          <div className="jc-c mt-20px">
            <GLLazyImage
              src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg"
              alt="heart_caps"
              className="br-20px w-100per max-w-800px m-10px"
            />
          </div>
          <div className="m-auto w-100per">
            <div>
              <h3 className="ta-c">Discover More of Your Glow</h3>
              <div className="jc-b w-100per m-auto wrap">
                <Link to="/products">
                  <Button variant="contained" color="primary">
                    Products
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button variant="contained" color="primary">
                    Learn
                  </Button>
                </Link>
                <Link to="/tutorials">
                  <Button variant="contained" color="primary">
                    Tutorials
                  </Button>
                </Link>
                <Link to="/sponsors">
                  <Button variant="contained" color="primary">
                    Sponsored Glovers
                  </Button>
                </Link>
                <Link to="/support_center">
                  <Button variant="contained" color="primary">
                    Support Center
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
