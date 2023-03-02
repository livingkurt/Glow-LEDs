import React from "react";
import { Helmet } from "react-helmet";

const AffiliateComplete = ({ current_user, order_id }) => {
  return (
    <div className="column jc-c">
      <Helmet>
        <title>Affiliate Complete | Glow LEDs</title>
        <meta property="og:title" content="Check Email" />
        <meta name="twitter:title" content="Check Email" />
        <link rel="canonical" href={"https://www.glow-leds.com/pages/complete/order"} />
        <meta property="og:url" content={"https://www.glow-leds.com/pages/complete/order"} />
      </Helmet>
      <h2 className="ta-c">Affiliate Sign Up Complete!</h2>
      <p className="ta-c max-w-800px lh-30px m-auto">Thank you for Applying!</p>

      <p className="ta-c max-w-800px lh-30px m-auto">You will be recieving a conformation email with your affiliate details </p>

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
    </div>
  );
};

export default AffiliateComplete;
