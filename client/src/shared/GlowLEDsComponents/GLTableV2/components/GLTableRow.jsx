import React, { useEffect } from "react";
import PropTypes from "prop-types";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { determineHover, determineRowStyles, rowCheckboxClicked, tableColors } from "../glTableHelpers";
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
  determineColor,
  provided,
  innerRef,
  dropdownAction,
  singleSelect,
  selectedRows,
}) => {
  const dispatch = useDispatch();

  const onCellClick = e => {
    dropdownAction(row);
    if (enableDropdownRow) {
      if (rowCheckboxClicked(e.target)) {
        dispatch(selectRow(namespace, row._id || row.id));
        return;
      }
      dispatch(onExpandRow(namespace, name));
    } else if (enableRowClick) {
      if (enableRowSelect && rowCheckboxClicked(e.target)) {
        dispatch(selectRow(namespace, row._id || row.id));
        return;
      }
      onRowClick(e, row);
      handleRowSelection(e, row);
    } else {
      if (e.target.href) {
        return;
      }
      dispatch(selectRow(namespace, row._id || row.id));
    }
  };

  const isCheckboxDisabled = singleSelect && selectedRows.length > 0 && !selectedRows.includes(row._id || row.id);

  const name = row[rowName] || row._id || row.id;

  const styles = determineRowStyles(row, isCheckboxDisabled, determineColor);

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
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          "&:hover": {
            backgroundColor: isCheckboxDisabled
              ? `${styles.backgroundColor} !important`
              : `${styles.hoverBackgroundColor} !important`,
          },
          "&.Mui-selected": {
            backgroundColor: `${
              determineColor ? darken(determineColor(row), 0.3) : darken(tableColors.active, 0.3)
            } !important`,
            "&:hover": {
              backgroundColor: `${
                determineColor ? darken(determineColor(row), 0.5) : darken(tableColors.active, 0.3)
              } !important`,
            },
          },
        }}
        key={`hardCodedUniqueKeyRow_${labelId}-row`}
        data-fake-key={labelId}
        selected={enableRowSelect && isItemSelected}
        id={`${namespace}-row-${name}`}
        data-test={`${namespace}-row-${name}`.replace(/ +/g, "_")}
        data-test-multi={`${namespace}-row`}
        {...(innerRef ? { ref: innerRef } : {})}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        {...rowProps(row)}
      >
        {enableRowSelect && (
          <TableCell padding="checkbox" key={`hardCodedUniqueKeyCheckbox_${labelId}_0`}>
            <Checkbox
              size="large"
              disabled={isCheckboxDisabled}
              color="primary"
              sx={{
                color: styles.checkboxColor,
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
                "& .Mui-checked": {
                  color: "white",
                  backgroundColor: determineColor ? determineColor(row) : "#",
                },
                "&:hover": {
                  backgroundColor: isCheckboxDisabled
                    ? `${styles.backgroundColor} !important`
                    : `${styles.hoverBackgroundColor} !important`,
                },
              }}
              checked={enableRowSelect && isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
                "aria-label": labelId,
                "data-test": `${namespace}-checkbox`,
              }}
              onClick={onCellClick}
            />
          </TableCell>
        )}
        {columnDefs.map((column, index) => {
          const value = typeof column.display === "function" ? column.display(row) : row[column.display];
          return (
            <TableCell
              key={`hardCodedUniqueKeyCell_${labelId}_${index + 100}`}
              data-fake-key={`hardCodedUniqueKeyCell_${labelId}_${index + 100}`}
              {...cellProps(row)}
              align={column.align}
              colSpan={column.colSpan || 1}
              data-test={`${namespace}-cell`}
              onClick={column.nonSelectable || isCheckboxDisabled ? () => {} : onCellClick}
              sx={{
                color: styles.color,
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
  determineColor: false,
  rowName: "id",
  enableRowSelect: true,
  enableDropdownRow: false,
  extendedRowComponent: false,
  rowProps: () => ({}),
  cellProps: () => ({}),
  innerRef: null,
  provided: {},
  dropdownAction: x => x,
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
  determineColor: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  cellProps: PropTypes.func,
  dropdownAction: PropTypes.func,
  innerRef: PropTypes.object,
  provided: PropTypes.object,
};

export default GLTableRow;
