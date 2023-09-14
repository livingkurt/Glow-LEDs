import React from "react";
import config from "../../config";

const Error = (loading, error, children) => {
  const loading_message = () => {
    setTimeout(() => {
      return <h3 style={{ textAlign: "center" }}>If page doesn't show in 5 seconds, refresh the page.</h3>;
    }, 3000);
  };

  return (
    <div>
      {loading ? (
        <div className="column jc-c">
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
      ) : error ? (
        <div className="row jc-c">
          <h3 style={{ textAlign: "center" }}>Page Error</h3>
          <h3 style={{ textAlign: "center" }}>{error} </h3>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Error;
