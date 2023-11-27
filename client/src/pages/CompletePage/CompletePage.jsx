import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import OrderComplete from "./components/OrderComplete";
import FeatureComplete from "./components/FeatureComplete";
import EmailComplete from "./components/EmailComplete";
import AffiliateComplete from "./components/AffiliateComplete";
import RegisterComplete from "./components/RegisterComplete";
import AccountCreatedComplete from "./components/AccountCreatedComplete";

const CompletePage = () => {
  const params = useParams();

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  return (
    <div>
      <div>
        <Helmet>
          <title>Complete | Glow LEDs</title>
          <meta property="og:title" content="Check Email" />
          <meta name="twitter:title" content="Check Email" />
          <link rel="canonical" href={`https://www.glow-leds.com//pages/complete/${params.type}`} />
          <meta property="og:url" content={`https://www.glow-leds.com//pages/complete/${params.type}`} />
        </Helmet>
        {params.type === "order" && <OrderComplete current_user={current_user} order_id={params.id} />}
        {params.type === "affiliate" && <AffiliateComplete current_user={current_user} />}
        {params.type === "email" && <EmailComplete current_user={current_user} />}
        {params.type === "feature" && <FeatureComplete current_user={current_user} />}
        {params.type === "registered" && <RegisterComplete current_user={current_user} />}
        {params.type === "account_created" && <AccountCreatedComplete current_user={current_user} />}
      </div>
    </div>
  );
};
export default CompletePage;
