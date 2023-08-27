// React
import * as React from "react";

const Filter = ({ filterHandler, filter_options, state, title, width }) => {
  return (
    <div className="ai-c ml-1rem mh-1rem">
      <div className={`custom-select ${width && "w-100per"}`}>
        <select
          name="filterOrder"
          className={`filter_select w-${width || "221px"}`}
          onChange={filterHandler}
          defaultValue={JSON.stringify(state)}
          value={JSON.stringify(state)}
        >
          <option className="grey_option" selected="selected" value={""}>
            {title || "Filter By Chip"}
          </option>
          {filter_options.map((option, index) => {
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
