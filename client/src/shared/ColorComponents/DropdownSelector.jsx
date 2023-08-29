import React, { useState, useEffect } from "react";

const DropdownSelector = ({ setting, data, update_function }) => {
  return (
    <div className="row ai-c m-b-l">
      <label className="w-16rem" htmlFor={setting.name}>
        {setting.label}
      </label>
      <select
        name={setting.name}
        defaultValue={setting.value}
        className="w-100"
        onChange={e => update_function(e.target.name, e.target.value)}
      >
        {data.map((item, index) => {
          return (
            <option value={index} key={index}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropdownSelector;
