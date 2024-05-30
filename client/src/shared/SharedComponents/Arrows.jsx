import React from "react";
import { GLButton } from "../GlowLEDsComponents";
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import GLIconButton from "../GlowLEDsComponents/GLIconButton/GLIconButton";

const Arrows = ({ direction, set_value, update_function, name, value }) => {
  const increment = () => {
    if (direction === "rtl") {
      set_value(value => value - 1);
      update_function(name, value - 1);
    } else {
      set_value(value => value + 1);
      update_function(name, value + 1);
    }
  };
  const decrement = () => {
    if (direction === "rtl") {
      set_value(value => value + 1);
      update_function(name, value + 1);
    } else {
      set_value(value => value - 1);
      update_function(name, value - 1);
    }
  };
  return (
    <div className="row">
      <GLIconButton onClick={() => decrement()} variant="contained" className="w-4rem" tooltip="Previous">
        <ArrowBack fontSize="small" />
      </GLIconButton>

      <GLIconButton onClick={() => increment()} variant="contained" className="w-4rem m-l-s" tooltip="Next">
        <ArrowForward fontSize="small" />
      </GLIconButton>
    </div>
  );
};

export default Arrows;
