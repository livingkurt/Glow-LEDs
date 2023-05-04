import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleTokenRefresh, setCurrentUser } from "../../api/axiosInstance";

const AdminRoute = ({ component: Component, ...rest }) => {
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
      setCurrentUser(accessToken);
      setIsTokenRefreshed(true);
    })();
  }, []);

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
        // <Loading loading={isLoading} />
        isTokenRefreshed && (
          <Route
            {...rest}
            render={props =>
              current_user.isAdmin ? <Component {...props} /> : <Redirect to={"/account/login?redirect=" + determinePathname(props)} />
            }
          />
        )
      )}
    </>
  );
};

export default AdminRoute;
