/* eslint-disable max-lines-per-function */
import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useDispatch } from "react-redux";
import { toggleAllDropdownRows, selectAllRows, toggleSort } from "../reducers/glTableActions";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import useTableState from "../useTableState";
import { determineExpandAllIcon, determineExpandAllTooltip } from "../glTableHelpers";

const GLTableHeaderGroup = ({
  namespace,
  namespaceScope,
  enableDropdownRow,
  enableRowSelect,
  rowCount,
  uniqueKey,
  noPagination,
  enableDnd,
}) => {
  console.log({
    namespace,
    namespaceScope,
    enableDropdownRow,
    enableRowSelect,
    rowCount,
    uniqueKey,
    noPagination,
    enableDnd,
  });
  const dispatch = useDispatch();

  const individualTableState = useTableState(namespace, namespaceScope);

  const { expandedRows, visibleRows, columnDefs, sorting, selectedRows } = individualTableState;

  const orderBy = sorting[0];
  const order = sorting[1];

  const onSort = index => {
    if (index === orderBy) {
      dispatch(toggleSort(namespace, index, order === "asc" ? "desc" : "asc"));
    } else {
      dispatch(toggleSort(namespace, index, "asc"));
    }
  };
  console.log({ expandedRows, visibleRows, columnDefs, sorting, selectedRows });

  const visibleColumns = columnDefs?.filter(column => !column.hidden);

  return (
    <div
      data-test="table-head"
      style={{
        alignItems: "center",
        backgroundColor: "#ebebeb",
        boxShadow:
          "0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2)",
        display: "grid",
        gridTemplateColumns: `${enableRowSelect ? "70px " : ""}${enableDropdownRow ? "70px " : ""}repeat(${visibleColumns.length}, 1fr) ${enableDnd ? "70px" : ""}`,
        width: "100%",
        position: noPagination ? "sticky" : "static",
      }}
    >
      {enableRowSelect && (
        <div style={{ padding: "8px 24px", height: "56px", display: "flex", alignItems: "center" }}>
          <Checkbox
            id="tableSelectAll"
            data-test="tableSelectAll"
            indeterminate={selectedRows.length > 0 && selectedRows.length < rowCount}
            checked={rowCount > 0 && selectedRows.length === rowCount}
            onClick={() => dispatch(selectAllRows(namespace, uniqueKey))}
            inputProps={{ "aria-label": "select all" }}
          />
        </div>
      )}
      {enableDropdownRow && (
        <div style={{ padding: "14px", height: "56px", display: "flex", alignItems: "center" }}>
          <Tooltip title={determineExpandAllTooltip(expandedRows, visibleRows)} placement="top">
            <IconButton
              aria-label="expand or collapse all rows"
              data-test="expandAllButton"
              size="small"
              onClick={() => {
                dispatch(toggleAllDropdownRows(namespace, uniqueKey));
              }}
            >
              {determineExpandAllIcon(expandedRows, visibleRows)}
            </IconButton>
          </Tooltip>
        </div>
      )}
      {columnDefs.map((column, idx) => (
        <div
          key={column.title}
          style={{
            flexGrow: 1,
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
            backgroundColor: "#ebebeb",
            display: column.hidden ? "none" : "flex",
            alignItems: "center",
            justifyContent: column.align === "right" ? "flex-end" : "flex-start",
            textAlign: column.align,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
          }}
        >
          {column.nonSortable ? (
            <div style={{ width: "100%", textAlign: column.align }}>
              {enableDnd && idx !== columnDefs.length - 1 && column?.headerColumnAction
                ? column.headerColumnAction()
                : column.title}
            </div>
          ) : (
            <TableSortLabel
              id={`tableHeaderColumn-${idx + 1}`}
              data-test={`tableHeaderColumn-${idx + 1}`}
              active={orderBy === idx}
              direction={orderBy === idx ? order : "desc"}
              onClick={() => onSort(idx)}
              style={{
                width: "100%",
                textAlign: column.align,
              }}
            >
              {enableDnd && idx !== columnDefs.length - 1 && column?.headerColumnAction
                ? column.headerColumnAction()
                : column.title}
            </TableSortLabel>
          )}
        </div>
      ))}
      {enableDnd && (
        <div
          style={{
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
            backgroundColor: "#ebebeb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {columnDefs[columnDefs.length - 1]?.headerColumnAction
            ? columnDefs[columnDefs.length - 1]?.headerColumnAction()
            : ""}
        </div>
      )}
    </div>
  );
};

GLTableHeaderGroup.defaultProps = {
  namespaceScope: null,
  enableDropdownRow: false,
  enableRowSelect: false,
  rowCount: 0,
  uniqueKey: "",
  noPagination: false,
  enableDnd: false,
};

GLTableHeaderGroup.propTypes = {
  namespace: PropTypes.string.isRequired,
  namespaceScope: PropTypes.string,
  enableDropdownRow: PropTypes.bool,
  enableRowSelect: PropTypes.bool,
  rowCount: PropTypes.number,
  uniqueKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  noPagination: PropTypes.bool,
  enableDnd: PropTypes.bool,
};

export default GLTableHeaderGroup;
