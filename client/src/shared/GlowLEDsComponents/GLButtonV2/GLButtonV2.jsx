import { Button, Tooltip, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const GLButtonV2 = ({ children, tooltip, color, margin, variant, disabled, size, sx, ...otherProps }) => {
  const theme = useTheme();
  return (
    <Tooltip title={tooltip}>
      <span>
        <Button
          variant={variant}
          margin={margin}
          color={color}
          size={size}
          disabled={disabled}
          sx={
            color === "primary" && !disabled
              ? {
                  ...sx,
                  background: `linear-gradient(180deg, ${theme.palette.primary.main} 50%, #6a6c80 100%)`,
                  ":hover": {
                    background: `linear-gradient(180deg, ${theme.palette.primary.main} 50%, #6a6c80 100%)`,
                  },
                  color: "white",
                }
              : { ...sx }
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
  size: PropTypes.string,
  sx: PropTypes.object,
  variant: PropTypes.string,
  margin: PropTypes.string,
  disabled: PropTypes.bool,
};

GLButtonV2.defaultProps = {
  tooltip: "",
  color: "primary",
  size: "medium",
  sx: {},
  variant: "contained",
  margin: "normal",
  disabled: false,
};

export default GLButtonV2;
