import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { determineHover } from "../glTableHelpers";
import { Checkbox, darken } from "@mui/material";

const useStyles = makeStyles(() => ({
  dropdownRows: {
    cursor: "pointer",
  },
}));

const GLTableRowDropdown = ({
  row,
  dropdownRows,
  namespace,
  dropdownColumnDefs,
  enableRowSelect,
  determine_color,
  isItemSelected,
  labelId,
  onCellClick,
}) => {
  const classes = useStyles();
  // const [selectedRows, selectedRows] = useState([]);
  const subRows = dropdownRows(row);

  return (
    <>
      {subRows.map(subrow => {
        return (
          <TableRow
            onMouseOver={e => {
              determineHover(e, "visible", subrow, namespace, "dropdown-row");
            }}
            onMouseOut={e => {
              determineHover(e, "hidden", subrow, namespace, "dropdown-row");
            }}
            className={classes.dropdownRows}
            hover
            style={{ height: "50px", width: "auto", marginLeft: "10px", backgroundColor: "#f0f0f0" }}
            key={subrow}
            id={`${namespace}-dropdown-row-${subrow}`}
            data-test={`${namespace}-subrow`}
          >
            {enableRowSelect && (
              <TableCell padding="checkbox" key={row._id || row.id}>
                <Checkbox
                  size="large"
                  color="primary"
                  sx={{
                    color: determine_color ? "white" : "",
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                    "& .Mui-checked": {
                      color: "white",
                      backgroundColor: determine_color ? determine_color(subrow) : "#",
                    },
                    "&:hover": {
                      backgroundColor: `${determine_color ? darken(determine_color(subrow), 0.3) : "white"} !important`,
                    },
                  }}
                  // checked={enableRowSelect && isItemSelected(row._id || row.id, selectedRows)}
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
          </TableRow>
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
