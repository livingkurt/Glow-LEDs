import * as React from "react";
import { GLButton } from "../GlowLEDsComponents";

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
      <GLButton onClick={() => decrement()} variant="primary" className="w-4rem" aria-label="Previous">
        <i className="fas fa-arrow-left f-s-12" />
      </GLButton>
      <GLButton onClick={() => increment()} variant="primary" className="w-4rem m-l-s" aria-label="Next">
        <i className="fas fa-arrow-right f-s-12" />
      </GLButton>
    </div>
  );
};

export default Arrows;
