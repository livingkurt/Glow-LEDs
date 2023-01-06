// React
import React from "react";
import GLButton from "../GLButton/GLButton";

const GLSearch = ({ set_search, search, submitHandler, className }) => {
  return (
    <form onSubmit={submitHandler} className={"jc-c w-100per " + className}>
      <div className="jc-b ai-c search_container w-100per">
        <label aria-label="Search" htmlFor="search" />
        <input name="search" placeholder="Search" value={search} onChange={set_search} className="form_input search mv-0px" />
        <GLButton type="submit" variant="primary" className="w-50px mb-0px" aria-label="Search">
          <i className="fas fa-search" />
        </GLButton>
      </div>
    </form>
  );
};

export default GLSearch;
