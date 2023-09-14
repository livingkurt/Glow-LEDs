/* eslint-disable max-lines-per-function */
import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";

import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles, styled } from "@mui/styles";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& input": {
    boxShadow: "0 0 0 0.2rem rgba(0,0,0,0.01)",
  },
});

const useStyles = makeStyles(() => ({
  textField: {
    marginTop: 15,
    marginBottom: 15,
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
  skeleton: {
    marginTop: -10,
    marginBottom: -10,
  },
  inputRoot: {
    color: "white !important",
  },
  inputBase: {
    color: "white !important",
    "&.MuiInputLabel-root": {
      color: "white",
    },
    " & label.Mui-focused": {
      color: "white",
    },
    "& .,MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
}));

const GLTextField = ({
  loading,
  size,
  value,
  type,
  margin,
  name,
  label,
  variant,
  onChange,
  fullWidth,
  ...otherProps
}) => {
  const classes = useStyles();
  return (
    <div>
      {loading ? (
        <StyledTextField
          fullWidth={fullWidth}
          elevation={4}
          inputProps={{ className: classes.inputRoot }}
          InputProps={{ className: classes.inputBase }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          classes={classes.textField}
          size={size}
          value={value}
          type={type}
          margin={margin}
          name={name}
          label={label}
          variant={variant}
          onChange={onChange}
          {...otherProps}
        />
      ) : (
        <Skeleton variant="text" height={80} className={classes.skeleton} animation="wave" />
      )}
    </div>
  );
};
PropTypes.GLTextField = {
  loading: PropTypes.bool,
  size: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  fullWidth: PropTypes.bool,
};
GLTextField.defaultProps = {
  size: "medium",
  value: "",
  type: "text",
  margin: "normal",
  name: "",
  label: "",
  variant: "outlined",
  onChange: () => {},
  fullWidth: true,
  loading: true,
};

export default GLTextField;
