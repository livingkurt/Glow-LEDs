import React from "react";
import GLButton from "../GLButton/GLButton";
import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import GLIconButton from "../GLIconButton/GLIconButton";

const GLSearch = ({ set_search, search, submitHandler, className }) => {
  return (
    <form onSubmit={submitHandler} className={"jc-c w-100per " + className}>
      <div className="jc-b ai-c search_container w-100per">
        <label aria-label="Search" htmlFor="search" />
        <input
          name="search"
          placeholder="Search"
          value={search}
          onChange={set_search}
          className="form_input search mv-0px"
        />
        <GLIconButton type="submit" variant="contained" className="w-50px mb-0px" tooltip="Search">
          <Search />
        </GLIconButton>
      </div>
    </form>
  );
};

export default GLSearch;
