import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { applySearch } from "../actions/actions";
import { TextField } from "@mui/material";

const GLTableSearch = ({ placeholder, namespace, width, autoFocus, restrictSearchChars, search }) => {
  const dispatch = useDispatch();

  const theme = createTheme({
    overrides: {
      MuiInputBase: {
        root: {
          height: "36px",
          color: "#212121",
          backgroundColor: "#f5f5f5",
          "&$focused": {
            backgroundColor: "#ffffff"
          }
        }
      },
      MuiOutlinedInput: {
        root: {
          "& $notchedOutline": {
            border: "#f5f5f5"
          },
          "&$focused $notchedOutline": {
            boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2);"
          }
        }
      }
    }
  });

  return (
    <div id="searchComponent" className="search-container" style={{ width }}>
      <ThemeProvider theme={theme}>
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
          placeholder={placeholder}
          autoFocus={autoFocus}
          restrictCharacters={restrictSearchChars}
          onChange={e => dispatch(applySearch(namespace, e.target.value))}
        />
      </ThemeProvider>
    </div>
  );
};

GLTableSearch.defaultProps = {
  placeholder: "Search by Name or ID",
  width: "350px",
  autoFocus: true,
  search: null,
  restrictSearchChars: x => x,
  namespace: ""
};

GLTableSearch.propTypes = {
  placeholder: PropTypes.string,
  width: PropTypes.string,
  autoFocus: PropTypes.bool,
  restrictSearchChars: PropTypes.func,
  search: PropTypes.string,
  namespace: PropTypes.string
};

export default React.memo(GLTableSearch);
