import React, { useEffect } from "react";

const RGBSlider = ({ color, direction, rgb, set_rgb, update_function }) => {
  const update = e => {
    update_function(e.target.name, e.target.value);
    set_rgb({ ...rgb, [color]: e.target.value });
  };
  useEffect(() => {
    return () => {};
  }, [rgb[color]]);
  return (
    <div className="m-v-s w-100">
      <div className="row">
        <label className="m-t-s w-16rem" htmlFor={color}>
          {color.toUpperCase()}
        </label>
        <input
          type="number"
          min="0"
          max="255"
          step="1"
          value={rgb[color]}
          className="w-8rem m-r-l"
          name={color}
          onMouseUp={e => update(e)}
          onChange={e => set_rgb({ ...rgb, [color]: e.target.value })}
        />
        <input
          type="range"
          min="0"
          max="255"
          step="1"
          value={rgb[color]}
          dir={direction}
          className="w-90"
          name={color}
          onMouseUp={e => update(e)}
          onBlur={e => update(e)}
          onChange={e => set_rgb({ ...rgb, [color]: e.target.value })}
        />
      </div>
    </div>
  );
};

export default RGBSlider;
