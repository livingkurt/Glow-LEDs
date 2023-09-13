import React, { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { applySearch } from "../actions/actions";
import { TextField } from "@mui/material";

const GLTableSearch = ({ placeholder, namespace, width, autoFocus, restrictSearchChars, search }) => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const handleHotkey = useCallback(event => {
    if (event.metaKey && event.code === "Slash") {
      const inputElement = searchRef.current.querySelector("input");
      inputElement.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Initialize the hotkey event listener
  useEffect(() => {
    window.addEventListener("keydown", handleHotkey);

    return () => {
      window.removeEventListener("keydown", handleHotkey);
    };
  }, [handleHotkey]);

  return (
    <TextField
      ref={searchRef}
      value={search || ""}
      size="small"
      style={{ width }}
      id="search-field"
      type="search"
      name="search"
      variant="outlined"
      icon="search"
      iconColor="inherit"
      iconFontSize="inherit"
      iconPosition="start"
      placeholder={placeholder}
      autoFocus={autoFocus}
      restrictCharacters={restrictSearchChars}
      onChange={e => dispatch(applySearch(namespace, e.target.value))}
    />
  );
};

GLTableSearch.defaultProps = {
  placeholder: "Search by Name or ID",
  width: "350px",
  autoFocus: true,
  search: null,
  restrictSearchChars: x => x,
  namespace: "",
};

GLTableSearch.propTypes = {
  placeholder: PropTypes.string,
  width: PropTypes.string,
  autoFocus: PropTypes.bool,
  restrictSearchChars: PropTypes.func,
  search: PropTypes.string,
  namespace: PropTypes.string,
};

export default React.memo(GLTableSearch);
