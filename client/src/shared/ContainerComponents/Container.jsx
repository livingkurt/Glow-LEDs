// React
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { handleTokenRefresh } from "../../api/axiosInstance";

const Container = ({ children, style }) => {
  const location = useLocation();

  useEffect(() => {
    handleTokenRefresh();
  }, [location.pathname]);

  return (
    <div style={style} className="fade_in">
      {children}
    </div>
  );
};

export default Container;
