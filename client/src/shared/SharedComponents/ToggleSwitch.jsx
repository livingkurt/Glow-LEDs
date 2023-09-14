import React from "react";

const ToggleSwitch = ({ setting, update_function }) => {
  return (
    <div className="mv-10px ai-c">
      <label className="w-14rem">{setting.label}</label>
      <label className="switch">
        <input
          type="checkbox"
          name={setting.name}
          defaultChecked={setting.value === 1 ? true : false}
          onChange={e => update_function(e.target.name, e.target.checked === true ? 1 : 0)}
        />
        <span className="slider round" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
