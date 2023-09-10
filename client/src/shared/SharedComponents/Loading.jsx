import * as React from "react";
import config from "../../config";

const Loading = ({ loading, children, message }) => {
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
          {message}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Loading;
