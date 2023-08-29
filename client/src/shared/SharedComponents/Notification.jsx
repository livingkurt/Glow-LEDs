// React
import * as React from "react";

// Components

const Notification = ({ message, ...others }) => {
  return (
    <div>
      <div className={`notification jc-c column pos-fix ${message || "none"}`} {...others}>
        <label className="ta-c  fs-14px">{message}</label>
      </div>
    </div>
  );
};

export default Notification;
