import * as React from "react";
import { Helmet } from "react-helmet";
import config from "../../../config";
import * as API from "../../../api";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const RegisterComplete = ({ current_user }) => {
  const dispatch = useDispatch();
  const userPage = useSelector(state => state.users.userPage);
  const { email } = userPage;

  return (
    <div className="column jc-c">
      <Helmet>
        <title>Almost There | Glow LEDs</title>
        <meta property="og:title" content="Almost There" />
        <meta name="twitter:title" content="Almost There" />
        <link rel="canonical" href={"https://www.glow-leds.com/pages/complete/email-verified"} />
        <meta property="og:url" content={"https://www.glow-leds.com/pages/complete/email-verified"} />
      </Helmet>
      <h2 className="ta-c">Thank you for registering at Glow-LEDs.com!</h2>
      <p className="ta-c max-w-800px lh-30px m-auto">
        You're almost done! Please check your email for verification link.
      </p>

      <div className="jc-c">
        <img
          src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg" // Update this URL as needed
          alt="email_verified"
          className="br-20px w-100per max-w-800px m-10px"
        />
      </div>
      <div className="jc-c">
        <p className="max-w-800px mv-2rem lh-30px ta-c">
          If you haven't received a confirmation email, please check your spam folder. If you still can't find it, click
          <GLButton
            variant="primary"
            className="mh-10px"
            onClick={() => dispatch(API.resendVerification({ email: email.toLowerCase() }))}
          >
            Resend Verification Email
          </GLButton>
        </p>
      </div>
      <div className="jc-c"></div>
      <div className="jc-c">
        <p className="max-w-800px mv-2rem lh-30px ta-c">
          If you have any questions or concerns, please reach out to {config.REACT_APP_CONTACT_EMAIL}.
        </p>
      </div>
    </div>
  );
};

export default RegisterComplete;
