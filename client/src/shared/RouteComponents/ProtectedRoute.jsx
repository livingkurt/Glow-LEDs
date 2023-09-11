import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleTokenRefresh, setCurrentUser } from "../../api/axiosInstance";
import { Loading } from "../SharedComponents";

const ProtectedRoute = ({ element: Component, children, isAdminRoute = false }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);

  const getRedirectPath = () => {
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
      if (!current_user || (isAdminRoute && !current_user.isAdmin)) {
        navigate(getRedirectPath(), { replace: true });
      }
    }
  }, [current_user, isTokenRefreshed]);

  useEffect(() => {
    (async () => {
      const accessToken = await handleTokenRefresh();
      setCurrentUser(accessToken);
      setIsTokenRefreshed(true);
    })();
  }, []);

  if (isLoading) {
    return (
      <Loading
        loading={isLoading}
        message={
          <div className="payment_message">
            <h2 className="ta-c">Refreshing Login</h2>
            <p className="ta-c">Please wait</p>
          </div>
        }
      />
    );
  }

  if (isTokenRefreshed) {
    if (current_user && (!isAdminRoute || current_user.isAdmin)) {
      return children;
    } else {
      navigate(getRedirectPath(), { replace: true });
      return null;
    }
  }

  return null;
};

export default ProtectedRoute;
