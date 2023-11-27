import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Survey from "./Survey";
import { Helmet } from "react-helmet";
import config from "../../../config";
import { Button, Divider, Grid } from "@mui/material";

const OrderComplete = ({ current_user, order_id }) => {
  const [show_modal, set_show_modal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      set_show_modal(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="">
      <Helmet>
        <title>Order Complete | Glow LEDs</title>
        <meta property="og:title" content="Check Email" />
        <meta name="twitter:title" content="Check Email" />
        <link rel="canonical" href={"https://www.glow-leds.com/pages/complete/order"} />
        <meta property="og:url" content={"https://www.glow-leds.com/pages/complete/order"} />
      </Helmet>
      <Link to="/">
        <Button style={{ color: "white" }}>Back to Home</Button>
      </Link>
      <div className="column jc-c">
        <div className="ta-c m-auto ">
          <h2 className="ta-c">Thank you for your Glow LEDs Order</h2>
          <Divider />
          <h4 className="ta-c title_font ">Order ID: {order_id}</h4>

          <div className="ta-c max-w-800px m-auto">
            <Grid container spacing={2}>
              <Grid item xs={current_user && current_user?.hasOwnProperty("first_name") ? 6 : 12}>
                <Link
                  to={
                    current_user && current_user?.hasOwnProperty("first_name")
                      ? "/secure/account/order/" + order_id
                      : "/checkout/order/" + order_id
                  }
                >
                  <Button variant="contained" color="primary" fullWidth>
                    View Order
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

          <p className="ta-c max-w-800px lh-30px m-auto mt-15px mb-15px">
            You will be receiving a confirmation email with your order details shortly. Double check your spam folder if
            you don't see it in your inbox. Please reach out with any questions or concerns to{" "}
            {config.REACT_APP_CONTACT_EMAIL}.
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
          <Link to="/pages/faq">
            <Button variant="contained" color="primary" className="w-100per mt-10px">
              FAQ Page
            </Button>
          </Link>
          <Divider />
          <div className="jc-c mt-20px">
            <img
              src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg"
              alt="heart_caps"
              className="br-20px w-100per max-w-800px m-10px"
            />
          </div>
          <div className="m-auto w-100per">
            <div>
              <h3 className="ta-c">Discover More of Your Glow</h3>
              <div className="jc-b w-100per m-auto wrap">
                <Link to="/collections/all/products">
                  <Button variant="contained" color="primary">
                    Products
                  </Button>
                </Link>

                <Link to="collections/all/features/category/glovers">
                  <Button variant="contained" color="primary">
                    Featured Videos
                  </Button>
                </Link>
                <Link to="/collections/all/sponsors">
                  <Button variant="contained" color="primary">
                    Sponsored Glovers
                  </Button>
                </Link>
                <Link to="/collections/all/teams">
                  <Button variant="contained" color="primary">
                    Sponsored Teams
                  </Button>
                </Link>
                <Link to="/pages/music">
                  <Button variant="contained" color="primary">
                    NTRE Music
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div id="myModal" style={{ display: show_modal ? "block" : "none" }} className="modal fade_in">
            <div className="modal-content">
              <span className="close" onClick={() => set_show_modal(false)}>
                &times;
              </span>
              <Survey order_id={order_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
