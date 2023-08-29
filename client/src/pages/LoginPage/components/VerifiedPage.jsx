import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../../shared/SharedComponents";
import { Helmet } from "react-helmet";

const VerifiedPage = () => {
  const userPage = useSelector(state => state.users.userPage);
  const { loading, current_user, error } = userPage;

  return (
    <div className="column jc-c">
      <Helmet>
        <title>Verified | Glow LEDs</title>
        <meta property="og:title" content="Verified" />
        <meta name="twitter:title" content="Verified" />
        <link rel="canonical" href="https://www.glow-leds.com/account/verified" />
        <meta property="og:url" content="https://www.glow-leds.com/account/verified" />
      </Helmet>
      <h1 style={{ textAlign: "center" }}>Thank You for Verifing your Account.</h1>
      <h2 style={{ textAlign: "center" }}>You will be redirected to the login screen shortly.</h2>
      <div className="jc-c">
        <Loading loading={loading} error={error} />
      </div>
    </div>
  );
};
export default VerifiedPage;
