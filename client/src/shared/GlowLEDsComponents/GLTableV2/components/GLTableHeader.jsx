import React from "react";
import PropTypes from "prop-types";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useDispatch } from "react-redux";
import { selectAllRows, toggleSort } from "../actions/actions";

const GLTableHeader = ({ columns, order, orderBy, numSelected, rowCount, enableRowSelect, namespace }) => {
  const dispatch = useDispatch();
  const onSort = index => {
    if (index === orderBy) {
      dispatch(toggleSort(namespace, index, order === "asc" ? "desc" : "asc"));
    } else {
      dispatch(toggleSort(namespace, index, "asc"));
    }
  };
  return (
    <TableHead data-test="table-head">
      <TableRow>
        {enableRowSelect && (
          <TableCell
            style={{ height: "56px", backgroundColor: "#f1f1f1" }}
            padding={enableRowSelect ? "checkbox" : "default"}
            data-test={`${namespace}-checkbox-all`}
          >
            <Checkbox
              id="tableSelectAll"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onClick={() => dispatch(selectAllRows(namespace))}
              inputProps={{ "aria-label": "select all" }}
            />
          </TableCell>
        )}
        {columns.map((column, idx) =>
          column.nonSortable ? (
            <TableCell
              variant="head"
              key={column.title}
              align={column.align}
              style={{
                padding: "0 10px",
                height: "56px",
                backgroundColor: "#f1f1f1",
                minWidth: column.minwidth,
                width: column.width
              }}
              padding={column.disablePadding ? "none" : "normal"}
            >
              {column.title}
            </TableCell>
          ) : (
            <TableCell
              variant="head"
              key={column.title}
              align={column.align}
              style={{
                padding: "0 10px",
                height: "56px",
                backgroundColor: "#f1f1f1",
                minWidth: column.minwidth,
                width: column.width
              }}
              padding={column.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === idx ? order : false}
            >
              <TableSortLabel
                id={`tableHeaderColumn-${idx + 1}`}
                data-test={`tableHeaderColumn-${idx + 1}`}
                active={orderBy === idx}
                direction={orderBy === idx ? order : "desc"}
                onClick={() => onSort(idx)}
              >
                <div style={{ paddingLeft: column.align === "center" ? "15px" : "0px" }}>{column.title}</div>
              </TableSortLabel>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

GLTableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  namespace: PropTypes.string.isRequired,
  enableRowSelect: PropTypes.bool.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default GLTableHeader;
