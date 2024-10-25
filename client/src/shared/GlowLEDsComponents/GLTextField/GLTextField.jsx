import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: 15,
  marginBottom: 15,
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
    color: "white !important",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
}));

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  marginTop: -10,
  marginBottom: -10,
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
  return (
    <div>
      {loading ? (
        <StyledTextField
          fullWidth={fullWidth}
          elevation={4}
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
        <StyledSkeleton variant="text" height={80} animation="wave" />
      )}
    </div>
  );
};

GLTextField.propTypes = {
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
