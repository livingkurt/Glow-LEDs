import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validate_login } from "../../../utils/validations";
import useWindowDimensions from "../../../shared/Hooks/windowDimensions";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";
import {
  setEmailValidations,
  setPasswordValidations,
  set_email,
  set_password,
  set_is_guest,
  showHideSteps,
  nextStep,
} from "../placeOrderSlice";
import { isMobile } from "react-device-detect";
import { save_shipping } from "../../../slices/cartSlice";

const EmailStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartPage = useSelector(state => state.carts.cartPage);
  const { shipping } = cartPage;

  const placeOrder = useSelector(state => state.placeOrder);
  const { show_email, is_guest, email_completed, password, email_validations, email } = placeOrder;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const submit_login = e => {
    e.preventDefault();
    const data = { email, password };
    const request = validate_login(data);

    dispatch(setEmailValidations(request.errors.email));
    dispatch(setPasswordValidations(request.errors.password));
    if (request.isValid) {
      dispatch(API.loginUser({ email: email.toLowerCase(), password }));
    }
  };
  const submit_logout = e => {
    e.preventDefault();
    const refreshToken = localStorage.getItem("refreshToken");
    navigate("/checkout/placeorder");
    dispatch(API.logoutUser(refreshToken));
  };

  const { width } = useWindowDimensions();

  const next_step = step => {
    dispatch(nextStep(step));

    if (step === "shipping" && email.length === 0) {
      dispatch(setEmailValidations("Email Field Empty"));
    }

    if (isMobile) {
      const scrollTo = step === "shipping" ? 340 : 560;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  };
  const validate_email = e => {
    const request = validate_login({ email: shipping.email });
    dispatch(setEmailValidations(request.errors.email));
    if (!request.errors.email) {
      next_step("shipping");
      dispatch(setEmailValidations(""));
    }
  };

  return (
    <div>
      <div className="jc-b">
        <h2>1. Email</h2>
        {email_completed && !show_email && (
          <GLButton variant="secondary" className="mv-10px" onClick={() => dispatch(showHideSteps("email"))}>
            Edit
          </GLButton>
        )}
      </div>
      {show_email ? (
        <div className="w-100per">
          {current_user && current_user.hasOwnProperty("first_name") ? (
            <div>
              <ul className={`shipping-container mv-0px pv-0px ${width > 400 ? "ph-2rem" : "p-0px"}`}>
                <li>
                  <pre className={`phrase_font fs-14px mv-0px mt-10px ${width < 400 ? "ta-c" : ""}`}>
                    Signed in with {current_user.email} {"\n"}
                    {"\n"}Not you?
                    <GLButton variant="primary" className="title_font m-10px" onClick={e => submit_logout(e)}>
                      Logout
                    </GLButton>
                  </pre>
                </li>
                <li className="mv-0px">
                  <GLButton variant="primary" className="w-100per bob" onClick={() => next_step("shipping")}>
                    Continue
                  </GLButton>
                </li>
              </ul>
            </div>
          ) : is_guest ? (
            <ul className={`shipping-container mv-0px pv-0px ${width > 400 ? "ph-2rem" : "p-0px"}`}>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  value={shipping.email}
                  name="email"
                  id="email"
                  onChange={e => dispatch(save_shipping({ email: e.target.value.toLowerCase() }))}
                />
              </li>
              <label
                className="validation_text"
                style={{
                  justifyContent: "center",
                }}
              >
                {email_validations}
              </label>
              <pre className={`phrase_font fs-14px mv-0px mt-10px ${width < 400 ? "ta-c" : ""}`}>
                You'll recieve receipts and notifications at this email address.{"\n"}
                {"\n"}Already have an account?
                <GLButton
                  variant="primary"
                  className="title_font m-10px"
                  onClick={() => dispatch(set_is_guest(is_guest ? false : true))}
                >
                  Login
                </GLButton>
              </pre>

              <GLButton variant="primary" className="bob" onClick={e => validate_email(e)}>
                Continue
              </GLButton>
            </ul>
          ) : (
            <ul className={`shipping-container mv-0px pv-0px ${width > 400 ? "ph-2rem" : "p-0px"}`}>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  value={email}
                  name="email"
                  id="email"
                  onChange={e => dispatch(set_email(e.target.value.toLowerCase()))}
                />
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  name="password"
                  id="password"
                  onChange={e => dispatch(set_password(e.target.value))}
                />
              </li>
              <pre className={`phrase_font fs-14px mv-0px mt-10px ${width < 400 ? "ta-c" : ""}`}>
                Don't have an account?{" "}
                <GLButton
                  variant="primary"
                  className="title_font m-10px"
                  onClick={() => dispatch(set_is_guest(is_guest => (is_guest ? false : true)))}
                >
                  Continue as Guest
                </GLButton>
              </pre>
              <li>
                <GLButton variant="primary" className="bob m-10px" onClick={e => submit_login(e)}>
                  Login
                </GLButton>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className="wrap jc-b w-100per">
          <div className="paragraph_font lh-25px">
            <div>{shipping.email.toLowerCase()}</div>
          </div>
        </div>
      )}
      {width < 400 && <hr />}
    </div>
  );
};
export default EmailStep;
