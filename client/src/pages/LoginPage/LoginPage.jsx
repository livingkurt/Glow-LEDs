import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import { validate_login } from "../../utils/validations";
import { Helmet } from "react-helmet";
import { Loading } from "../../shared/SharedComponents";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLInput from "../../shared/GlowLEDsComponents/GLInput/GLInput";
import * as API from "../../api";

const LoginPage = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [email_validations, setEmailValidations] = useState("");
  const [password_validations, setPasswordValidations] = useState("");
  const [loading, set_loading] = useState(false);

  const userSlice = useSelector(state => state.userSlice);
  const { loading: user_loading, current_user, error } = userSlice;
  // const errors = useSelector((state) => state.errors);
  //

  // const { loading, current_user, error } = errors;
  //
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (current_user && current_user.hasOwnProperty("first_name")) {
        props.history.push(redirect);
      }
    }
    return () => (clean = false);
  }, [current_user, props.history, redirect]);

  setTimeout(() => {
    set_loading(false);
  }, 3000);

  const submitHandler = e => {
    e.preventDefault();
    const data = { email, password };
    const request = validate_login(data);

    setEmailValidations(request.errors.email);
    setPasswordValidations(request.errors.password);

    if (request.isValid) {
      dispatch(API.loginUser({ email: email.toLowerCase(), password }));
      //
      set_loading(user_loading);
      // dispatch(loginUser(email, password));
    }
  };

  return (
    <div className="form">
      <Helmet>
        <title>Login | Glow LEDs</title>
        <meta property="og:title" content="Login" />
        <meta name="twitter:title" content="Login" />
        <link rel="canonical" href="https://www.glow-leds.com/account/login" />
        <meta property="og:url" content="https://www.glow-leds.com/account/login" />
        <meta
          name="description"
          content="Come in the LEDs are fine. Come into our Glowing realm of wonderfulness. Where you just might find what you have been missing."
        />
        <meta
          property="og:description"
          content="Come in the LEDs are fine. Come into our Glowing realm of wonderfulness. Where you just might find what you have been missing."
        />
        <meta
          name="twitter:description"
          content="Come in the LEDs are fine. Come into our Glowing realm of wonderfulness. Where you just might find what you have been missing."
        />
      </Helmet>

      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li style={{ display: "flex", flexDirection: "column" }}>
            <h1>Login </h1>
          </li>
          <div className="mb-10px">
            <Loading loading={loading} error={error} />
          </div>
          <li>
            <GLInput
              label="Email"
              name="email"
              id="email"
              type="text"
              onChange={e => setEmail(e.target.value.toLowerCase())}
              error={email_validations}
              helperText={email_validations}
              inputProps={{ style: { textTransform: "lowercase" } }}
            />
          </li>
          <li>
            <GLInput
              label="Password"
              name="password"
              id="password"
              type="password"
              onChange={e => setPassword(e.target.value)}
              error={password_validations}
              helperText={password_validations}
            />
          </li>
          <li>
            <GLButton type="submit" variant="primary">
              Login
            </GLButton>
          </li>
          <li>
            <Link to="/account/passwordreset">
              <GLButton variant="secondary" className="w-100per">
                Forgot Password?
              </GLButton>
            </Link>
          </li>
          <li>New to Glow LEDs?</li>
          <li>
            <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect}>
              <GLButton variant="primary" className="ta-c w-100per">
                Create Account
              </GLButton>
            </Link>
          </li>
          {/* <li style={{ marginBottom: '-20px' }}>
							<Link
								to={redirect === '/' ? 'register' : 'register?redirect=' + redirect}
								variant="secondary" className="ta-c"
							>
								New User
							</Link>
						</li> */}
        </ul>
      </form>
    </div>
  );
};
export default LoginPage;
