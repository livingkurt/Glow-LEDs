import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleTokenRefresh, setCurrentUser } from "../../api/axiosInstance";

const AdminRoute = ({ element: Component, children }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);

  const navigate = useNavigate();

  const getRedirectPath = () => {
    console.log({ location });
    if (location.pathname === "/secure/checkout/placeorder") {
      return "/checkout/placeorder";
    }
    return "/";
  };

  useEffect(() => {
    if (current_user) {
      setIsLoading(false);
    }
  }, [current_user]);

  useEffect(() => {
    if (isTokenRefreshed) {
      if (!current_user || !current_user.isAdmin) {
        navigate(getRedirectPath(), { replace: true });
      }
    }
  }, [current_user]);

  useEffect(() => {
    (async () => {
      const accessToken = await handleTokenRefresh();
      setCurrentUser(accessToken);
      setIsTokenRefreshed(true);
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isTokenRefreshed) {
    if (current_user && current_user.isAdmin) {
      return children;
    } else {
      navigate("/", { replace: true });
      return null;
    }
  }
  return null;
};

export default AdminRoute;
