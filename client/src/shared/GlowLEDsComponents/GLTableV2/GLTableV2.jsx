/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Table, TablePagination, Divider, Paper, TableBody, TableRow, TableCell, Typography, Skeleton } from "@mui/material";
import mapValues from "lodash/mapValues";
import at from "lodash/at";
import times from "lodash/times";
import { useDispatch, useSelector } from "react-redux";
import {
  GLTableHeader,
  GLTableRow,
  GLTableRowDropdown,
  GLTableFilterDropdown,
  GLTableToolbar,
  GLTableSearch,
  GLTableFilterChips
} from "./components";
import glTable from "./glTable.module.scss";
import "./glTable.scss";
import { isItemSelected, visibleSelected } from "./glTableHelpers";
import { addRows, updatePage, updatePageSize, fetchTablePage, fetchTableFilters } from "./actions/actions";

// const useStyles = makeStyles(() => ({
//   palette: {
//     background: {
//       default: "#4e5061"
//     },
//     text: {
//       primary: "#ffffff"
//     }
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#4e5061"
//         }
//       }
//     },
//     MuiTableRow: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#343540"
//         }
//       },
//       head: {
//         backgroundColor: "#343540 !important"
//       }
//     },
//     MuiCheckbox: {
//       styleOverrides: {
//         root: {
//           color: "#fff"
//         }
//       }
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           color: "#ffffff"
//         }
//       },
//       head: {
//         color: "white !important"
//       }
//     },
//     MuiTypography: {
//       styleOverrides: {
//         root: {
//           color: "#ffffff"
//         }
//       }
//     },
//     MuiTablePagination: {
//       styleOverrides: {
//         caption: {
//           color: "#ffffff"
//         },
//         select: {
//           color: "#ffffff"
//         }
//       }
//     }
//   }
// }));

