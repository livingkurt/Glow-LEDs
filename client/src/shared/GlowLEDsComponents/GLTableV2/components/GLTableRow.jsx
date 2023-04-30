import React from "react";
import PropTypes from "prop-types";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { determineHover, rowCheckboxClicked, tableColors } from "../glTableHelpers";
import { onExpandRow, selectRow } from "../actions/actions";
import { darken } from "@mui/material";

const GLTableRow = ({
  row,
  isItemSelected,
  labelId,
  columnDefs,
  enableRowSelect,
  enableDropdownRow,
  namespace,
  children,
  rowName,
  enableRowClick,
  onRowClick,
  handleRowSelection,
  rowProps,
  cellProps,
  determine_color,
  provided,
  innerRef,
  dropdownAction
}) => {
  const dispatch = useDispatch();

  const onCellClick = e => {
    dropdownAction(row);
    if (enableDropdownRow) {
      if (rowCheckboxClicked(e.target)) {
        dispatch(selectRow(namespace, row._id));
        return;
      }
      dispatch(onExpandRow(namespace, name));
    } else if (enableRowClick) {
      if (enableRowSelect && rowCheckboxClicked(e.target)) {
        dispatch(selectRow(namespace, row._id));
        return;
      }
      onRowClick(e, row);
      handleRowSelection(e, row);
    } else {
      if (e.target.href) {
        return;
      }
      dispatch(selectRow(namespace, row._id));
    }
  };

  const name = row[rowName] || row._id;

  return (
    <>
      <TableRow
        hover
        onMouseOver={e => {
          determineHover(e, "visible", name, namespace, "row");
        }}
        onMouseOut={e => {
          determineHover(e, "hidden", name, namespace, "row");
        }}
        role="checkbox"
        aria-checked={enableRowSelect && isItemSelected}
        tabIndex={-1}
        sx={{
          backgroundColor: determine_color ? determine_color(row) : tableColors.active, // Set background color based on attribute value
          "&:hover": {
            backgroundColor: `${determine_color ? darken(determine_color(row), 0.3) : darken(tableColors.active, 0.3)} !important`
          },
          "&.Mui-selected": {
            backgroundColor: `${determine_color ? darken(determine_color(row), 0.3) : darken(tableColors.active, 0.3)} !important`,
            "&:hover": {
              backgroundColor: `${determine_color ? darken(determine_color(row), 0.5) : darken(tableColors.active, 0.3)} !important`
            }
          }
        }}
        key={row._id}
        selected={enableRowSelect && isItemSelected}
        id={`${namespace}-row-${name}`}
        data-test={`${namespace}-row-${name}`.replace(/ +/g, "_")}
        data-test-multi={`${namespace}-row`}
        ref={innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        {...rowProps(row)}
      >
        {enableRowSelect && (
          <TableCell padding="checkbox" key={row._id}>
            <Checkbox
              size="large"
              color="primary"
              sx={{
                color: determine_color ? "white" : "",
                "& .MuiSvgIcon-root": {
                  color: "white"
                },
                "& .Mui-checked": {
                  color: "white",
                  backgroundColor: determine_color ? determine_color(row) : "#"
                },
                "&:hover": {
                  backgroundColor: `${determine_color ? darken(determine_color(row), 0.3) : "white"} !important`
                }
              }}
              checked={enableRowSelect && isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
                "aria-label": labelId,
                "data-test": `${namespace}-checkbox`
              }}
              onClick={onCellClick}
            />
          </TableCell>
        )}
        {columnDefs.map(column => {
          const value = typeof column.display === "function" ? column.display(row) : row[column.display];
          return (
            <TableCell
              {...cellProps(row)}
              key={`${column.title}-${row._id}`}
              align={column.align}
              colSpan={column.colSpan || 1}
              data-test={`${namespace}-cell`}
              onClick={column.nonSelectable ? () => {} : onCellClick}
              sx={{
                color: "white"
              }}
            >
              {value}
            </TableCell>
          );
        })}
      </TableRow>
      {children}
    </>
  );
};
GLTableRow.defaultProps = {
  enableRowClick: false,
  onRowClick: x => x,
  determine_color: false,
  rowName: "id",
  enableRowSelect: true,
  enableDropdownRow: false,
  extendedRowComponent: false,
  rowProps: () => ({}),
  cellProps: () => ({}),
  innerRef: {},
  provided: {},
  dropdownAction: x => x
};

GLTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  isItemSelected: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
  columnDefs: PropTypes.array.isRequired,
  enableRowSelect: PropTypes.bool,
  enableDropdownRow: PropTypes.bool,
  rowName: PropTypes.string,
  namespace: PropTypes.string.isRequired,
  enableRowClick: PropTypes.bool,
  onRowClick: PropTypes.func,
  rowProps: PropTypes.func,
  determine_color: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  cellProps: PropTypes.func,
  dropdownAction: PropTypes.func,
  innerRef: PropTypes.object,
  provided: PropTypes.object
};

export default GLTableRow;
