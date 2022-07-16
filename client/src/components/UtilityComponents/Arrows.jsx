import React from "react";
import { GLButton } from "../GlowLEDsComponents";

const Arrows = props => {
  const increment = () => {
    if (props.direction === "rtl") {
      props.set_value(value => value - 1);
      props.update_function(props.name, props.value - 1);
    } else {
      props.set_value(value => value + 1);
      props.update_function(props.name, props.value + 1);
    }
  };
  const decrement = () => {
    if (props.direction === "rtl") {
      props.set_value(value => value + 1);
      props.update_function(props.name, props.value + 1);
    } else {
      props.set_value(value => value - 1);
      props.update_function(props.name, props.value - 1);
    }
  };
  return (
    <div className="row">
      <GLButton
        onClick={() => decrement()}
        variant="primary"
        className="w-4rem"
        aria-label="Previous"
      >
        <i className="fas fa-arrow-left f-s-12" />
      </GLButton>
      <GLButton
        onClick={() => increment()}
        variant="primary"
        className="w-4rem m-l-s"
        aria-label="Next"
      >
        <i className="fas fa-arrow-right f-s-12" />
      </GLButton>
    </div>
  );
};

export default Arrows;
