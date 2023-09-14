import React from "react";

const ErrorView = ({ error }) => {
  return (
    <div>
      <div className="error_message jc-c column">
        <p className="ta-c  fs-14px">{error.message}</p>
      </div>
    </div>
  );
};

export default ErrorView;
