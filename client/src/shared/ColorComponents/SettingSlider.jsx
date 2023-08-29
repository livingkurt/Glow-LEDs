import React, { useState, useEffect } from "react";
import { Arrows } from "../SharedComponents";

const SettingSlider = ({ setting, direction, update_function, settings, set_settings }) => {
  const [value, set_value] = useState(setting.value);
  return (
    <div className="mv-10px w-100per">
      <div className="row ai-c">
        <label className="mt-5px w-16rem" htmlFor={setting.name}>
          {setting.label}
        </label>
        <input
          type="number"
          min={setting.min}
          max={setting.max}
          step={setting.step}
          value={value}
          className="w-8rem mr-20px"
          name={setting.name}
          onMouseUp={e => update_function(e.target.name, e.target.value)}
          // onChange={(e) =>
          // 	set_settings({
          // 		...settings,
          // 		[setting.name]: { ...settings[setting.name], value: e.target.value }
          // 	})}
          onChange={e => set_value(e.target.value)}
        />
        <input
          type="range"
          min={setting.min}
          max={setting.max}
          step={setting.step}
          value={value}
          dir={direction}
          className="w-100per  mr-10px"
          name={setting.name}
          onMouseUp={e => update_function(e.target.name, e.target.value)}
          onBlur={e => update_function(e.target.name, e.target.value)}
          // onChange={(e) =>
          // 	set_settings({
          // 		...settings,
          // 		[setting.name]: { ...settings[setting.name], value: e.target.value }
          // 	})}
          onChange={e => set_value(e.target.value)}
        />
        <Arrows
          set_value={set_value}
          value={value}
          direction={direction}
          update_function={update_function}
          name={setting.name}
        />
      </div>
    </div>
  );
};

export default SettingSlider;
