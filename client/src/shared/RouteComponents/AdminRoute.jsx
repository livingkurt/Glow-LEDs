import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const determinePathname = props => {
    let pathname = props.location.pathname;

    if (pathname.includes("glow")) {
      return "/";
    } else {
      return pathname;
    }
  };

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props =>
        current_user.isAdmin ? <Component {...props} /> : <Redirect to={"/account/login?redirect=" + determinePathname(props)} />
      }
    />
  );
};

export default AdminRoute;
