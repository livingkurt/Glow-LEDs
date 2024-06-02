import { Button, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const GLButtonV2 = ({ children, tooltip, color, margin, variant, disabled, ...otherProps }) => {
  return (
    <Tooltip title={tooltip}>
      <span>
        <Button
          variant={variant}
          margin={margin}
          color={color}
          disabled={disabled}
          sx={
            color === "primary" && !disabled
              ? {
                  background: "linear-gradient(180deg, #4d5061 50%, #6a6c80 100%)",
                  ":hover": {
                    background: "linear-gradient(180deg, #4d5061 50%, #6a6c80 100%)",
                  },
                  color: "white",
                }
              : {}
          }
          {...otherProps}
        >
          {children}
        </Button>
      </span>
    </Tooltip>
  );
};

GLButtonV2.propTypes = {
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  margin: PropTypes.string,
  disabled: PropTypes.bool,
};

GLButtonV2.defaultProps = {
  tooltip: "",
  color: "primary",
  variant: "contained",
  margin: "normal",
  disabled: false,
};

export default GLButtonV2;
