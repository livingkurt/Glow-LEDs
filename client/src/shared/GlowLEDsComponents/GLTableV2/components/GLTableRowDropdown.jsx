import { styled } from "@mui/material/styles";
import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { determineHover, tableColors } from "../glTableHelpers";
import { Checkbox, darken } from "@mui/material";

// Styled Components
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  height: "50px",
  width: "auto",
  marginLeft: "10px",
  backgroundColor: "#f0f0f0",
}));

const StyledCheckbox = styled(Checkbox, {
  shouldForwardProp: prop => prop !== "determineColor",
})(({ theme, determineColor }) => ({
  color: determineColor ? "white" : "",
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "& .Mui-checked": {
    color: "white",
    backgroundColor: determineColor ? determineColor : "#",
  },
  "&:hover": {
    backgroundColor: `${determineColor ? darken(determineColor || tableColors.active, 0.3) : "white"} !important`,
  },
}));

const GLTableRowDropdown = ({
  row,
  dropdownRows,
  namespace,
  dropdownColumnDefs,
  enableRowSelect,
  determineColor,
  isItemSelected,
  labelId,
  onCellClick,
}) => {
  const subRows = dropdownRows(row);

  return (
    <>
      {subRows.map(subrow => {
        return (
          <StyledTableRow
            onMouseOver={e => {
              determineHover(e, "visible", subrow, namespace, "dropdown-row");
            }}
            onMouseOut={e => {
              determineHover(e, "hidden", subrow, namespace, "dropdown-row");
            }}
            hover
            key={subrow}
            id={`${namespace}-dropdown-row-${subrow}`}
            data-test={`${namespace}-subrow`}
          >
            {enableRowSelect && (
              <TableCell padding="checkbox" key={row._id || row.id}>
                <StyledCheckbox
                  size="large"
                  color="primary"
                  determineColor={() => determineColor?.(subrow)}
                  inputProps={{
                    "aria-labelledby": labelId,
                    "aria-label": labelId,
                    "data-test": `${namespace}-checkbox`,
                  }}
                  onClick={onCellClick}
                />
              </TableCell>
            )}
            {dropdownColumnDefs.map(column => {
              const value = typeof column.display === "function" ? column.display(subrow) : subrow[column.display];
              return (
                <TableCell
                  key={column.title}
                  colSpan={column.colSpan || 1}
                  align={column.align}
                  data-test={`${namespace}-cell-${subrow}`}
                >
                  {value}
                </TableCell>
              );
            })}
          </StyledTableRow>
        );
      })}
    </>
  );
};

GLTableRowDropdown.propTypes = {
  dropdownRows: PropTypes.array.isRequired,
  namespace: PropTypes.string.isRequired,
  dropdownColumnDefs: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
};

export default GLTableRowDropdown;
