import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { API_Affiliates, API_Emails, API_Features } from "../../utils";
import { GLButton } from "../../shared/GlowLEDsComponents";
import OrderComplete from "./components/OrderComplete";
import FeatureComplete from "./components/FeatureComplete";
import EmailComplete from "./components/EmailComplete";
import AffiliateComplete from "./components/AffiliateComplete";
import config from "../../config";
import RegisterComplete from "./components/RegisterComplete";
import * as API from "../../api";
import { useDispatch } from "react-redux";
import AccountCreatedComplete from "./components/AccountCreatedComplete";

const CompletePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [data, set_data] = useState();

  const userPage = useSelector(state => state.users.userPage);
  const { current_user, email, password } = userPage;

  const orderPage = useSelector(state => state.orders.orderPage);
  const { order } = orderPage;

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
    if (params.type === "order") {
      set_data({
        title: "Order Complete",
        id: "Order ID: " + params.id,
        h1: "Thank you for your order!",
        h2: "What to expect",
        p: `You will be receiving a confirmation email with your order details shortly.\n

        All of our products are handmade and made to order! 💙  \n

        Processing time is usually 3-10 business days.\n

        Standard shipping time is 1-5 business days after processing is complete. \n
        `,
        button_label: "",
        button_link: "",
        link: "https://www.glow-leds.com/pages/complete/order",
      });
    } else if (params.type === "affiliate") {
      set_data({
        title: "Affiliate Sign Up Complete",
        h1: "Thank you for Applying!",
        h2: "",
        p: "You will be recieving a conformation email with your affiliate details",
        button_label: "",
        button_link: "",
        link: "https://www.glow-leds.com/pages/complete/affiliate",
      });
    } else if (params.type === "email") {
      set_data({
        title: "Email Sent Successfully!",
        h1: "Thank You for Contacting Glow LEDs",
        h2: "",
        p: "We'll answer your questions or requests as soon as possible.",
        button_label: "",
        button_link: "",
        link: "/pages/faq",
      });
    } else if (params.type === "feature") {
      set_data({
        title: "Feature Sign Up Complete",
        h1: "Thank you for sending us your art!",
        h2: "",
        p: "You will be recieving a conformation email with your affiliate details",
        button_label: "",
        button_link: "",
        link: "https://www.glow-leds.com/pages/complete/affiliate",
      });
    } else if (params.type === "registered") {
      // 2. Add new condition
      set_data({
        title: "You're almost there!",
        h1: "Please check your email for verification link",
        h2: "",
        p: "",
        button_label: "",
        button_link: "",
        link: "https://www.glow-leds.com/pages/complete/register",
      });
    } else if (params.type === "account_created") {
      // 2. Add new condition
      set_data({
        title: "You're almost there!",
        h1: "Please check your email for verification link",
        h2: "",
        p: "",
        button_label: "",
        button_link: "",
        link: "https://www.glow-leds.com/pages/complete/register",
      });
    }
  };

  const send_email = async () => {
    if (params.type === "affiliate") {
      const { data: affiliate } = await API_Affiliates.findByPathname_affiliates_a(params.id);
      dispatch(
        API.sendAffiliateEmail({
          affiliate,
          subject: "Welcome to the Team!",
          email: affiliate.user.email,
        })
      );
      dispatch(
        API.sendAffiliateEmail({
          affiliate,
          subject: "New Affiliate Created by " + affiliate.artist_name,
          email: config.REACT_APP_INFO_EMAIL,
        })
      );
    } else if (params.type === "feature") {
      const { data: feature } = await API_Features.findById_features_a(params.id);
      dispatch(
        API.sendFeatureEmail({
          feature,
          subject: "Your Glow LEDs Feature",
          email: feature.user.email,
        })
      );
      dispatch(
        API.sendFeatureEmail({
          feature,
          subject: "New Feature Created by " + feature.artist_name,
          email: config.REACT_APP_INFO_EMAIL,
        })
      );
    } else if (params.type === "account_created") {
      dispatch(
        API.verifyUser({
          token: params.id,
        })
      );
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
          {current_user?.isAdmin && (
            <div className="jc-b mb-1rem">
              <Link to="/secure/glow/emails">
                <GLButton variant="primary" className="mh-10px">
                  Back to Emails
                </GLButton>
              </Link>
              <Link to={location?.state?.prevPath || "/secure/glow/orders"}>
                <GLButton variant="primary" className="mh-10px">
                  Back to Orders
                </GLButton>
              </Link>

              <GLButton variant="primary" className="mb-1rem" onClick={() => send_email()}>
                Send Email
              </GLButton>
            </div>
          )}
          {params.type === "order" && <OrderComplete current_user={current_user} order_id={params.id} />}
          {params.type === "affiliate" && <AffiliateComplete current_user={current_user} />}
          {params.type === "email" && <EmailComplete current_user={current_user} />}
          {params.type === "feature" && <FeatureComplete current_user={current_user} />}
          {params.type === "registered" && <RegisterComplete current_user={current_user} />}
          {params.type === "account_created" && <AccountCreatedComplete current_user={current_user} />}
        </div>
      )}
    </div>
  );
};
export default CompletePage;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import OrderComplete from "./components/OrderComplete";
// import FeatureComplete from "./components/FeatureComplete";
// import EmailComplete from "./components/EmailComplete";
// import config from "../../config";
// import AffiliateComplete from "./components/AffiliateComplete";
// import RegisterComplete from "./components/RegisterComplete";
// import AccountCreatedComplete from "./components/AccountCreatedComplete";
// import * as API from "../../api";

