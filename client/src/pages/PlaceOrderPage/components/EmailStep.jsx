import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validate_login } from "../../../utils/validations";
import useWindowDimensions from "../../../shared/Hooks/useWindowDimensions";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";
import { setEmailValidations, set_is_guest, showHideSteps, nextStep } from "../placeOrderSlice";
import { isMobile } from "react-device-detect";
import { save_shipping } from "../../../slices/cartSlice";
import { openLoginModal } from "../../../slices/userSlice";

const EmailStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartPage = useSelector(state => state.carts.cartPage);
  const { shipping } = cartPage;

  const placeOrder = useSelector(state => state.placeOrder);
  const { show_email, is_guest, email_completed, password, email_validations, email } = placeOrder;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  // useEffect(() => {
  //   if (current_user && current_user.hasOwnProperty("first_name")) {
  //     navigate("/secure/checkout/placeorder");
  //   }
  // }, [current_user]);

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
          ) : (
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
                  onClick={() => {
                    dispatch(openLoginModal());
                    dispatch(set_is_guest(is_guest ? false : true));
                  }}
                >
                  Login
                </GLButton>
              </pre>

              <GLButton variant="primary" className="bob" onClick={e => validate_email(e)}>
                Continue
              </GLButton>
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