const GLTableV2 = ({
  remoteApi,
  remoteFiltersApi,
  tableName,
  namespace,
  namespaceScope,
  rows,
  columnDefs,
  nonTagFilters,
  availableFiltersProp,
  enableRowSelect,
  enableDropdownRow,
  dropdownColumnDefs,
  enableSearch,
  restrictSearchChars,
  searchPlaceholder,
  dropdownRowsName,
  rowName,
  minItemsToShowFilter,
  withCheckbox,
  minFilterLength,
  titleActions,
  enableRowClick,
  loading,
  onRowClick,
  rowProps,
  cellProps,
  noContentMessage,
  containerClassNames,
  style,
  remoteVersionRequirement,
  determine_color
}) => {
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const tableState = useSelector(state => {
    if (namespaceScope) {
      // This allows deeply nested navigation like "a.b.c". See: https://lodash.com/docs/4.17.15#at
      return at(state, namespaceScope)[0][namespace];
    } else {
      return state[namespace];
    }
  });

  const {
    search,
    filters,
    page,
    pageSize,
    sorting,
    filteredRows,
    visibleRows,
    selectedRows,
    expandRow,
    menuOpen,
    menuSelection,
    availableFilters,
    filterSearch,
    remote: { remoteCount, isLoadingFilters, isRemoteLoading, latestRemoteVersionTimestamp }
  } = tableState;

  useEffect(() => {
    dispatch(
      addRows(namespace, {
        rows,
        columnDefs,
        nonTagFilters,
        filters: mapValues(availableFiltersProp, () => []),
        availableFilters: availableFiltersProp,
        isRemote: !!remoteApi
      })
    );
  }, [remoteApi, availableFiltersProp, columnDefs, dispatch, namespace, nonTagFilters, rows]);

  useEffect(() => {
    if (remoteApi) {
      if (isMounted.current) {
        // When search changes we want to have some debounce to API calls
        const remoteApiTimeout = setTimeout(() => {
          dispatch(fetchTablePage(namespace, { remoteApi, search, filters, sorting, page, pageSize }));
        }, 1000);

        return () => {
          clearTimeout(remoteApiTimeout);
        };
      } else {
        isMounted.current = true;
      }
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, remoteApi, search]);

  useEffect(() => {
    // When filters, sorting or paging changes we want to fire an API call immediately
    if (remoteApi) {
      dispatch(fetchTablePage(namespace, { remoteApi, search, filters, sorting, page, pageSize }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, remoteApi, namespace, filters, sorting, page, pageSize]);

  useEffect(() => {
    // When a newer page version is required
    if (remoteApi && remoteVersionRequirement > latestRemoteVersionTimestamp) {
      dispatch(fetchTablePage(namespace, { remoteApi, search, filters, sorting, page, pageSize }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, remoteApi, namespace, remoteVersionRequirement]);

  useEffect(() => {
    if (remoteFiltersApi) {
      dispatch(fetchTableFilters(namespace, { remoteFiltersApi }));
    }
  }, [dispatch, namespace, remoteFiltersApi]);

  const numSelected = selectedRows.length;
  const hiddenSelected = numSelected - visibleSelected(visibleRows, selectedRows);
  const rowCount = remoteCount || filteredRows.length;
  const hasFilters = availableFilters && Object.keys(availableFilters).length > 0;
  return (
    <div style={{ overflowX: "scroll" }} className="w-100per">
      <Paper className={containerClassNames} style={{ ...style, margin: "1px", minWidth: "750px" }} data-test="glTable">
        <GLTableToolbar
          tableName={tableName}
          numSelected={numSelected}
          hiddenSelected={hiddenSelected}
          rowCount={rowCount}
          enableRowSelect={enableRowSelect}
          titleActions={titleActions}
          hasFilters={hasFilters}
          filteredRowCount={filteredRows.length}
        >
          <div className={glTable.headerActions}>
            {isLoadingFilters ||
              (hasFilters && (
                <div className={glTable.filterContainer}>
                  <GLTableFilterDropdown
                    namespace={namespace}
                    availableFilters={availableFilters}
                    filters={filters}
                    menuOpen={menuOpen}
                    menuSelection={menuSelection}
                    minItemsToShowFilter={minItemsToShowFilter}
                    withCheckbox={withCheckbox}
                    minFilterLength={minFilterLength}
                    filterSearch={filterSearch}
                    isLoading={isLoadingFilters}
                  />
                  <GLTableFilterChips namespace={namespace} filters={filters} menuOpen={menuOpen} maxChips={3} />
                </div>
              ))}
            {!hasFilters && titleActions === null && (
              <div>
                {enableRowSelect && numSelected > 0 ? (
                  <div data-test="tableToolbarTitle">
                    <Typography variant="h6" color="textPrimary" component="div">
                      {numSelected} Selected
                    </Typography>
                    {hiddenSelected > 0 && <sup className={glTable.subtextWrapper}>{hiddenSelected} not shown on the current page</sup>}
                  </div>
                ) : (
                  <Typography variant="h6" data-test="tableToolbarTitle" id="tableTitle" component="div">
                    {`${tableName} (${rowCount})`}
                  </Typography>
                )}
              </div>
            )}
            {!hasFilters && titleActions && <div />}
            <div className={glTable.searchContainer}>
              {enableSearch && (
                <GLTableSearch
                  autoFocus
                  restrictSearchChars={restrictSearchChars}
                  namespace={namespace}
                  placeholder={searchPlaceholder}
                  search={search}
                />
              )}
            </div>
          </div>
        </GLTableToolbar>

        <Divider />
        <Table aria-labelledby={tableName}>
          <GLTableHeader
            columns={columnDefs}
            enableRowSelect={enableRowSelect}
            numSelected={selectedRows.length}
            namespace={namespace}
            rowCount={rowCount}
            order={sorting[1]}
            orderBy={sorting[0]}
          />
          <TableBody data-test={`${namespace}-table-body`}>
            {loading || isRemoteLoading
              ? times(pageSize || 10, index => (
                  <TableRow key={`${index}-skeleton-row`} data-test="loading-row">
                    {times(columnDefs.length + 1, i => (
                      <TableCell key={`${i}-skeleton-cell`}>
                        <Skeleton animation="wave" variant="rect" height={40} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : visibleRows &&
                visibleRows.map((row, index) => {
                  return (
                    <GLTableRow
                      key={row.id}
                      row={row}
                      enableRowSelect={enableRowSelect}
                      isItemSelected={isItemSelected(row.id, selectedRows)}
                      labelId={`${tableName && tableName.toLowerCase()}-${index}`}
                      index={index}
                      columnDefs={columnDefs}
                      enableDropdownRow={enableDropdownRow}
                      dropdownColumnDefs={dropdownColumnDefs}
                      namespace={namespace}
                      rowName={rowName}
                      enableRowClick={enableRowClick}
                      onRowClick={onRowClick}
                      rowProps={rowProps}
                      cellProps={cellProps}
                      determine_color={determine_color}
                    >
                      {enableDropdownRow && expandRow === row[rowName] && (
                        <GLTableRowDropdown
                          row={row}
                          dropdownRows={row[dropdownRowsName]}
                          dropdownColumnDefs={dropdownColumnDefs}
                          namespace={namespace}
                        />
                      )}
                    </GLTableRow>
                  );
                })}
          </TableBody>
        </Table>
        {!loading && visibleRows.length === 0 && <p style={{ textAlign: "center" }}>{noContentMessage}</p>}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={rowCount}
          rowsPerPage={pageSize}
          page={page}
          onPageChange={(e, v) => dispatch(updatePage(namespace, v))}
          onRowsPerPageChange={e => dispatch(updatePageSize(namespace, e.target.value))}
        />
      </Paper>
    </div>
  );
};

GLTableV2.defaultProps = {
  remoteApi: undefined,
  remoteFiltersApi: undefined,
  tableName: "",
  namespace: "",
  namespaceScope: null,
  rows: [],
  nonTagFilters: ["departments", "locations"],
  dropdownColumnDefs: [{}],
  availableFiltersProp: {},
  enableRowSelect: true,
  enableDropdownRow: false,
  enableSearch: true,
  restrictSearchChars: x => x,
  searchPlaceholder: "Search By Name",
  dropdownRowsName: "",
  rowName: "",
  minItemsToShowFilter: 10,
  withCheckbox: true,
  minFilterLength: 1,
  titleActions: null,
  enableRowClick: false,
  loading: false,
  determine_color: false,
  onRowClick: x => x,
  rowProps: () => ({}),
  cellProps: () => ({}),
  noContentMessage: "No Content",
  containerClassNames: "",
  style: {},
  remoteVersionRequirement: 0
};

GLTableV2.propTypes = {
  // If supplied then requests each page from backend and reacts to search/sort/filter/etc.
  remoteApi: PropTypes.func,
  // If supplied fetches available filters using this function
  remoteFiltersApi: PropTypes.func,
  // Pass a timestamp to make sure we show page version that was fetched after that timestamp.
  // This can be useful to force page refresh without changing any other props (filters, page, etc.)
  // Example: you want to re-fetch the current page after you just deleted/archived a record.
  remoteVersionRequirement: PropTypes.number,
  tableName: PropTypes.string,
  // Used when the namespace state is nested (e.g. namespace = "qualificationsTable", scope = "qualifications")
  namespaceScope: PropTypes.string,
  rows: PropTypes.array,
  columnDefs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      display: PropTypes.func.isRequired,
      // Describes how rows are compared when sorted by this column (e.g. if you sort by status
      // you might need to transform status string into a number)
      sortBy: PropTypes.func,
      minwidth: PropTypes.number,
      width: PropTypes.number,
      align: PropTypes.string, // Align optioms: left, right, center
      colSpan: PropTypes.number, // How many table columns it should span (default: 1)
      nonSortable: PropTypes.bool,
      nonSelectable: PropTypes.bool
    })
  ).isRequired,
  dropdownColumnDefs: PropTypes.array,
  nonTagFilters: PropTypes.array,
  enableSearch: PropTypes.bool,
  namespace: PropTypes.string,
  availableFiltersProp: PropTypes.object,
  enableRowSelect: PropTypes.bool,
  enableDropdownRow: PropTypes.bool,
  restrictSearchChars: PropTypes.func,
  determine_color: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  dropdownRowsName: PropTypes.string,
  rowName: PropTypes.string,
  minItemsToShowFilter: PropTypes.number,
  withCheckbox: PropTypes.bool,
  minFilterLength: PropTypes.number,
  noContentMessage: PropTypes.string,
  titleActions: PropTypes.object,
  containerClassNames: PropTypes.string,
  style: PropTypes.object,
  enableRowClick: PropTypes.bool,
  loading: PropTypes.bool,
  onRowClick: PropTypes.func,
  rowProps: PropTypes.func,
  cellProps: PropTypes.func
};

export default GLTableV2;
