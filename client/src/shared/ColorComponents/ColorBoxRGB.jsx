import React, { useState, useEffect } from "react";

const ColorBoxRGB = ({ color, update_function }) => {
  const red = color.split(",")[0];
  const green = color.split(",")[1];
  const blue = color.split(",")[2];
  return (
    <div>
      <button
        className="btn zoom"
        name="rgb"
        style={{
          backgroundColor: `rgb(${color})`,
          height: "40px",
          width: "60px",
          border: 0,
          borderRadius: "10px",
        }}
        onClick={e => update_function(e.target.name, e.target.value, red, green, blue)}
      />
    </div>
  );
};

export default ColorBoxRGB;
