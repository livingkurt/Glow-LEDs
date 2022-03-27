// React
import React from "react";

const Filter = props => {
  // console.log({ props });
  return (
    <div className="ai-c ml-1rem mh-1rem">
      <div className="custom-select">
        <select
          name="filterOrder"
          className="filter_select w-221px"
          onChange={props.filterHandler}
        >
          <option
            className="grey_option"
            disabled="disabled"
            selected="selected"
            value=""
          >
            {props.title || "Filter By Chip"}
          </option>
          {props.filter_options.map((option, index) => {
            return (
              <option key={index} value={JSON.stringify(option)}>
                {option.name}
              </option>
            );
          })}
        </select>
        <span className="custom-arrow" />
      </div>
    </div>
  );
};

export default Filter;
