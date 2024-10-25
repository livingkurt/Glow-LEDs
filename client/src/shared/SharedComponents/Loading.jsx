import React from "react";

const Loading = ({ loading, children, message }) => {
  return (
    <div>
      {loading ? (
        <div className="jc-c column">
          <img src="/loading.gif" className="loading_gif" alt="Loading Circle" title="Loading Circle" />
          <img src="/loading_overlay.png" className="loading_png" alt="Loading Overlay" title="Loading Overlay" />
          {message}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Loading;
