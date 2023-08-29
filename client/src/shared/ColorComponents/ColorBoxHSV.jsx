import React, { useState, useEffect } from "react";

const ColorBoxHSV = ({ hsv, rgb, update_function }) => {
  const hue = hsv.split(",")[0];
  const saturation = hsv.split(",")[1];
  const value = hsv.split(",")[2];
  return (
    <div>
      <button
        className="btn zoom"
        name="hsv"
        style={{
          backgroundColor: `rgb(${rgb} )`,
          height: "40px",
          width: "60px",
          border: 0,
          borderRadius: "10px",
          margin: "auto",
        }}
        onClick={e => update_function(e.target.name, e.target.value, hue, saturation, value)}
      />
    </div>
  );
};

export default ColorBoxHSV;
