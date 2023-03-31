import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { determineHover } from "../glTableHelpers";

const useStyles = makeStyles(() => ({
  dropdownRows: {
    cursor: "pointer"
  }
}));

const GLTableRowDropdown = ({ row, dropdownRows, namespace, dropdownColumnDefs }) => {
  const classes = useStyles();

  return (
    <>
      {dropdownRows.map(subrow => {
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
            {dropdownColumnDefs.map(column => {
              const value = typeof column.display === "function" ? column.display(row, subrow) : subrow[column.display];
              return (
                <TableCell key={column.title} colSpan={column.colSpan || 1} align={column.align} data-test={`${namespace}-cell-${subrow}`}>
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
  row: PropTypes.object.isRequired
};

export default GLTableRowDropdown;
