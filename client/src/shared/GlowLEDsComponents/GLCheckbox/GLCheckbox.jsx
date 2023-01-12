import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

const GLCheckbox = ({ children, onChecked, value, ...otherProps }) => {
  const [loading, set_loading] = useState(true);

  setTimeout(() => {
    set_loading(false);
  }, 500);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          <input
            type="checkbox"
            name="paid"
            id="paid"
            style={{
              transform: "scale(1.5)"
            }}
            value={value}
            className="mr-1rem"
            onChange={e => {
              onChecked(e.target.checked);
            }}
          />
          <label htmlFor="paid mb-20px ">{children}</label>
        </div>
      )}
    </>
  );
};

export default GLCheckbox;
