import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GLButton } from "../../../shared/GlowLEDsComponents";

const ViewOrder = props => {
  const [order_number, set_order_number] = useState("");

  const userSlice = useSelector(state => state.userSlice);
  const { current_user } = userSlice;
  return (
    <div className="form">
      <Helmet>
        <title>Track Order | Glow LEDs</title>
        <meta property="og:title" content="Guest Decision" />
        <meta name="twitter:title" content="Guest Decision" />
        <link rel="canonical" href="https://www.glow-leds.com/account/decision" />
        <meta property="og:url" content="https://www.glow-leds.com/account/decision" />
      </Helmet>
      <form>
        <ul className="form-container">
          <h1
            style={{
              textAlign: "center",
              width: "100%",
              justifyContent: "center"
            }}
          >
            Track Your Order
          </h1>
          <li>
            <label htmlFor="order_number">Order Number</label>
            <input type="order_number" id="order_number" name="order_number" onChange={e => set_order_number(e.target.value.trim())} />
          </li>
          <li>
            <Link
              to={current_user && current_user.first_name ? "/secure/account/order/" + order_number : "/checkout/order/" + order_number}
            >
              <GLButton variant="primary" className="w-100per">
                View Order
              </GLButton>
            </Link>
          </li>
          <li>
            <p>If you do not know your order number please contact support for assistance</p>
          </li>
          <li>
            <Link to="/pages/contact">
              <GLButton variant="primary" className="w-100per" style={{ margin: "auto" }}>
                Contact
              </GLButton>
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};
export default ViewOrder;
