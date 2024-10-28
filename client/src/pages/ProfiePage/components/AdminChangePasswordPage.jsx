import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";

const AdminChangePasswordPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const dispatch = useDispatch();

  const [password_validations, setPasswordValidations] = useState("");
  const [re_password_validations, setRePasswordValidations] = useState("");

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const submitHandler = async e => {
    e.preventDefault();
    dispatch(API.resetPassword({ userId: params.id, password, rePassword }));
    navigate("/secure/glow/userprofile/" + params.id);
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (current_user) {
        setPassword(current_user.password);
      }
      dispatch(API.listOrders({ user: current_user._id }));
    }
    return () => (clean = false);
  }, [current_user, dispatch]);

  return (
    <div className="profile_container column p-20px">
      <Helmet>
        <title>{"Change Password | Glow LEDs"}</title>
        <meta property="og:title" content="Change Password" />
        <meta name="twitter:title" content="Change Password" />
        <link rel="canonical" href="https://www.glow-leds.com/secure/account/change_password" />
        <meta property="og:url" content="https://www.glow-leds.com/secure/account/change_password" />
      </Helmet>
      <div className="mb-10px">
        <GLButton variant="secondary" onClick={() => navigate(-1)}>
          {"Back to Profile"}
        </GLButton>
      </div>
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler} style={{ width: "100%" }}>
            <ul className="form-container">
              <li>
                <h1 style={{ textAlign: "center" }}>{"Change Password"}</h1>
              </li>
              <li>
                <label htmlFor="password">{"Password"}</label>
                <input
                  className="form_input"
                  type="password"
                  id="password"
                  name="password"
                  onChange={e => setPassword(e.target.value)}
                />
              </li>
              <label className="validation_text" style={{ fontSize: 16, justifyContent: "center" }}>
                {password_validations}
              </label>
              <li>
                <label htmlFor="rePassword">{"Re-Enter Password"}</label>
                <input
                  className="form_input"
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  onChange={e => setRePassword(e.target.value)}
                />
              </li>
              <label className="validation_text" style={{ fontSize: 16, justifyContent: "center" }}>
                {re_password_validations}
              </label>
              <li>
                <GLButton type="submit" variant="primary">
                  {"Update"}
                </GLButton>
              </li>
              <li>
                <Link to="/secure/account/profile">
                  <GLButton type="button" variant="secondary" className="w-100per">
                    {"Cancel"}
                  </GLButton>
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminChangePasswordPage;
