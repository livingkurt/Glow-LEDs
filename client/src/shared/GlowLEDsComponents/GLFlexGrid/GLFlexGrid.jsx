import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

/**
 * A flexible grid component that arranges its children in a row-based layout.
 * To be used in situations when
 *    The number of grid items is unknown.
 *    The grid items have different sizes.
 *    The number of grid items isnt divisible by 12
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The children elements to be rendered within the grid.
 * @param {string} props.gap - The gap between grid items.
 * @returns {JSX.Element} - The rendered GLFlexGrid component.
 */

const GLFlexGrid = ({ children, gap }) => {
  return (
    <Box display="flex" justifyContent="space-between" style={{ gap }} flexWrap="wrap">
      {children}
    </Box>
  );
};

GLFlexGrid.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.number,
};

GLFlexGrid.defaultProps = {
  gap: 15,
};

export default GLFlexGrid;
