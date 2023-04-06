import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";

const ProfilePage = props => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userSlice = useSelector(state => state.userSlice.userPage);
  const { current_user } = userSlice;

  const submitHandler = e => {
    e.preventDefault();
    dispatch(API.saveUser({ userId: current_user._id, email, name, password }));
    history.push(`/secure/account/profile`);
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (current_user) {
        setEmail(current_user.email);
        setName(current_user.name);

        setPassword(current_user.password);
      }
      dispatch(API.listOrders({ user: current_user._id }));
    }
    return () => (clean = false);
  }, [current_user]);

  return (
    <div className="profile_container wrap p-20px">
      <Helmet>
        <title>Edit Shipping | Glow LEDs</title>
        <meta property="og:title" content="Edit Shipping" />
        <meta name="twitter:title" content="Edit Shipping" />
        <link rel="canonical" href="https://www.glow-leds.com/secure/account/editshipping" />
        <meta property="og:url" content="https://www.glow-leds.com/secure/account/editshipping" />
      </Helmet>
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler} style={{ width: "100%" }}>
            <ul className="form-container">
              <li>
                <h1 style={{ textAlign: "center" }}>User Profile</h1>
              </li>
              <li>
                <div className="jc-c" />
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input defaultValue={name} type="name" name="name" id="name" onChange={e => setName(e.target.value)} />
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input defaultValue={email} type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input defaultValue={password} type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} />
              </li>

              <li>
                <GLButton type="submit" variant="primary">
                  Update
                </GLButton>
              </li>
              <li>
                <Link to={`/secure/account/profile`}>
                  <GLButton type="button" variant="secondary" className="w-100per">
                    Cancel
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

export default ProfilePage;
