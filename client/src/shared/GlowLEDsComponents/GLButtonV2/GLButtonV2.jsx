import { Button, CircularProgress, Tooltip, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const GLButtonV2 = ({
  children,
  tooltip,
  color,
  margin,
  variant,
  disabled,
  size,
  sx,
  startIcon,
  endIcon,
  loading,
  ...otherProps
}) => {
  const loadingIcon = loading && <CircularProgress color="inherit" size={20} />;

  const setIcon = icon => {
    return icon;
  };
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
          startIcon={startIcon && (loading ? loadingIcon : setIcon(startIcon))}
          endIcon={endIcon && setIcon(endIcon)}
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
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  loading: PropTypes.bool,
};

GLButtonV2.defaultProps = {
  tooltip: "",
  color: "primary",
  size: "medium",
  sx: {},
  variant: "contained",
  margin: "normal",
  disabled: false,
  loading: false,
  startIcon: null,
  endIcon: null,
};

export default GLButtonV2;
