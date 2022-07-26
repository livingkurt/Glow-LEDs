import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../actions/userActions";
import { validate_registration } from "../../utils/validations";
import { Helmet } from "react-helmet";
import { Loading } from "../../components/UtilityComponents";
import { GLButton } from "../../components/GlowLEDsComponents";

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

  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  console.log({ error });
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
    console.log(request);
    console.log(request.errors.email);
    if (request.isValid) {
      dispatch(
        register({
          first_name,
          last_name,
          email: email.toLowerCase(),
          password,
          rePassword
        })
      );
      // dispatch(registerUser(first_name, last_name, email, password, rePassword));
      // props.history.push('/account/login');
    }
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (userInfo && userInfo.hasOwnProperty("first_name")) {
        props.history.push("/account/login");
      }
    }
    return () => (clean = false);
  }, [userInfo]);

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
            <h1 className="ta-c">Create Account</h1>
            {/* <h1 className="row">
							<label style={{ width: '100%', marginRight: '-40px' }}>Create</label>{' '}
							<label style={{ width: '100%' }}>Account</label>
						</h1> */}
          </li>
          <Loading loading={loading} error={error} />
          {/* <li>
						<div className="jc-c">
							{error && (
								<label style={{ textAlign: 'center' }}>
									{error ? 'Already a Member' : 'Registration Complete'}
								</label>
							)}
						</div>
					</li> */}

          <li>
            <label htmlFor="first_name">First Name</label>
            <input type="text" name="first_name" id="first_name" onChange={e => set_first_name(e.target.value)} />
          </li>
          <label className="validation_text" style={{ fontSize: 16, justifyContent: "center" }}>
            {first_name_validations}
          </label>
          <li>
            <label htmlFor="last_name">Last Name</label>
            <input type="text" name="last_name" id="last_name" onChange={e => set_last_name(e.target.value)} />
          </li>
          <label className="validation_text" style={{ fontSize: 16, justifyContent: "center" }}>
            {last_name_validations}
          </label>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              style={{ textTransform: "lowercase" }}
              onChange={e => setEmail(e.target.value.toLowerCase())}
            />
          </li>
          <label className="validation_text" style={{ fontSize: 16, justifyContent: "center" }}>
            {/* {console.log(email_validations)} */}
            {email_validations}
          </label>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} />
          </li>
          <label className="validation_text" style={{ fontSize: 16, justifyContent: "center" }}>
            {password_validations}
          </label>
          <li>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input type="password" id="rePassword" name="rePassword" onChange={e => setRePassword(e.target.value)} />
          </li>
          <label className="validation_text" style={{ fontSize: 16, justifyContent: "center" }}>
            {re_password_validations}
          </label>
          <li>
            <GLButton type="submit" variant="primary">
              Register
            </GLButton>
          </li>
          <li>
            <div className="ta-c">Already have an account?</div>
            <Link to={redirect === "/" ? "login" : "login?redirect=" + redirect}>
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
