import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/userActions';
import { Title } from '../components/UtilityComponents';
import { FlexContainer } from '../components/ContainerComponents';

function LoginPage(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userLogin = useSelector(state => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));

  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          {/* <h2>Login</h2> */}
          <Title class="h1_title">Login</Title>
        </li>
        <li>
          <FlexContainer h_center>
            {loading && <Title styles={{ fontSize: 20 }} >Loading...</Title>}
            {error && <Title styles={{ fontSize: 20 }} >{error}</Title>}
          </FlexContainer>
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Login</button>
        </li>
        <li>
          New to Glow LEDs?
        </li>
        <li>
          <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your Glow LED account</Link>
        </li>
      </ul>
    </form>
  </div>
}
export default LoginPage;