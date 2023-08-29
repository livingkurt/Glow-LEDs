import React, { useEffect } from "react";

const HSVSlider = ({ color, direction, hsv, set_hsv, update_function }) => {
  const update = e => {
    update_function(e.target.name, e.target.value);
    set_hsv({ ...hsv, [color]: e.target.value });
  };
  useEffect(() => {
    return () => {};
  }, [hsv[color]]);
  return (
    <div className="mv-5px w-100per">
      <div className="row">
        <label className="m-t-s w-16rem" htmlFor={color}>
          {color.toUpperCase()}
        </label>
        <input
          type="number"
          min="0"
          max="255"
          step="1"
          value={hsv[color]}
          className="w-8rem mr-20px"
          name={color}
          onMouseUp={e => update(e)}
          onChange={e => set_hsv({ ...hsv, [color]: e.target.value })}
        />
        <input
          type="range"
          min="0"
          max="255"
          step="1"
          value={hsv[color]}
          dir={direction}
          className="w-100per"
          name={color}
          onMouseUp={e => update(e)}
          onBlur={e => update(e)}
          onChange={e => set_hsv({ ...hsv, [color]: e.target.value })}
        />
      </div>
    </div>
  );
};

export default HSVSlider;
