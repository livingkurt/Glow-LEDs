// React
import * as React from "react";
import config from "../../config";

const LoadingInside = ({ loading, error, children }) => {
  const loading_message = () => {
    setTimeout(() => {
      return <h3 style={{ textAlign: "center" }}>If page doesn't show in 5 seconds, refresh the page.</h3>;
    }, 3000);
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div className="loading_images_container">
            <img
              src={config.PUBLIC_URL + "/loading.gif"}
              className="loading_gif_inside"
              alt="LoadingInside Circle"
              title="LoadingInside Circle"
            />
            <img
              src={config.PUBLIC_URL + "/loading_overlay.png"}
              className="loading_png_inside"
              alt="LoadingInside Overlay"
              title="LoadingInside Overlay"
            />
          </div>
          {loading_message()}
        </div>
      ) : error ? (
        <div className="error_message jc-c column">
          <p className="ta-c  fs-14px">Error: {error}</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoadingInside;
