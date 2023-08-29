import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleTokenRefresh, setCurrentUser } from "../../api/axiosInstance";

const AdminRoute = ({ element: Component, children }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const [isLoading, setIsLoading] = useState(true);
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

  const determinePathname = () => {
    let pathname = location.pathname;

    if (pathname.includes("glow")) {
      return "/";
    } else {
      return pathname;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isTokenRefreshed) {
    if (current_user && current_user.isAdmin) {
      return children;
    } else {
      navigate(`/account/login?redirect=${determinePathname()}`, { replace: true });
      return null;
    }
  }
  return null;
};

export default AdminRoute;
