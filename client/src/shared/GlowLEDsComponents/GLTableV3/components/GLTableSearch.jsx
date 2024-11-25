import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { applySearch } from "../reducers/glTableActions";
import useTableState from "../useTableState";

const GLTableSearch = ({ namespace, namespaceScope, searchAutoFocus, restrictSearchChars, searchPlaceholder }) => {
  const dispatch = useDispatch();

  const individualTableState = useTableState(namespace, namespaceScope);

  const { search } = individualTableState;

  return (
    <div id="searchComponent" className="search-container" style={{ width: "350px" }}>
      <TextField
        value={search || ""}
        notched="true"
        id="search-field"
        type="search"
        name="search"
        variant="outlined"
        icon="search"
        iconColor="inherit"
        iconFontSize="inherit"
        iconPosition="start"
        placeholder={searchPlaceholder}
        autoFocus={searchAutoFocus}
        restrictCharacters={restrictSearchChars}
        onChange={e => dispatch(applySearch(namespace, e.target.value))}
        InputProps={{
          classes: {
            root: {
              height: "36px",
              color: "#212121",
              backgroundColor: "#f5f5f5",
              "&:focus": {
                backgroundColor: "#ffffff",
              },
            },
            notchedOutline: {
              borderColor: "#f5f5f5",
              "&:focus": {
                boxShadow:
                  "0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2)",
              },
            },
          },
        }}
      />
    </div>
  );
};

GLTableSearch.defaultProps = {
  namespaceScope: null,
  searchAutoFocus: false,
  restrictSearchChars: x => x,
  searchPlaceholder: "Search By Name or ID",
};

GLTableSearch.propTypes = {
  namespace: PropTypes.string.isRequired,
  namespaceScope: PropTypes.string,
  searchAutoFocus: PropTypes.bool,
  restrictSearchChars: PropTypes.func,
  searchPlaceholder: PropTypes.string,
};

export default GLTableSearch;
