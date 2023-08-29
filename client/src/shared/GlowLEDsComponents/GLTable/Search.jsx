// React
import * as React from "react";
import { GLButton } from "..";

const Search = ({ handleListItems, className, search, set_search }) => {
  return (
    <form onSubmit={handleListItems} className={"jc-c w-100per " + className}>
      <div className="jc-b ai-c search_container w-100per">
        <label aria-label="Search" htmlFor="search" />
        <input
          name="search"
          placeholder="Search"
          value={search}
          onChange={e => set_search(e.target.value)}
          className="form_input search mv-0px"
        />
        <GLButton type="submit" variant="primary" className="w-50px mb-0px" aria-label="Search">
          <i className="fas fa-search" />
        </GLButton>
      </div>
    </form>
  );
};

export default Search;
