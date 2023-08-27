import * as React from "react";
import config from "../../config";

const Loading = ({ loading, error, children }) => {
  const loading_message = () => {
    setTimeout(() => {
      return <h3 style={{ textAlign: "center" }}>If page doesn't show in 5 seconds, refresh the page.</h3>;
    }, 3000);
  };

  return (
    <div>
      {loading ? (
        <div className="jc-c column">
          <img
            src={config.PUBLIC_URL + "/loading.gif"}
            className="loading_gif"
            alt="Loading Circle"
            title="Loading Circle"
          />
          <img
            src={config.PUBLIC_URL + "/loading_overlay.png"}
            className="loading_png"
            alt="Loading Overlay"
            title="Loading Overlay"
          />
          {loading_message()}
        </div>
      ) : error && error.message ? (
        <div className="error_message jc-c column">
          <p className="ta-c  fs-14px">Error: {error.message}</p>
        </div>
      ) : (
        !loading && children
      )}
    </div>
  );
};

export default Loading;
