// React
import * as React from "react";

const EmployeeItemM = ({ user, style }) => {
  return (
    <li key={user._id} style={{ ...style, textDecoration: "none" }}>
      <label style={{ fontSize: "2rem", WebkitTextStroke: "1.5px white" }} className="pv-1rem">
        {user.first_name} {user.last_name}
      </label>
    </li>
  );
};

export default EmployeeItemM;
