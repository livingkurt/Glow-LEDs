import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { stopLoading } from "../../../slices/snackbarSlice";

const GLLoading = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(state => state.snackbar);
  const { loading, message, error } = snackbar;

  const loadingMessage = () => {
    setTimeout(() => {
      dispatch(stopLoading());
    }, 3000);
    return <h3 style={{ textAlign: "center" }}>{message || "If page doesn't show in 5 seconds, refresh the page."}</h3>;
  };

  return (
    <div>
      {loading ? (
        <div className="jc-c column">
          <img src={"/loading.gif"} className="loading_gif" alt="Loading Circle" title="Loading Circle" />
          <img src={"/loading_overlay.png"} className="loading_png" alt="Loading Overlay" title="Loading Overlay" />
          {loadingMessage()}
        </div>
      ) : error && error.message ? (
        <div className="error_message jc-c column">
          <p className="ta-c  fs-14px">Error: {error.message}</p>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default GLLoading;
