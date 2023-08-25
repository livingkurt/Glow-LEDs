/* eslint-disable max-lines-per-function */
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TablePagination,
  Divider,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Skeleton,
} from "@mui/material";
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
  GLTableFilterChips,
  GLTableActions,
} from "./components";
import glTable from "./glTable.module.scss";
import "./glTable.scss";
import {
  isItemSelected,
  reorder,
  updateTableStateFromUrl,
  updateUrlWithTableState,
  visibleSelected,
} from "./glTableHelpers";
import {
  addRows,
  updatePage,
  updatePageSize,
  fetchTablePage,
  fetchTableFilters,
  reorderRows,
  updateQuery,
  selectRow,
} from "./actions/actions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useHistory, useLocation } from "react-router-dom";
import GLLegend from "./components/GLLegend";
import GLTablePagination from "./components/GLTablePagination";

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
  dropdownRows,
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
  remoteVersionRequirementType,
  remoteReorderApi,
  determine_color,
  enableDragDrop,
  dropdownComponent,
  colors,
  defaultFilters,
  dropdownAction,
  noURLParams,
}) => {
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
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
    booleanFilters,
    remote: { remoteCount, isLoadingFilters, isRemoteLoading, latestRemoteVersionTimestamp },
  } = tableState;

  useEffect(() => {
    dispatch(
      addRows(namespace, {
        rows,
        columnDefs,
        nonTagFilters,
        filters: mapValues(availableFiltersProp, () => []),
        availableFilters: availableFiltersProp,
        isRemote: !!remoteApi,
      })
    );
  }, [remoteApi, availableFiltersProp, columnDefs, dispatch, namespace, nonTagFilters, rows]);

  useEffect(() => {
    if (remoteApi) {
      if (isMounted.current) {
        // When search changes we want to have some debounce to API calls
        const remoteApiTimeout = setTimeout(() => {
          dispatch(
            fetchTablePage(namespace, {
              remoteApi,
              search,
              filters,
              page,
              pageSize,
              sorting,
            })
          );
          if (!noURLParams) {
            // Call updateUrlWithTableState after the dispatch here
            updateUrlWithTableState({ location, history, search, filters, page, pageSize, sorting });
          }
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
    if (!noURLParams) {
      const { param_search, param_filters, param_page, param_pageSize, param_sorting } = updateTableStateFromUrl({
        location,
        search,
        filters,
        page,
        pageSize,
        sorting,
      });

      // Update the state based on the URL parameters
      dispatch(
        updateQuery(namespace, {
          search: param_search,
          filters: param_filters,
          page: param_page,
          pageSize: param_pageSize,
          sorting: param_sorting,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // When filters, sorting or paging changes we want to fire an API call immediately
    if (remoteApi) {
      dispatch(
        fetchTablePage(namespace, {
          remoteApi,
          search,
          filters,
          page,
          pageSize,
          sorting,
        })
      );
      if (!noURLParams) {
        updateUrlWithTableState({ location, history, search, filters, page, pageSize, sorting });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, remoteApi, namespace, filters, sorting, page, pageSize]);

  useEffect(() => {
    // When a newer page version is required
    if (remoteApi && remoteVersionRequirement > latestRemoteVersionTimestamp) {
      dispatch(
        fetchTablePage(namespace, {
          remoteApi,
          search,
          filters,
          page,
          pageSize,
          sorting,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, remoteApi, namespace, remoteVersionRequirement]);

  useEffect(() => {
    if (remoteFiltersApi) {
      dispatch(fetchTableFilters(namespace, { remoteFiltersApi, defaultFilters }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, namespace, remoteFiltersApi]);

  const numSelected = selectedRows.length;
  const hiddenSelected = numSelected - visibleSelected(visibleRows, selectedRows);
  const rowCount = remoteCount || filteredRows.length;
  const hasFilters = availableFilters && Object.keys(availableFilters).length > 0;

  // const onDragEnd = result => {
  //   if (!result.destination) {
  //     return;
  //   }
  //   const sourceIndex = result.source.index;
  //   const destinationIndex = result.destination.index;

  //   let newItems = [...visibleRows];
  //   const selectedItems = newItems.filter(item => selectedRows.includes(item._id));

  //   newItems = newItems.filter(item => !selectedRows.includes(item._id));

  //   if (sourceIndex < destinationIndex) {
  //     newItems.splice(destinationIndex - selectedItems.length + 1, 0, ...selectedItems);
  //   } else {
  //     newItems.splice(destinationIndex, 0, ...selectedItems);
  //   }

  //   dispatch(
  //     reorderRows(namespace, {
  //       reorderedItems: newItems,
  //       remoteVersionRequirementType,
  //       remoteReorderApi,
  //       page,
  //       pageSize,
  //     })
  //   );
  // };

  const handleRowSelection = (id, cmdPressed) => {
    if (!cmdPressed) {
      dispatch(selectRow([id]));
    } else {
      let newSelectedRows = [];
      const selectedIndex = selectedRows.indexOf(id);
      if (selectedIndex === -1) {
        newSelectedRows = [...selectedRows, id];
      } else {
        newSelectedRows = selectedRows.filter(rowId => rowId !== id);
      }
      dispatch(selectRow(newSelectedRows));
    }
  };

  return (
    <div style={{ overflowX: "scroll" }} className="w-100per">
      <Paper className={containerClassNames} style={{ ...style, margin: "1px" }} data-test="glTable">
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
                    booleanFilters={booleanFilters}
                  />
                  <GLTableFilterChips
                    namespace={namespace}
                    filters={filters}
                    menuOpen={menuOpen}
                    maxChips={3}
                    booleanFilters={booleanFilters}
                  />
                </div>
              ))}
            {!hasFilters && titleActions === null && (
              <div>
                {enableRowSelect && numSelected > 0 ? (
                  <div data-test="tableToolbarTitle">
                    <Typography variant="h6" color="textPrimary" component="div">
                      {numSelected} Selected
                    </Typography>
                    {hiddenSelected > 0 && (
                      <sup className={glTable.subtextWrapper}>{hiddenSelected} not shown on the current page</sup>
                    )}
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
              <div className="ai-c">
                {colors.length > 0 && <GLLegend colors={colors} />}
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
          </div>
        </GLTableToolbar>
        <Divider />
        <GLTablePagination count={rowCount} rowsPerPage={pageSize} namespace={namespace} location="top" page={page} />
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
          {enableDragDrop ? (
            <DragDropContext
              // onDragEnd={onDragEnd}
              onDragEnd={result => {
                if (!result.destination) {
                  return;
                }
                const reorderedItems = reorder(visibleRows, result.source.index, result.destination.index);
                dispatch(
                  reorderRows(namespace, {
                    reorderedItems,
                    remoteVersionRequirementType,
                    remoteReorderApi,
                    page,
                    pageSize,
                  })
                );
              }}
            >
              <Droppable droppableId="droppable">
                {provided => (
                  <TableBody {...provided.droppableProps} ref={provided.innerRef} data-test={`${namespace}-table-body`}>
                    {loading || isRemoteLoading
                      ? times(pageSize || 10, index => (
                          <TableRow key={`${index}-skeleton-row`} data-test="loading-row">
                            <TableCell key="skeleton-cell" colSpan={columnDefs.length + 1} style={{ padding: 12 }}>
                              <Skeleton animation="wave" variant="rect" height={40} style={{ borderRadius: "10px" }} />
                            </TableCell>
                          </TableRow>
                        ))
                      : visibleRows &&
                        visibleRows.map((row, index) => (
                          <Draggable key={row._id || row.id} draggableId={row._id || row.id} index={index}>
                            {provided => (
                              <GLTableRow
                                key={row._id || row.id}
                                row={row}
                                provided={provided}
                                innerRef={provided.innerRef}
                                enableRowSelect={enableRowSelect}
                                isItemSelected={isItemSelected(row._id || row.id, selectedRows)}
                                labelId={`${tableName && tableName.toLowerCase()}-${index}`}
                                index={index}
                                columnDefs={columnDefs}
                                enableDropdownRow={enableDropdownRow}
                                namespace={namespace}
                                rowName={rowName}
                                enableRowClick={enableRowClick}
                                onRowClick={onRowClick}
                                handleRowSelection={handleRowSelection}
                                rowProps={rowProps}
                                cellProps={cellProps}
                                determine_color={determine_color}
                                dropdownAction={dropdownAction}
                              >
                                {enableDropdownRow && expandRow === row[rowName] && (
                                  <>
                                    {!dropdownComponent ? (
                                      <GLTableRowDropdown
                                        row={row}
                                        enableRowSelect={enableRowSelect}
                                        determine_color={determine_color}
                                        isItemSelected={isItemSelected}
                                        dropdownRows={dropdownRows}
                                        dropdownColumnDefs={dropdownColumnDefs}
                                        namespace={namespace}
                                      />
                                    ) : (
                                      dropdownComponent(row)
                                    )}
                                  </>
                                )}
                              </GLTableRow>
                            )}
                          </Draggable>
                        ))}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <TableBody data-test={`${namespace}-table-body`}>
              {loading || isRemoteLoading
                ? times(pageSize || 10, index => (
                    <TableRow key={`${index}-skeleton-row`} data-test="loading-row">
                      <TableCell key="skeleton-cell" colSpan={columnDefs.length + 1} style={{ padding: 12 }}>
                        <Skeleton animation="wave" variant="rect" height={40} style={{ borderRadius: "10px" }} />
                      </TableCell>
                    </TableRow>
                  ))
                : visibleRows &&
                  visibleRows.map((row, index) => (
                    <GLTableRow
                      key={row._id || row.id}
                      row={row}
                      enableRowSelect={enableRowSelect}
                      isItemSelected={isItemSelected(row._id || row.id, selectedRows)}
                      labelId={`${tableName && tableName.toLowerCase()}-${index}`}
                      index={index}
                      columnDefs={columnDefs}
                      enableDropdownRow={enableDropdownRow}
                      namespace={namespace}
                      rowName={rowName}
                      enableRowClick={enableRowClick}
                      onRowClick={onRowClick}
                      rowProps={rowProps}
                      cellProps={cellProps}
                      determine_color={determine_color}
                      dropdownAction={dropdownAction}
                    >
                      {enableDropdownRow && expandRow === row[rowName] && (
                        <>
                          {!dropdownComponent ? (
                            <GLTableRowDropdown
                              row={row}
                              enableRowSelect={enableRowSelect}
                              determine_color={determine_color}
                              isItemSelected={isItemSelected}
                              dropdownRows={dropdownRows}
                              dropdownColumnDefs={dropdownColumnDefs}
                              namespace={namespace}
                            />
                          ) : (
                            dropdownComponent(row)
                          )}
                        </>
                      )}
                    </GLTableRow>
                  ))}
            </TableBody>
          )}
        </Table>
        <GLTablePagination count={rowCount} rowsPerPage={pageSize} namespace={namespace} location="top" page={page} />
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
  remoteVersionRequirement: 0,
  enableDragDrop: false,
  dropdownComponent: false,
  colors: [],
  noURLParams: false,
  dropdownAction: x => x,
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
      nonSelectable: PropTypes.bool,
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
  rowName: PropTypes.string,
  minItemsToShowFilter: PropTypes.number,
  withCheckbox: PropTypes.bool,
  minFilterLength: PropTypes.number,
  noContentMessage: PropTypes.string,
  titleActions: PropTypes.object,
  containerClassNames: PropTypes.string,
  style: PropTypes.object,
  enableRowClick: PropTypes.bool,
  enableDragDrop: PropTypes.bool,
  loading: PropTypes.bool,
  onRowClick: PropTypes.func,
  rowProps: PropTypes.func,
  cellProps: PropTypes.func,
  dropdownComponent: PropTypes.func,
  dropdownAction: PropTypes.func,
  colors: PropTypes.array,
  noURLParams: PropTypes.bool,
};

export default GLTableV2;
