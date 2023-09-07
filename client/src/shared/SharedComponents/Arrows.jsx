import * as React from "react";
import { GLButton } from "../GlowLEDsComponents";
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

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
      <IconButton onClick={() => decrement()} variant="contained" className="w-4rem" aria-label="Previous">
        <ArrowBack fontSize="small" />
      </IconButton>

      <IconButton onClick={() => increment()} variant="contained" className="w-4rem m-l-s" aria-label="Next">
        <ArrowForward fontSize="small" />
      </IconButton>
    </div>
  );
};

export default Arrows;
