import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { API_Affiliates, API_Emails, API_Features } from "../../utils";
import { GLButton } from "../../shared/GlowLEDsComponents";
import OrderComplete from "./components/OrderComplete";
import FeatureComplete from "./components/FeatureComplete";
import EmailComplete from "./components/EmailComplete";
import AffiliateComplete from "./components/AffiliateComplete";
import { isAdmin } from "../../utils/helpers/user_helpers";

const CompletePage = props => {
  const [data, set_data] = useState();

  const userSlice = useSelector(state => state.userSlice);
  const { current_user } = userSlice;

  const orderSlice = useSelector(state => state.orderSlice);
  const { order } = orderSlice;

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
        h2: "What to expect",
        p: `You will be receiving a confirmation email with your order details shortly.\n

        All of our products are handmade and made to order! 💙  \n

        Processing time is usually 3-10 business days.\n

        Standard shipping time is 1-5 business days after processing is complete. \n
        `,
        button_label: "",
        button_link: "",
        link: "https://www.glow-leds.com/pages/complete/order"
      });
    } else if (props.match.params.type === "affiliate") {
      set_data({
        title: "Affiliate Sign Up Complete",
        h1: "Thank you for Applying!",
        h2: "",
        p: "You will be recieving a conformation email with your affiliate details",
        button_label: "",
        button_link: "",
        link: "https://www.glow-leds.com/pages/complete/affiliate"
      });
    } else if (props.match.params.type === "email") {
      set_data({
        title: "Email Sent Successfully!",
        h1: "Thank You for Contacting Glow LEDs",
        h2: "",
        p: "We'll answer your questions or requests as soon as possible.",
        button_label: "",
        button_link: "",
        link: "/pages/faq"
      });
    } else if (props.match.params.type === "feature") {
      set_data({
        title: "Feature Sign Up Complete",
        h1: "Thank you for sending us your art!",
        h2: "",
        p: "You will be recieving a conformation email with your affiliate details",
        button_label: "",
        button_link: "",
        link: "https://www.glow-leds.com/pages/complete/affiliate"
      });
    }
  };

  const send_email = async () => {
    if (props.match.params.type === "order") {
      await API_Emails.send_order_email(order, "Thank you for your Glow LEDs Order", order.shipping.email);
      await API_Emails.send_order_email(order, "New Order Created by " + order.shipping.first_name, process.env.REACT_APP_INFO_EMAIL);

      if (order.orderItems.some(item => item.category === "custom")) {
        await API_Emails.send_custom_contact_email(order, order.shipping.email);
      }
    } else if (props.match.params.type === "affiliate") {
      const { data: affiliate } = await API_Affiliates.findByPathname_affiliates_a(props.match.params.id);
      await API_Emails.send_affiliate_email(affiliate, "Welcome to the Team!", affiliate.user.email);
      await API_Emails.send_affiliate_email(
        affiliate,
        "New Affiliate Created by " + affiliate.artist_name,
        process.env.REACT_APP_INFO_EMAIL
      );
    } else if (props.match.params.type === "feature") {
      const { data: feature } = await API_Features.findById_features_a(props.match.params.id);
      await API_Emails.send_feature_email(feature, "Your Glow LEDs Feature", feature.user.email);
      await API_Emails.send_feature_email(feature, "New Feature Created by " + feature.artist_name, process.env.REACT_APP_INFO_EMAIL);
    }
  };

  // const [show_modal, set_show_modal] = useState(false);

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
          {isAdmin(current_user) && (
            <div className="jc-b mb-1rem">
              <Link to="/secure/glow/emails">
                <GLButton variant="primary" className="mh-10px">
                  Back to Emails
                </GLButton>
              </Link>
              <Link to={props.location.previous_path || "/secure/glow/orders?page=1?limit=10"}>
                <GLButton variant="primary" className="mh-10px">
                  Back to Orders
                </GLButton>
              </Link>

              <GLButton variant="primary" className="mb-1rem" onClick={() => send_email()}>
                Send Email
              </GLButton>
            </div>
          )}

          {props.match.params.type === "order" && <OrderComplete current_user={current_user} order_id={props.match.params.id} />}
          {props.match.params.type === "affiliate" && <AffiliateComplete current_user={current_user} />}
          {props.match.params.type === "email" && <EmailComplete current_user={current_user} />}
          {props.match.params.type === "feature" && <FeatureComplete current_user={current_user} />}
        </div>
      )}
    </div>
  );
};
export default CompletePage;
