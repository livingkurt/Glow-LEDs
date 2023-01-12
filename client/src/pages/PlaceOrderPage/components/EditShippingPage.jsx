import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { update } from "../../../actions/userActions";
import { listMyOrders } from "../../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { GLButton } from "../../../components/GlowLEDsComponents";

const ProfilePage = props => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = e => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }));
    history.push(`/secure/account/profile/${userInfo._id}` + userInfo._id);
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (userInfo) {
        setEmail(userInfo.email);
        setName(userInfo.name);

        setPassword(userInfo.password);
      }
      dispatch(listMyOrders());
    }
    return () => (clean = false);
  }, [userInfo]);

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
                <Link to={`/secure/account/profile/${userInfo._id}` + userInfo._id}>
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
