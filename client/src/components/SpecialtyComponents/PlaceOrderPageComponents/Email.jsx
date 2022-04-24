import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../actions/userActions";
import { validate_login } from "../../../utils/validations";
import useWindowDimensions from "../../Hooks/windowDimensions";
export function Email({
  email_completed,
  show_email,
  show_hide_steps,
  next_step,
  is_guest,
  email,
  set_email,
  email_validations,
  setEmailValidations,
  setPasswordValidations,
  set_is_guest,
  password,
  set_password,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const submit_login = e => {
    e.preventDefault();
    const data = { email, password };
    const request = validate_login(data);

    setEmailValidations(request.errors.email);
    setPasswordValidations(request.errors.password);
    if (request.isValid) {
      dispatch(login({ email: email.toLowerCase(), password }));
    }
  };
  const submit_logout = e => {
    e.preventDefault();
    dispatch(logout(userInfo.refresh_token));
    history.push("/checkout/placeorder");
  };

  const { width } = useWindowDimensions;

  return (
    <div>
      <div className="jc-b">
        <h2>1. Email</h2>
        {email_completed &&
        !show_email && (
          <button
            className="btn secondary mv-10px"
            onClick={() => show_hide_steps("email")}
          >
            Edit
          </button>
        )}
      </div>
      {show_email ? (
        <div className="w-100per">
          {userInfo && userInfo.hasOwnProperty("first_name") ? (
            <div>
              <ul
                className={`shipping-container mv-0px pv-0px ${width > 400
                  ? "ph-2rem"
                  : "p-0px"}`}
              >
                <li>
                  <pre className="phrase_font  mv-0px">
                    Signed in with {userInfo.email} {"\n"}Not you?
                    <button
                      className="btn nav title_font m-10px"
                      onClick={e => submit_logout(e)}
                    >
                      Logout
                    </button>
                  </pre>
                </li>
                <li className="mv-0px">
                  <button
                    className="btn primary w-100per bob"
                    onClick={() => next_step("shipping")}
                  >
                    Continue
                  </button>
                </li>
              </ul>
            </div>
          ) : is_guest ? (
            <ul
              className={`shipping-container mv-0px pv-0px ${width > 400
                ? "ph-2rem"
                : "p-0px"}`}
            >
              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  value={email}
                  name="email"
                  id="email"
                  onChange={e => set_email(e.target.value)}
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
              <pre className="phrase_font mv-0px mt-10px">
                You'll recieve receipts and notifications at this email address.{"\n"}Already
                have an account?{" "}
                <button
                  className="btn nav title_font mb-15px"
                  onClick={() =>
                    set_is_guest(is_guest => (is_guest ? false : true))}
                >
                  Login
                </button>
              </pre>

              <button
                className="btn primary bob"
                onClick={() => next_step("shipping")}
              >
                Continue
              </button>
            </ul>
          ) : (
            <ul
              className={`shipping-container mv-0px pv-0px ${width > 400
                ? "ph-2rem"
                : "p-0px"}`}
            >
              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  value={email}
                  name="email"
                  id="email"
                  onChange={e => set_email(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  name="password"
                  id="password"
                  onChange={e => set_password(e.target.value)}
                />
              </li>
              <pre className="phrase_font mv-0px">
                Don't have an account?{" "}
                <button
                  className="btn nav title_font mb-15px"
                  onClick={() =>
                    set_is_guest(is_guest => (is_guest ? false : true))}
                >
                  Continue as Guest
                </button>
              </pre>
              <li>
                <button
                  className="btn primary bob"
                  onClick={e => submit_login(e)}
                >
                  {/* <button className="btn primary" onClick={() => next_step('shipping')}> */}
                  Continue
                </button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className="wrap jc-b w-100per">
          <div className="paragraph_font lh-25px">
            <div>{email}</div>
          </div>
        </div>
      )}
    </div>
  );
}
