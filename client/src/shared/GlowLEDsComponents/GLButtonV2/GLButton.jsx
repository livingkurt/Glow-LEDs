import { Button, styled, Tooltip } from "@mui/material";
import * as React from "react";

const GLButtonV2 = ({
  children,
  icon,
  onClick,
  onKeyUp,
  className,
  disabled,
  variant,
  fullWidth,
  tooltip,
  ...otherProps
}) => {
  return (
    <Tooltip title={tooltip}>
      <Button
        disabled={disabled}
        fullWidth={fullWidth}
        margin={"normal"}
        size="medium"
        className={`${className} title_font`}
        variant={"contained"}
        onClick={onClick}
        color={variant}
        onKeyUp={onKeyUp}
        {...otherProps}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default GLButtonV2;
