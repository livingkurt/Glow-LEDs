import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (current_user) {
      setIsLoading(false);
    }
  }, [current_user]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Route
          {...rest}
          render={props =>
            current_user.hasOwnProperty("first_name") ? (
              <Component {...props} />
            ) : (
              <Redirect to={"/account/login?redirect=" + props.location.pathname} />
            )
          }
        />
      )}
    </>
  );
};

export default PrivateRoute;
