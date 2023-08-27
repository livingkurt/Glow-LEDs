// React
import * as React from "react";

// Components

const Notification = props => {
  const { ...others } = props;

  return (
    <div>
      <div className={`notification jc-c column pos-fix ${props.message || "none"}`} {...others}>
        <label className="ta-c  fs-14px">{props.message}</label>
      </div>
    </div>
  );
};

export default Notification;
