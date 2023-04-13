import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// import { isLogin } from '../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props => {
        //
        return current_user.hasOwnProperty("first_name") ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/account/login?redirect=" + props.location.pathname} />
        );
      }}
    />
  );
};

export default PrivateRoute;
