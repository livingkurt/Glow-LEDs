import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const GLIconButton = ({ tooltip, onClick, ariaLabel, children, ...otherProps }) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton onClick={onClick} aria-label={ariaLabel} {...otherProps}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

GLIconButton.propTypes = {
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
};

GLIconButton.defaultProps = {
  tooltip: "",
  onClick: () => {},
  ariaLabel: "",
};

export default GLIconButton;
