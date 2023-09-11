import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { openLoginModal } from "../../../slices/userSlice";

const ResetPasswordPage = () => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(API.passwordReset({ user_id: params.id, password, rePassword }));
    dispatch(openLoginModal());
  };
  return (
    <div className="form">
      <Helmet>
        <title>Reset Password | Glow LEDs</title>
        <meta property="og:title" content="Reset Password" />
        <meta name="twitter:title" content="Reset Password" />
        <link rel="canonical" href="https://www.glow-leds.com/account/resetpassword" />
        <meta property="og:url" content="https://www.glow-leds.com/account/resetpassword" />
      </Helmet>
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <div className="row">
              <h1 style={{ width: "100%" }}>Reset Password</h1>{" "}
            </div>
          </li>
          <li />
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} />
          </li>
          <li>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input type="password" id="rePassword" name="rePassword" onChange={e => setRePassword(e.target.value)} />
          </li>
          <li>
            <GLButton type="submit" variant="primary">
              Reset Password
            </GLButton>
          </li>
        </ul>
      </form>
    </div>
  );
};
export default ResetPasswordPage;
