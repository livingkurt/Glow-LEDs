import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleTokenRefresh, setCurrentUser } from "../../api/axiosInstance";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const [isLoading, setIsLoading] = useState(true);
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);

  useEffect(() => {
    if (current_user) {
      setIsLoading(false);
    }
  }, [current_user]);

  useEffect(() => {
    (async () => {
      const accessToken = await handleTokenRefresh();
      console.log({ PrivateRoute: accessToken });
      setCurrentUser(accessToken);
      setIsTokenRefreshed(true);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        isTokenRefreshed && (
          // <Loading loading={isLoading} />
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
        )
      )}
    </>
  );
};

export default PrivateRoute;
