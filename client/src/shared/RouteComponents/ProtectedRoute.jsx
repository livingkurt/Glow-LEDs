import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleTokenRefresh, setCurrentUser } from "../../api/axiosInstance";
import { Loading } from "../SharedComponents";
import { useDispatch } from "react-redux";
import { closeLoginModal, openLoginModal } from "../../slices/userSlice";

const ProtectedRoute = ({ children, isAdminRoute = false }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);

  const getRedirectPath = () => {
    if (location.pathname === "/secure/checkout/place_order") {
      return "/checkout/place_order";
    }

    return "/";
  };
  useEffect(() => {
    if (Object.keys(current_user).length > 0) {
      setIsLoading(false);
    }
  }, [current_user]);

  useEffect(() => {
    // Retrieve the 'manualNavigation' flag from session storage
    const manualNavigation = sessionStorage.getItem("manualNavigation") === "true";

    // Only proceed with the navigation logic if 'manualNavigation' is false
    if (isTokenRefreshed && !manualNavigation) {
      if (Object.keys(current_user).length === 0) {
        if (isAdminRoute) {
          navigate(getRedirectPath(), { replace: true });
        } else {
          dispatch(openLoginModal());
        }
      } else if (isAdminRoute && !current_user.isAdmin) {
        navigate(getRedirectPath(), { replace: true });
      } else {
        setIsLoading(false);
      }
    }

    // Remove the 'manualNavigation' flag from session storage
    sessionStorage.removeItem("manualNavigation");
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
            <h2 className="ta-c">{"Refreshing Login"}</h2>
            <p className="ta-c">{"Please wait"}</p>
          </div>
        }
      />
    );
  }

  if (isTokenRefreshed) {
    if (Object.keys(current_user).length > 0 && !isAdminRoute) {
      return children;
    } else if (isAdminRoute && current_user.isAdmin) {
      return children;
    } else {
      navigate(getRedirectPath(), { replace: true });
      return null;
    }
  }

  return null;
};

export default ProtectedRoute;
