// React
import React from "react";
import { GLButton } from "../GlowLEDsComponents";

const Search = props => {
  return (
    <form
      onSubmit={props.submitHandler}
      className={"jc-c w-100per " + props.className}
    >
      <div className="jc-b ai-c search_container w-100per">
        <label aria-label="Search" htmlFor="search" />
        <input
          name="search"
          placeholder="Search"
          value={props.search}
          onChange={e => props.set_search(e.target.value)}
          className="form_input search mv-0px"
        />
        <GLButton
          type="submit"
          variant="primary"
          className="w-50px mb-0px"
          aria-label="Search"
        >
          <i className="fas fa-search" />
        </GLButton>
      </div>
    </form>
  );
};

export default Search;