// const CompletePage = () => {
//   const params = useParams();
//   const dispatch = useDispatch();

//   const userPage = useSelector(state => state.users.userPage);
//   const { current_user } = userPage;

//   const orderPage = useSelector(state => state.orders.orderPage);
//   const { order } = orderPage;

//   useEffect(() => {
//     let clean = true;
//     if (clean) {
//       send_email();
//     }
//     return () => {
//       clean = false;
//     };
//   }, []);

//   const send_email = async () => {
//     if (config.NODE_ENV === "development" || config.NODE_ENV === "staging") return;

//     if (params.type === "order") {
//       dispatch(
//         API.sendOrderEmail({
//           order,
//           subject: "Thank you for your Glow LEDs Order",
//           email: order.shipping.email,
//         })
//       );
//       dispatch(
//         API.sendOrderEmail({
//           order,
//           subject: "New Order Created by " + order.shipping.first_name,
//           email: config.REACT_APP_INFO_EMAIL,
//         })
//       );
//     } else if (params.type === "account_created") {
//       dispatch(
//         API.verifyUser({
//           token: params.id,
//         })
//       );
//     }
//   };

//   return (
//     <div>
//       <div>
//         <Helmet>
//           <title>Complete | Glow LEDs</title>
//           <meta property="og:title" content="Check Email" />
//           <meta name="twitter:title" content="Check Email" />
//           <link rel="canonical" href={`https://www.glow-leds.com/pages/complete/${params.type}`} />
//           <meta property="og:url" content={`https://www.glow-leds.com/pages/complete/${params.type}`} />
//         </Helmet>
//         {params.type === "order" && <OrderComplete current_user={current_user} order_id={params.id} />}
//         {params.type === "affiliate" && <AffiliateComplete current_user={current_user} />}
//         {params.type === "email" && <EmailComplete current_user={current_user} />}
//         {params.type === "feature" && <FeatureComplete current_user={current_user} />}
//         {params.type === "registered" && <RegisterComplete current_user={current_user} />}
//         {params.type === "account_created" && <AccountCreatedComplete current_user={current_user} />}
//       </div>
//     </div>
//   );
// };
// export default CompletePage;
