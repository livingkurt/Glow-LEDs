import React, { useEffect, useState } from "react";
import { GLButton } from "../../GlowLEDsComponents";
import { Link } from "react-router-dom";
import Survey from "../Survey";
import { Helmet } from "react-helmet";

const OrderComplete = ({ userInfo, order_id }) => {
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
    <div className="column jc-c">
      <Helmet>
        <title>Order Complete | Glow LEDs</title>
        <meta property="og:title" content="Check Email" />
        <meta name="twitter:title" content="Check Email" />
        <link rel="canonical" href={"https://www.glow-leds.com/pages/complete/order"} />
        <meta property="og:url" content={"https://www.glow-leds.com/pages/complete/order"} />
      </Helmet>
      <h2 className="ta-c">Thank you for your Glow LEDs Order</h2>
      <p className="ta-c max-w-800px lh-30px m-auto">You will be receiving a confirmation email with your order details shortly.</p>
      <h2 className="ta-c mb-10px">What to Expect</h2>
      <div className="ta-c max-w-800px m-auto">
        <p className="mv-10px "> Since everything is made to order...</p>
        <p className="mv-10px "> You will receive your hand crafted items within 1 - 3 weeks of placing your order domestically.</p>
        <p className="mv-10px ">Expect a three to six week delivery window for international orders.</p>
        <p className="mv-10px ">Keep in mind, items may ship out at different times on the Glow LEDs product journey.</p>
        <p className="mv-10px ">For more information about how we create our products and shipping times, refer to our FAQs.</p>
      </div>
      {/* <p className="ta-c max-w-800px lh-30px m-auto">All of our products are handmade and made to order! 💙</p>
      <p className="ta-c max-w-800px lh-30px m-auto"> Processing time is usually 3-10 business days.</p>
      <p className="ta-c max-w-800px lh-30px m-auto"> Standard shipping time is 1-5 business days after processing is complete. </p>
      <p className="ta-c max-w-800px lh-30px m-auto"> Processing time is independent of the selected shipping speed. </p>
      <p className="ta-c max-w-800px lh-30px m-auto" style={{ webkitTextStroke: "1px black !important" }}>
        Add this processing time to your shipping speed to get the most accurate delivery date.
      </p>
      <p className="ta-c max-w-800px lh-30px m-auto">
        {" "}
        Many of our products are hand-made and made to order which means they are not made until your order is placed.{" "}
      </p>
      <p className="ta-c max-w-800px lh-30px m-auto">
        {" "}
        There may be many orders in front of you that need just as much love and care as yours.{" "}
      </p>
      <p className="ta-c max-w-800px lh-30px m-auto">
        We are a small company, not an Amazon, and always appriciate your understanding and support as we continue to grow!
      </p>{" "} */}
      <div className="max-w-800px w-100per m-auto column g-20px">
        {/* <p className="ta-c max-w-800px lh-30px m-auto">In the meantime, check out these pages for answers to frequently asked questions.</p> */}
        <Link to="/pages/faq#glowskinz">
          <GLButton variant="primary" className="w-100per">
            Glowskinz FAQ
          </GLButton>
        </Link>
        <Link to="/pages/faq#diffuser_caps">
          <GLButton variant="primary" className="w-100per">
            Diffuser Caps FAQ
          </GLButton>
        </Link>
        <Link to="/pages/faq#custom_products">
          <GLButton variant="primary" className="w-100per">
            Custom Products FAQ
          </GLButton>
        </Link>
        <Link to="/pages/faq#featured_content">
          <GLButton variant="primary" className="w-100per">
            Featured Content FAQ
          </GLButton>
        </Link>
        <Link to="/pages/faq#processing_shipping">
          <GLButton variant="primary" className="w-100per">
            Processing/Shipping FAQ
          </GLButton>
        </Link>
        <Link to="/pages/faq#order_issues">
          <GLButton variant="primary" className="w-100per">
            Order Issues FAQ
          </GLButton>
        </Link>
      </div>
      <h2 className="ta-c">Order Details</h2>
      <h4 className="ta-c title_font ">Order ID: {order_id}</h4>
      <div>
        <div className="jc-c m-auto wrap">
          <Link
            to={userInfo && userInfo.hasOwnProperty("first_name") ? "/secure/account/order/" + order_id : "/checkout/order/" + order_id}
          >
            <GLButton variant="primary" className="mh-10px">
              View Order
            </GLButton>
          </Link>
          {userInfo && userInfo.hasOwnProperty("first_name") && (
            <Link to="/secure/account/orders">
              <GLButton variant="primary" className="mh-10px">
                Your Orders
              </GLButton>
            </Link>
          )}
        </div>
      </div>
      <div className="jc-c">
        <img src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg" alt="heart_caps" className="br-20px w-100per max-w-800px m-10px" />
      </div>
      <div className="jc-c">
        <p className="max-w-800px mv-2rem lh-30px ta-c">
          {" "}
          If you have not recieved a confirmation email make sure to check your spam folder for the confirmation email. Please reach out
          with any questions or concerns to {process.env.REACT_APP_CONTACT_EMAIL}.
        </p>
      </div>
      <div className="jc-c ai-c m-auto wrap">
        <div>
          <h3 className="ta-c">Discover More of Your Glow</h3>
          <div className="jc-c m-auto wrap">
            <Link to="/collections/all/products">
              <GLButton variant="primary" className="mh-10px">
                Products
              </GLButton>
            </Link>

            <Link to="collections/all/features/category/glovers">
              <GLButton variant="primary" className="mh-10px">
                Featured Videos
              </GLButton>
            </Link>
            <Link to="/collections/all/sponsors">
              <GLButton variant="primary" className="mh-10px">
                Sponsored Glovers
              </GLButton>
            </Link>
            <Link to="/collections/all/teams">
              <GLButton variant="primary" className="mh-10px">
                Sponsored Teams
              </GLButton>
            </Link>
            <Link to="/pages/music">
              <GLButton variant="primary" className="mh-10px">
                NTRE Music
              </GLButton>
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
  );
};

export default OrderComplete;
