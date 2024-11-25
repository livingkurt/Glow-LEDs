/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import React from "react";
import PropTypes from "prop-types";
import {
  translateGLTable,
  rowIdentifier,
  determineRowCount,
  determineHasFilters,
  determineHiddenSelected,
  determineShowRowCount,
} from "./glTableHelpers";
import useGLTable from "./useGLTable";
import useTableState from "./useTableState";
import Paper from "@mui/material/Paper";
import GLTableLoading from "./components/GLTableLoading";
import GLTableRow from "./components/GLTableRow";
import GLTableRowDropdown from "./components/GLTableRowDropdown";
import {
  GLTableHeader,
  GLTableFilterDropdown,
  GLTableToolbar,
  GLTableSearch,
  GLTableFilterChips,
  GLTablePagination,
} from "./components/index";
import GLTableRowGroup from "./components/GLTableRowGroup";
import GLTableHeaderGroup from "./components/GLTableHeaderGroup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import GLTableTableName from "./components/GLTableTableName";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { onDragEnd } from "./glTableDndHelpers";
import { IconButton, Slide, Tooltip } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { closeSlider } from "./reducers/glTableActions";

const GLTable = ({
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
  enableDropdownRowSelect,
  enableDropdownRow,
  dropdownColumnDefs,
  enableSearch,
  restrictSearchChars,
  searchPlaceholder,
  dropdownRowsUniqueKey,
  uniqueKey,
  minItemsToShowFilter,
  withCheckbox,
  minFilterLength,
  titleActions,
  enableRowClick,
  onRowClick,
  rowProps,
  cellProps,
  noContentMessage,
  containerClassNames,
  style,
  remoteVersionRequirement,
  dropdownUniqueKey,
  booleanFilters,
  externalFilters,
  searchAutoFocus,
  isContained,
  determineRowColor,
  determineDropdownRowColor,
  onRenderComplete,
  searchBy,
  loading,
  remoteReorderApi,
  orderAttribute,
  enableDnd,
  determineDropdownRowSelectDisabled,
  determineAllDropdownRowSelectDisabled,
  noPagination,
  determineRowFontColor,
  disableDrag,
  dataTest,
  determineDisableRow,
  determineSelectedRow,
  disableDropdownNoRecords,
  customFilters,
  sliderContent,
  sliderParamName,
  dndSortColumnStartsAtZero,
  dropdownComponent,
}) => {
  const dispatch = useDispatch();

  useGLTable({
    remoteApi,
    remoteFiltersApi,
    namespace,
    namespaceScope,
    rows,
    columnDefs,
    nonTagFilters,
    availableFiltersProp,
    remoteVersionRequirement,
    onRenderComplete,
    searchBy,
    noPagination,
    customFilters,
    sliderParamName,
  });

  const tableState = useTableState(namespace, namespaceScope);

  const {
    filters,
    filteredRows,
    visibleRows,
    selectedRows,
    menuOpen,
    menuSelection,
    availableFilters,
    filterSearch,
    startDate,
    endDate,
    dateRange,
    slider,
    remote: { remoteCount, isLoadingFilters },
  } = tableState;

  const hiddenSelected = determineHiddenSelected(visibleRows, selectedRows);
  const rowCount = determineRowCount(remoteCount, filteredRows);
  const showRowCount = determineShowRowCount(tableName, rowCount);
  const hasFilters = determineHasFilters(availableFilters);

  return (
    <Box display="flex" width="100%" p={isContained ? 0 : 2} style={{ gap: 10 }}>
      <Box
        flexGrow={1}
        flexShrink={1}
        flexBasis={slider?.isOpen ? "calc(50% - 5px)" : "100%"}
        transition="flex-basis 0.3s ease-out"
      >
        <TableContainer
          component={Paper}
          className={containerClassNames}
          style={{ ...style, width: "100%", height: "100%" }}
          data-test={dataTest}
        >
          <DragDropContext
            onDragEnd={result => {
              onDragEnd({
                result,
                dispatch,
                tableState,
                namespace,
                remoteReorderApi,
                orderAttribute,
                zeroIndexDropdownRows: dndSortColumnStartsAtZero,
              });
            }}
          >
            <GLTableToolbar
              tableName={tableName}
              numSelected={selectedRows.length}
              hiddenSelected={hiddenSelected}
              rowCount={rowCount}
              enableRowSelect={enableRowSelect}
              titleActions={titleActions}
              hasFilters={hasFilters}
              namespace={namespace}
              namespaceScope={namespaceScope}
              filteredRowCount={filteredRows.length}
            >
              <>
                {isLoadingFilters ||
                  (hasFilters && (
                    <Box display="flex">
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
                        startDate={startDate}
                        endDate={endDate}
                        dateRange={dateRange}
                      />
                      <GLTableFilterChips
                        namespace={namespace}
                        filters={filters}
                        menuOpen={menuOpen}
                        maxChips={3}
                        booleanFilters={booleanFilters}
                        externalFilters={externalFilters}
                        startDate={startDate}
                        endDate={endDate}
                        dateRange={dateRange}
                      />
                    </Box>
                  ))}
                {!hasFilters && titleActions === null && (
                  <Box p={2} pl={0}>
                    <GLTableTableName
                      namespace={namespace}
                      namespaceScope={namespaceScope}
                      hiddenSelected={hiddenSelected}
                      showRowCount={showRowCount}
                      tableName={tableName}
                      enableRowSelect={enableRowSelect}
                    />
                  </Box>
                )}
                {!hasFilters && titleActions && <div />}
                {enableSearch && (
                  <GLTableSearch
                    namespace={namespace}
                    namespaceScope={namespaceScope}
                    restrictSearchChars={restrictSearchChars}
                    autoFocus={searchAutoFocus}
                    searchPlaceholder={searchPlaceholder}
                  />
                )}
              </>
            </GLTableToolbar>
            {!noPagination && (
              <GLTablePagination
                namespace={namespace}
                namespaceScope={namespaceScope}
                rowCount={rowCount}
                location="top"
              />
            )}
            {enableDropdownRow ? (
              <div aria-labelledby={tableName}>
                <GLTableHeaderGroup
                  namespace={namespace}
                  namespaceScope={namespaceScope}
                  enableDropdownRow={enableDropdownRow}
                  enableRowSelect={enableRowSelect}
                  rowCount={rowCount}
                  uniqueKey={uniqueKey}
                  enableDnd={enableDnd}
                  noPagination={noPagination}
                />
                <Droppable droppableId={namespace}>
                  {provided => (
                    <div
                      data-test={`${namespace}-table-body`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        // This keeps the bottom of the table at the same point when at different screen sizes
                        maxHeight: noPagination ? "calc(100vh - 480px)" : "unset",
                        overflow: noPagination ? "scroll" : "fixed",
                      }}
                    >
                      <GLTableLoading
                        namespace={namespace}
                        namespaceScope={namespaceScope}
                        loading={loading}
                        noContentMessage={noContentMessage}
                        enableDropdownRow={enableDropdownRow}
                      >
                        {visibleRows?.map((row, index) => {
                          return (
                            <Draggable
                              key={rowIdentifier(row, uniqueKey)}
                              draggableId={rowIdentifier(row, uniqueKey)?.toString()}
                              index={index}
                              isDragDisabled={!enableDnd || disableDrag}
                            >
                              {(nestedProvided, snapshot) => {
                                return (
                                  <GLTableRowGroup
                                    key={rowIdentifier(row, uniqueKey)}
                                    row={row}
                                    namespace={namespace}
                                    namespaceScope={namespaceScope}
                                    index={index}
                                    determineRowColor={determineRowColor}
                                    determineRowFontColor={determineRowFontColor}
                                    enableRowSelect={enableRowSelect}
                                    enableDropdownRow={enableDropdownRow}
                                    tableName={tableName}
                                    uniqueKey={uniqueKey}
                                    enableRowClick={enableRowClick}
                                    onRowClick={onRowClick}
                                    rowProps={rowProps}
                                    cellProps={cellProps}
                                    dropdownRowsUniqueKey={dropdownRowsUniqueKey}
                                    provided={nestedProvided}
                                    snapshot={snapshot}
                                    enableDnd={enableDnd}
                                    disableDrag={disableDrag}
                                    determineDisableRow={determineDisableRow}
                                    determineSelectedRow={determineSelectedRow}
                                    disableDropdownNoRecords={disableDropdownNoRecords}
                                    sliderParamName={sliderParamName}
                                  >
                                    {enableDropdownRow && (
                                      <>
                                        {!dropdownComponent ? (
                                          <GLTableRowDropdown
                                            row={row}
                                            namespace={namespace}
                                            namespaceScope={namespaceScope}
                                            determineDropdownRowColor={determineDropdownRowColor}
                                            determineRowColor={determineRowColor}
                                            determineRowFontColor={determineRowFontColor}
                                            index={index}
                                            dropdownRowsUniqueKey={dropdownRowsUniqueKey}
                                            dropdownColumnDefs={dropdownColumnDefs}
                                            dropdownUniqueKey={dropdownUniqueKey}
                                            enableDropdownRowSelect={enableDropdownRowSelect}
                                            determineDropdownRowSelectDisabled={determineDropdownRowSelectDisabled}
                                            determineAllDropdownRowSelectDisabled={
                                              determineAllDropdownRowSelectDisabled
                                            }
                                            disableDropdownNoRecords={disableDropdownNoRecords}
                                          />
                                        ) : (
                                          dropdownComponent(row)
                                        )}
                                      </>
                                    )}
                                  </GLTableRowGroup>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                      </GLTableLoading>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ) : (
              <div
                style={{
                  // This keeps the bottom of the table at the same point when at different screen sizes
                  maxHeight: noPagination ? "calc(100vh - 425px)" : "unset",
                  overflowY: noPagination ? "auto" : "unset",
                }}
              >
                <Table aria-labelledby={tableName} stickyHeader>
                  <GLTableHeader
                    namespace={namespace}
                    namespaceScope={namespaceScope}
                    uniqueKey={uniqueKey}
                    enableRowSelect={enableRowSelect}
                    rowCount={rowCount}
                    enableDnd={enableDnd}
                    determineDisableRow={determineDisableRow}
                  />
                  <Droppable droppableId={namespace}>
                    {provided => (
                      <TableBody
                        data-test={`${namespace}-table-body`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <GLTableLoading
                          namespace={namespace}
                          namespaceScope={namespaceScope}
                          loading={loading}
                          noContentMessage={noContentMessage}
                        >
                          {visibleRows?.map((row, index) => {
                            return (
                              <Draggable
                                key={rowIdentifier(row, uniqueKey)}
                                draggableId={rowIdentifier(row, uniqueKey)?.toString()}
                                index={index}
                                isDragDisabled={!enableDnd || disableDrag}
                              >
                                {(nestedProvided, snapshot) => {
                                  return (
                                    <GLTableRow
                                      key={rowIdentifier(row, uniqueKey)}
                                      row={row}
                                      namespace={namespace}
                                      provided={nestedProvided}
                                      namespaceScope={namespaceScope}
                                      index={index}
                                      enableRowSelect={enableRowSelect}
                                      tableName={tableName}
                                      uniqueKey={uniqueKey}
                                      enableRowClick={enableRowClick}
                                      onRowClick={onRowClick}
                                      snapshot={snapshot}
                                      rowProps={rowProps}
                                      cellProps={cellProps}
                                      enableDnd={enableDnd}
                                      determineRowColor={determineRowColor}
                                      determineRowFontColor={determineRowFontColor}
                                      disableDrag={disableDrag}
                                      determineDisableRow={determineDisableRow}
                                      determineSelectedRow={determineSelectedRow}
                                      sliderContent={sliderContent}
                                      sliderParamName={sliderParamName}
                                    />
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                        </GLTableLoading>
                        {provided.placeholder}
                      </TableBody>
                    )}
                  </Droppable>
                </Table>
              </div>
            )}
            {!noPagination && (
              <GLTablePagination
                namespace={namespace}
                namespaceScope={namespaceScope}
                location="bottom"
                rowCount={rowCount}
              />
            )}
          </DragDropContext>
        </TableContainer>
      </Box>
      {sliderContent && (
        <Slide direction="left" in={Boolean(slider?.isOpen)} mountOnEnter unmountOnExit {...{ timeout: 300 }}>
          <Box
            flexGrow={1}
            flexShrink={1}
            flexBasis="calc(50% - 5px)"
            component={Paper}
            style={{
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Tooltip title={translateGLTable("close_slider_tooltip")} data-test="tooltip">
              <IconButton
                color="primary"
                variant="contained"
                edge="start"
                sx={{
                  margin: "auto 0",
                  marginRight: "6px",
                  fontSize: "30px",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#001e60",
                  },
                }}
                style={{
                  margin: 15,
                  marginRight: "6px",
                }}
                onClick={() => dispatch(closeSlider(namespace, sliderParamName))}
              >
                <ArrowForward data-test="close-slider-button" />
              </IconButton>
            </Tooltip>

            {typeof sliderContent === "function" ? sliderContent(slider?.row) : sliderContent}
          </Box>
        </Slide>
      )}
    </Box>
  );
};

GLTable.defaultProps = {
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
  searchPlaceholder: translateGLTable("default_search_placeholder_text"),
  dropdownRowsUniqueKey: "",
  uniqueKey: "",
  minItemsToShowFilter: 10,
  withCheckbox: true,
  minFilterLength: 1,
  titleActions: null,
  enableRowClick: false,
  onRowClick: x => x,
  rowProps: () => ({}),
  cellProps: () => ({}),
  noContentMessage: translateGLTable("no_content_text"),
  containerClassNames: "",
  style: {},
  remoteVersionRequirement: 0,
  onRenderComplete: x => x,
  determineRowColor: x => x,
  determineDropdownRowColor: x => x,
  columnDefs: [],
  isContained: false,
  searchBy: "",
  enableDropdownRowSelect: false,
  loading: false,
  searchAutoFocus: false,
  dropdownUniqueKey: "",
  booleanFilters: {},
  externalFilters: [],
  orderAttribute: "",
  remoteReorderApi: x => x,
  enableDnd: false,
  determineDropdownRowSelectDisabled: () => false,
  determineAllDropdownRowSelectDisabled: () => false,
  noPagination: false,
  determineRowFontColor: () => {},
  disableDrag: false,
  dataTest: "glTable",
  determineDisableRow: () => false,
  determineSelectedRow: () => false,
  disableDropdownNoRecords: true,
  customFilters: null,
  sliderContent: null,
  sliderParamName: null,
  dndSortColumnStartsAtZero: false,
  dropdownComponent: null,
};

GLTable.propTypes = {
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
      title: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      // GLTableRow handles either functions or strings
      display: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
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
  ),
  dropdownColumnDefs: PropTypes.array,
  nonTagFilters: PropTypes.array,
  enableSearch: PropTypes.bool,
  namespace: PropTypes.string,
  availableFiltersProp: PropTypes.object,
  enableRowSelect: PropTypes.bool,
  enableDropdownRow: PropTypes.bool,
  restrictSearchChars: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  dropdownRowsUniqueKey: PropTypes.string,
  uniqueKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  minItemsToShowFilter: PropTypes.number,
  withCheckbox: PropTypes.bool,
  minFilterLength: PropTypes.number,
  noContentMessage: PropTypes.string,
  titleActions: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.node]),
  containerClassNames: PropTypes.string,
  style: PropTypes.object,
  enableRowClick: PropTypes.bool,
  onRowClick: PropTypes.func,
  rowProps: PropTypes.func,
  cellProps: PropTypes.func,
  isContained: PropTypes.bool,
  onRenderComplete: PropTypes.func,
  enableDropdownRowSelect: PropTypes.bool,
  searchBy: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  loading: PropTypes.bool,
  determineRowColor: PropTypes.func,
  determineDropdownRowColor: PropTypes.func,
  dropdownUniqueKey: PropTypes.string,
  searchAutoFocus: PropTypes.bool,
  booleanFilters: PropTypes.object,
  externalFilters: PropTypes.array,
  orderAttribute: PropTypes.string,
  remoteReorderApi: PropTypes.func,
  enableDnd: PropTypes.bool,
  determineDropdownRowSelectDisabled: PropTypes.func,
  determineAllDropdownRowSelectDisabled: PropTypes.func,
  noPagination: PropTypes.bool,
  determineRowFontColor: PropTypes.func,
  disableDrag: PropTypes.bool,
  dataTest: PropTypes.string,
  determineDisableRow: PropTypes.func,
  determineSelectedRow: PropTypes.func,
  disableDropdownNoRecords: PropTypes.bool,
  customFilters: PropTypes.object,
  sliderContent: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.node]),
  sliderParamName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  dndSortColumnStartsAtZero: PropTypes.bool,
  dropdownComponent: PropTypes.func,
};

export default GLTable;
