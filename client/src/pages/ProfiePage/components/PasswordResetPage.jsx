import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";

const PasswordResetPublicPage = props => {
  const [email, setEmail] = useState("");
  const userPage = useSelector(state => state.users.userPage);
  const { loading, current_user, error } = userPage;
  const dispatch = useDispatch();

  const [words, setWords] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    dispatch(API.resetPassword(email));
    setWords("Check your Email to Change your Password");
    // props.navigate(redirect);
  };
  return (
    <div className="form">
      <Helmet>
        <title>Password Reset | Glow LEDs</title>
        <meta property="og:title" content="Password Reset" />
        <meta name="twitter:title" content="Password Reset" />
        <link rel="canonical" href="https://www.glow-leds.com/account/passwordreset" />
        <meta property="og:url" content="https://www.glow-leds.com/account/passwordreset" />
      </Helmet>
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            {/* <h2>Login</h2> */}
            <h1>Password Reset</h1>
          </li>
          <li>
            <Loading loading={loading} error={error}>
              {words && <h3 style={{ textAlign: "center" }}>{words}</h3>}
            </Loading>
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
          </li>

          <li>
            <GLButton type="submit" variant="primary">
              Verify Email
            </GLButton>
          </li>
        </ul>
      </form>
    </div>
  );
};
export default PasswordResetPublicPage;
