import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { dropdownRowIdentifier, isItemSelected } from "../glTableHelpers";
import { selectAllDropdownRows, selectDropdownRow } from "../reducers/glTableActions";
import useTableState from "../useTableState";

// eslint-disable-next-line max-lines-per-function
const GLTableRowDropdown = ({
  row,
  namespace,
  namespaceScope,
  index,
  determineDropdownRowColor,
  tableName,
  dropdownColumnDefs,
  dropdownRowsUniqueKey,
  dropdownUniqueKey,
  enableDropdownRowSelect,
  determineDropdownRowSelectDisabled,
  determineAllDropdownRowSelectDisabled,
}) => {
  const individualTableState = useTableState(namespace, namespaceScope);

  const { selectedDropdownRows } = individualTableState;
  const dispatch = useDispatch();

  const dropdownRows = row[dropdownRowsUniqueKey];

  const labelId = `${tableName && tableName.toLowerCase()}-${index}`;

  const visibleDropdownColumns = dropdownColumnDefs.filter(column => !column.hidden);

  return (
    <Box width="100%" style={{ borderBottomLeftRadius: "15px", borderBottom: "" }}>
      <Table size="small" aria-label="details" style={{ width: "100%" }}>
        <TableHead>
          <TableRow style={{ backgroundColor: "#fafafa" }}>
            {enableDropdownRowSelect && (
              <TableCell
                style={{ height: "56px", backgroundColor: "#fafafa" }}
                padding={enableDropdownRowSelect ? "checkbox" : "default"}
                data-test={`${namespace}-checkbox-all`}
              >
                <Checkbox
                  id="tableSelectAll"
                  data-test="tableSelectAll"
                  disabled={determineAllDropdownRowSelectDisabled(row)}
                  indeterminate={
                    selectedDropdownRows.some(selectedRow =>
                      dropdownRows.map(dropdownRow => dropdownRow.job_id).includes(selectedRow)
                    ) && !dropdownRows.every(dropdownRow => selectedDropdownRows.includes(dropdownRow.job_id))
                  }
                  checked={dropdownRows.every(dropdownRow => selectedDropdownRows.includes(dropdownRow.job_id))}
                  onClick={() =>
                    dispatch(selectAllDropdownRows(namespace, row, dropdownUniqueKey, dropdownRowsUniqueKey))
                  }
                  inputProps={{ "aria-label": "select all" }}
                />
              </TableCell>
            )}
            {visibleDropdownColumns.map(column => (
              <TableCell key={column.title} align={column.align || "left"} style={{ backgroundColor: "#fafafa" }}>
                {column?.headerColumnAction ? column?.headerColumnAction(row) : column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dropdownRows.map((subRow, subRowIndex) => {
            const rowIdentifier = dropdownRowIdentifier(subRow, dropdownUniqueKey);
            const itemSelected = enableDropdownRowSelect && isItemSelected(rowIdentifier, selectedDropdownRows);
            const isLastRow = subRowIndex === dropdownRows.length - 1;

            return (
              <TableRow
                sx={{
                  ...(determineDropdownRowSelectDisabled(row, subRow)
                    ? {}
                    : {
                        "&:hover": {
                          background: "#0000000a !important",
                        },
                      }),
                }}
                // eslint-disable-next-line react/no-array-index-key
                key={`${namespace}-dropdown-row-${rowIdentifier}-${subRowIndex}`}
                hover
                role="checkbox"
                aria-checked={itemSelected}
                tabIndex={-1}
                selected={itemSelected}
                id={`${namespace}-dropdown-row-${rowIdentifier}`}
                data-test={`${namespace}-dropdown-row-${rowIdentifier}`.replace(/ +/g, "_")}
                data-test-multi={`${namespace}-dropdown-row`}
                style={{
                  background: determineDropdownRowColor(row, subRow),
                  borderBottom: isLastRow ? "transparent" : "1px solid #0000001f",
                  borderBottomLeftRadius: isLastRow ? "15px" : "0",
                }}
              >
                {enableDropdownRowSelect && (
                  <TableCell
                    padding="checkbox"
                    key={`${rowIdentifier}-checkbox`}
                    sx={{
                      ...(isLastRow
                        ? {
                            borderBottomLeftRadius: "15px",
                            "&:hover": {
                              background: "#0000000a !important",
                            },
                          }
                        : {}),
                    }}
                  >
                    <Checkbox
                      color="primary"
                      disabled={determineDropdownRowSelectDisabled(row, subRow)}
                      checked={itemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                        "aria-label": labelId,
                        "data-test-multi": `${namespace}-checkbox`,
                        "data-test": `${namespace}-checkbox-${rowIdentifier}`,
                      }}
                      onClick={() => {
                        dispatch(selectDropdownRow(namespace, rowIdentifier, dropdownUniqueKey, dropdownRowsUniqueKey));
                      }}
                    />
                  </TableCell>
                )}
                {visibleDropdownColumns.map((column, columnIndex) => {
                  const value =
                    typeof column.display === "function"
                      ? column.display(row, subRow, columnIndex, individualTableState)
                      : subRow[column.display];
                  const isLastColumn = columnIndex === visibleDropdownColumns.length - 1;

                  return (
                    <TableCell
                      style={{
                        borderBottom: isLastRow ? "transparent" : "1px solid #0000001f",
                        borderBottomLeftRadius: isLastRow ? "15px" : "0",
                      }}
                      key={column.title}
                      component="th"
                      scope="row"
                      sx={{
                        ...(isLastRow && isLastColumn ? { borderBottomRightRadius: "15px" } : {}),
                      }}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

GLTableRowDropdown.propTypes = {
  row: PropTypes.object.isRequired,
  namespace: PropTypes.string.isRequired,
  namespaceScope: PropTypes.string,
  index: PropTypes.number.isRequired,
  determineDropdownRowColor: PropTypes.func,
  tableName: PropTypes.string,
  dropdownColumnDefs: PropTypes.array,
  dropdownRowsUniqueKey: PropTypes.string,
  dropdownUniqueKey: PropTypes.string,
  enableDropdownRowSelect: PropTypes.bool,
  determineDropdownRowSelectDisabled: PropTypes.func,
  determineAllDropdownRowSelectDisabled: PropTypes.func,
};

GLTableRowDropdown.defaultProps = {
  namespaceScope: "",
  determineDropdownRowColor: null,
  tableName: "",
  dropdownColumnDefs: [],
  dropdownRowsUniqueKey: "id",
  dropdownUniqueKey: "id",
  enableDropdownRowSelect: false,
  determineDropdownRowSelectDisabled: () => false,
  determineAllDropdownRowSelectDisabled: () => false,
};

export default GLTableRowDropdown;
