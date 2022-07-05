import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Survey } from "../../components/SpecialtyComponents";
import { Loading } from "../../components/UtilityComponents";
import {
  API_Affiliates,
  API_Emails,
  API_Features,
  API_Orders,
} from "../../utils";

const CompletePage = props => {
  const [ data, set_data ] = useState();
  const [ type, set_type ] = useState(props.match.params.type);
  const [ loading, set_loading ] = useState(false);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    let clean = true;
    if (clean) {
      update_data();
      send_email();
    }
    return () => {
      clean = false;
    };
  }, []);

  const update_data = () => {
    if (props.match.params.type === "order") {
      set_data({
        title: "Order Complete",
        id: "Order ID: " + props.match.params.id,
        h1: "Thank you for your order!",
        h2: "",
        p: `You will be receiving a confirmation email with your order details shortly.\n

        All of our products are handmade and made to order! 💙  \n
        
        Processing time is usually 3-10 business days.\n
        
        Standard shipping time is 1-5 business days after processing is complete. \n
        `,
        button_label: "",
        button_link: "",
        link: "https://www.glow-leds.com/pages/complete/order",
      });
    } else if (props.match.params.type === "affiliate") {
      set_data({
        title: "Affiliate Sign Up Complete",
        h1: "Thank you for Applying!",
        h2: "",
        p:
          "You will be recieving a conformation email with your affiliate details",
        button_label: "",
        button_link: "",
        link: "https://www.glow-leds.com/pages/complete/affiliate",
      });
    } else if (props.match.params.type === "email") {
      set_data({
        title: "Email Sent Successfully!",
        h1: "Thank You for Contacting Glow LEDs",
        h2: "",
        p: "We'll answer your questions or requests as soon as possible.",
        button_label: "",
        button_link: "",
        link: "/pages/faq",
      });
    } else if (props.match.params.type === "feature") {
      set_data({
        title: "Feature Sign Up Complete",
        h1: "Thank you for sending us your art!",
        h2: "",
        p:
          "You will be recieving a conformation email with your affiliate details",
        button_label: "",
        button_link: "",
        link: "https://www.glow-leds.com/pages/complete/affiliate",
      });
    }
  };

  const send_email = async () => {
    set_loading(true);
    if (props.match.params.type === "order") {
      const { data: order } = await API_Orders.findById_orders_a(
        props.match.params.id
      );
      await API_Emails.send_order_email(
        order,
        "Thank you for your Glow LEDs Order",
        order.shipping.email
      );
      await API_Emails.send_order_email(
        order,
        "New Order Created by " + order.shipping.first_name,
        process.env.REACT_APP_INFO_EMAIL
      );

      if (order.orderItems.some(item => item.category === "custom")) {
        console.log({ Custom: "Custom" });
        await API_Emails.send_custom_contact_email(order, order.shipping.email);
      }
      setTimeout(() => {
        set_show_modal(true);
      }, 2000);
    } else if (props.match.params.type === "affiliate") {
      const { data: affiliate } = await API_Affiliates.findById_affiliates_a(
        props.match.params.id
      );
      await API_Emails.send_affiliate_email(
        affiliate,
        "Welcome to the Team!",
        affiliate.user.email
      );
      await API_Emails.send_affiliate_email(
        affiliate,
        "New Affiliate Created by " + affiliate.artist_name,
        process.env.REACT_APP_INFO_EMAIL
      );
    } else if (props.match.params.type === "feature") {
      const { data: feature } = await API_Features.findById_features_a(
        props.match.params.id
      );
      await API_Emails.send_feature_email(
        feature,
        "Your Glow LEDs Feature",
        feature.user.email
      );
      await API_Emails.send_feature_email(
        feature,
        "New Feature Created by " + feature.artist_name,
        process.env.REACT_APP_INFO_EMAIL
      );
    }
    set_loading(false);
  };

  const [ show_modal, set_show_modal ] = useState(false);

  return (
    <div>
      {data && (
        <div>
          <Helmet>
            <title>{data.title} | Glow LEDs</title>
            <meta property="og:title" content="Check Email" />
            <meta name="twitter:title" content="Check Email" />
            <link rel="canonical" href={data.link} />
            <meta property="og:url" content={data.link} />
          </Helmet>
          {userInfo &&
          userInfo.isAdmin && (
            <div className="jc-b mb-1rem">
              <Link to="/secure/glow/emails">
                <button className="btn primary mh-10px">Back to Emails</button>
              </Link>
              <Link
                to={
                  props.location.previous_path ||
                  "/secure/glow/orders?page=1?limit=10"
                }
              >
                <button className="btn primary mh-10px">Back to Orders</button>
              </Link>

              <button
                className="btn primary mb-1rem"
                onClick={() => send_email()}
              >
                Send Email
              </button>
              <button
                className="btn primary mh-10px"
                id="myBtn"
                onClick={() => set_show_modal(true)}
              >
                Open Modal
              </button>
            </div>
          )}
          <div className="column jc-c">
            {data.h1 && <h1 className="ta-c">{data.h1}</h1>}
            {data.h2 && <h2 className="ta-c">{data.h2}</h2>}
            {data.p
              .split("\n")
              .map(line => (
                <p className="ta-c max-w-800px lh-30px m-auto">{line}</p>
              ))}
            <div className="max-w-800px w-100per m-auto column g-20px">
              <p className="ta-c max-w-800px lh-30px m-auto">
                In the meantime, check out these pages for answers to frequently
                asked questions.
              </p>
              <Link to="/pages/faq#glowskinz">
                <button className="btn primary w-100per">Glowskinz FAQ</button>
              </Link>
              <Link to="/pages/faq#diffuser_caps">
                <button className="btn primary w-100per">
                  Diffuser Caps FAQ
                </button>
              </Link>
              <Link to="/pages/faq#custom_products">
                <button className="btn primary w-100per">
                  Custom Products FAQ
                </button>
              </Link>
              <Link to="/pages/faq#featured_content">
                <button className="btn primary w-100per">
                  Featured Content FAQ
                </button>
              </Link>
              <Link to="/pages/faq#processing_shipping">
                <button className="btn primary w-100per">
                  Processing/Shipping FAQ
                </button>
              </Link>
              <Link to="/pages/faq#order_issues">
                <button className="btn primary w-100per">
                  Order Issues FAQ
                </button>
              </Link>
            </div>
            {data.id && <p className="ta-c title_font fs-20px">{data.id}</p>}

            {data.button_label && (
              <Link to={data.button_link} className="jc-c ">
                <button className="btn primary w-100per max-w-200px">
                  {data.button_label}
                </button>
              </Link>
            )}
            {type === "order" && (
              <div>
                {/* <h3 className="ta-c">Order Details</h3> */}
                <div className="jc-c m-auto wrap">
                  <Link
                    to={
                      userInfo && userInfo.hasOwnProperty("first_name") ? (
                        "/secure/account/order/" + props.match.params.id
                      ) : (
                        "/checkout/order/" + props.match.params.id
                      )
                    }
                  >
                    <button className="btn primary mh-10px">View Order</button>
                  </Link>
                  {userInfo &&
                  userInfo.hasOwnProperty("first_name") && (
                    <Link to="/secure/account/orders">
                      <button className="btn primary mh-10px">
                        Your Orders
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            )}
            <div className="jc-c">
              <img
                src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg"
                alt="heart_caps"
                className="br-20px w-100per max-w-800px m-10px"
              />
            </div>
            <div className="jc-c">
              <p className="max-w-800px mv-2rem lh-30px ta-c">
                {" "}
                If you have not recieved a confirmation email make sure to check
                your spam folder for the confirmation email. Please reach out
                with any questions or concerns to{" "}
                {process.env.REACT_APP_CONTACT_EMAIL}.
              </p>
            </div>
            <div className="jc-c ai-c m-auto wrap">
              <div>
                <h3 className="ta-c">Discover More of Your Glow</h3>
                <div className="jc-c m-auto wrap">
                  <Link to="/collections/all/products">
                    <button className="btn primary mh-10px">Products</button>
                  </Link>

                  <Link to="collections/all/features/category/glovers">
                    <button className="btn primary mh-10px">
                      Featured Videos
                    </button>
                  </Link>
                  <Link to="/collections/all/sponsors">
                    <button className="btn primary mh-10px">
                      Sponsored Glovers
                    </button>
                  </Link>
                  <Link to="/collections/all/teams">
                    <button className="btn primary mh-10px">
                      Sponsored Teams
                    </button>
                  </Link>
                  <Link to="/pages/music">
                    <button className="btn primary mh-10px">NTRE Music</button>
                  </Link>
                </div>
              </div>
            </div>
            {type === "order" && (
              <div
                id="myModal"
                style={{ display: show_modal ? "block" : "none" }}
                className="modal fade_in"
              >
                <div className="modal-content">
                  <span className="close" onClick={() => set_show_modal(false)}>
                    &times;
                  </span>
                  <Survey order_id={props.match.params.id} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default CompletePage;
