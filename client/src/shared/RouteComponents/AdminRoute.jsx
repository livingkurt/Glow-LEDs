import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const userSlice = useSelector(state => state.userSlice.userPage);
  const { current_user } = userSlice;

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props =>
        current_user.isAdmin ? <Component {...props} /> : <Redirect to={"/account/login?redirect=" + props.location.pathname} />
      }
    />
  );
};

export default AdminRoute;
