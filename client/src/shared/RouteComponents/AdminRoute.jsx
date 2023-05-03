import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  console.log({ current_user });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (current_user) {
      setIsLoading(false);
    }
  }, [current_user]);

  const determinePathname = props => {
    let pathname = props.location.pathname;

    if (pathname.includes("glow")) {
      return "/";
    } else {
      return pathname;
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Route
          {...rest}
          render={props =>
            current_user.isAdmin ? <Component {...props} /> : <Redirect to={"/account/login?redirect=" + determinePathname(props)} />
          }
        />
      )}
    </>
  );
};

export default AdminRoute;
