import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { validate_registration } from "../../utils/validations";
import { Helmet } from "react-helmet";
import { Loading } from "../../shared/SharedComponents";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLInput from "../../shared/GlowLEDsComponents/GLInput/GLInput";
import * as API from "../../api";
import { set_success } from "../../slices/userSlice";

const RegisterPage = props => {
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [first_name_validations, setFirstNameValidations] = useState("");
  const [last_name_validations, setLastNameValidations] = useState("");
  const [email_validations, setEmailValidations] = useState("");
  const [password_validations, setPasswordValidations] = useState("");
  const [re_password_validations, setRePasswordValidations] = useState("");

  const userPage = useSelector(state => state.users.userPage);
  const { loading, current_user, error, success } = userPage;

  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

  const submitHandler = e => {
    e.preventDefault();
    const data = { first_name, last_name, email, password, rePassword };
    const request = validate_registration(data);

    setFirstNameValidations(request.errors.first_name);
    setLastNameValidations(request.errors.last_name);
    setEmailValidations(request.errors.email);
    setPasswordValidations(request.errors.password);
    setRePasswordValidations(request.errors.rePassword);

    if (request.isValid) {
      dispatch(
        API.registerUser({
          first_name,
          last_name,
          email: email.toLowerCase(),
          password,
          rePassword,
        })
      );
      // dispatch(registerUser(first_name, last_name, email, password, rePassword));
      // props.navigate('/account/login');
    }
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (success) {
        props.navigate("/account/login");
        dispatch(set_success(false));
      }
    }
    return () => (clean = false);
  }, [success]);

  return (
    <div className="form">
      <Helmet>
        <title>Register | Glow LEDs</title>
        <meta property="og:title" content="Register" />
        <meta name="twitter:title" content="Register" />
        <link rel="canonical" href="https://www.glow-leds.com/account/register" />
        <meta property="og:url" content="https://www.glow-leds.com/account/register" />
        <meta
          name="description"
          content="In order to reap all of the benefits of the Diffuser Caps and other LED accessories at Glow-LEDs.com you must first create a uesr account."
        />
        <meta
          property="og:description"
          content="In order to reap all of the benefits of the Diffuser Caps and other LED accessories at Glow-LEDs.com you must first create a uesr account."
        />
        <meta
          name="twitter:description"
          content="In order to reap all of the benefits of the Diffuser Caps and other LED accessories at Glow-LEDs.com you must first create a uesr account."
        />
      </Helmet>
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h1 className="ta-c fs-24px">Create Account</h1>
          </li>
          <Loading loading={loading} error={error} />
          <li>
            <GLInput
              label="First Name"
              name="first_name"
              id="first_name"
              type="text"
              value={first_name}
              onChange={e => set_first_name(e.target.value)}
              error={first_name_validations}
              helperText={first_name_validations}
            />
          </li>
          <li>
            <GLInput
              label="Last Name"
              name="last_name"
              id="last_name"
              type="text"
              value={last_name}
              onChange={e => set_last_name(e.target.value)}
              error={last_name_validations}
              helperText={last_name_validations}
            />
          </li>
          <li>
            <GLInput
              label="Email"
              name="email"
              id="email"
              type="text"
              value={email}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={password_validations}
              helperText={password_validations}
            />
          </li>
          <li>
            <GLInput
              label="Re-Enter Password"
              name="re_password"
              id="re_password"
              type="password"
              value={rePassword}
              onChange={e => setRePassword(e.target.value)}
              error={re_password_validations}
              helperText={re_password_validations}
            />
          </li>
          <li>
            <GLButton type="submit" variant="primary">
              Register
            </GLButton>
          </li>
          <li>
            <div className="ta-c">Already have an account?</div>
            <Link to={"/account/login"}>
              <GLButton type="submit" variant="secondary" className="mt-10px ta-c w-100per">
                Login
              </GLButton>
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};
export default RegisterPage;
