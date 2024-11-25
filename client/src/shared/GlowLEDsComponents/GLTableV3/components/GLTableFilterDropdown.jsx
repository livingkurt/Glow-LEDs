/* eslint-disable no-nested-ternary */
/* eslint-disable react/function-component-definition */
/* eslint-disable max-lines-per-function */
import React, { useRef } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Badge from "@mui/material/Badge";
import Checkbox from "@mui/material/Checkbox";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useDispatch } from "react-redux";
import first from "lodash/first";
import sortBy from "lodash/sortBy";
import {
  applyFilter,
  determineCheckboxSelection,
  determineSubMenuText,
  enableClearAll,
  filterLabelsMap,
  isDateArray,
  menuItemKey,
  sortItem,
  translateGLFilter,
} from "../glTableHelpers";
import {
  applyDateRangeFilter,
  applyFilterSearch,
  removeAllFilters,
  removeFilter,
  toggleFilter,
  updateFilterDisplay,
} from "../reducers/glTableActions";
import FilterList from "@mui/icons-material/FilterList";
import { Popper, TextField } from "@mui/material";
import CODateRangePicker from "../../GLDateRangePicker/GLDateRangePicker";

const GLTableFilterDropdown = ({
  availableFilters,
  filters,
  menuOpen,
  menuSelection,
  booleanFilters,
  namespace,
  minItemsToShowFilter,
  withCheckbox,
  minFilterLength,
  filterSearch,
  isLoading,
  onChangeFunction,
  disabled,
  startDate,
  endDate,
  dateRange,
}) => {
  const dispatch = useDispatch();

  const anchorRef = useRef(null);
  const subAnchorRef = useRef({});

  const subMenuItems = availableFilters[menuSelection] || [];

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => {
        if (menuOpen) {
          dispatch(updateFilterDisplay(namespace, { menuOpen: false, menuSelection: null }));
        }
      }}
    >
      <div>
        <Button
          disabled={isLoading || disabled}
          id="matrixMenuButton"
          color="secondary"
          data-test="filter-button"
          ref={anchorRef}
          startIcon={<FilterList />}
          variant="outlined"
          sx={{
            margin: "auto 0",
            marginRight: "6px",
            fontSize: "30px",
            color: "white",
            "&:hover": {
              backgroundColor: "#001e60",
            },
          }}
          onClick={() => {
            dispatch(updateFilterDisplay(namespace, { menuOpen: !menuOpen, menuSelection: null }));
          }}
        >
          {translateGLFilter("filter_by_button")}
        </Button>

        <Popper
          open={menuOpen}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          disablePortal={false}
          paperClasses={{ minWidth: "235px", maxHeight: "320px" }}
          flip
          transition
          boundariesElement="viewport"
        >
          <MenuList id="matrix-main-menu" data-test="matrix-main-menu" style={{ maxHeight: "300px", padding: "0px" }}>
            {Object.keys(availableFilters).map((mainMenuItem, index) => (
              <MenuItem
                id={`matrixMenuItem-${index}`}
                selected={mainMenuItem === menuSelection || (filters && filters[mainMenuItem]?.length > 0)}
                style={{ padding: "15px" }}
                ref={el => {
                  subAnchorRef.current[mainMenuItem] = el;
                }}
                key={menuItemKey(mainMenuItem)}
                onClick={() => {
                  if (menuSelection === mainMenuItem) {
                    dispatch(updateFilterDisplay(namespace, { menuOpen: true, menuSelection: null }));
                  } else {
                    dispatch(updateFilterDisplay(namespace, { menuOpen: true, menuSelection: mainMenuItem }));
                  }
                }}
                dense
              >
                <div style={{ display: "flex", width: "100%", fontSize: "16px", justifyContent: "space-between" }}>
                  <div>{`${filterLabelsMap(mainMenuItem)} ${!isDateArray(mainMenuItem) ? `(${availableFilters[mainMenuItem]?.length})` : ""}`}</div>
                  <div>
                    {filters && filters[mainMenuItem]?.length > 0 ? (
                      <Badge variant="dot" color="primary" overlap="rectangular" />
                    ) : null}
                  </div>
                </div>
              </MenuItem>
            ))}
            <Divider />
            <div style={{ display: "flex", justifyContent: "center", height: "46px" }}>
              <Button
                id="matrixMenuClearAll"
                data-test="matrix-main-menu-clear-button"
                variant="text"
                onClick={() => {
                  dispatch(removeAllFilters(namespace));
                  onChangeFunction();
                }}
                color="secondary"
                disabled={!enableClearAll(filters)}
              >
                {translateGLFilter("clear_all_button")}
              </Button>
            </div>
          </MenuList>
        </Popper>
        <div>
          <Popper
            open={Boolean(menuSelection)}
            anchorEl={subAnchorRef.current[menuSelection]}
            placement="right-start"
            disablePortal={false}
            paperClasses={{ minWidth: "235px", maxHeight: "500px" }}
            flip
            transition
            boundariesElement="viewport"
          >
            <MenuList>
              {subMenuItems && subMenuItems?.length > minItemsToShowFilter && !isDateArray(subMenuItems) && (
                <div
                  data-test="matrix-sub-menu-input"
                  style={{ paddingLeft: "10px", paddingRight: "10px", paddingBottom: "8px" }}
                >
                  <TextField
                    autoFocus
                    InputProps={{
                      "data-test": "gl-table-sub-menu-search-input",
                    }}
                    value={filterSearch}
                    name="filter_search"
                    variant="outlined"
                    size="small"
                    icon="search"
                    iconPosition="start"
                    iconFontSize="small"
                    onChange={e => dispatch(applyFilterSearch(namespace, e.target.value))}
                    style={{
                      inputContainer: { marginTop: "0px", padding: "5px" },
                    }}
                  />
                </div>
              )}
              <div
                id="matrix-sub-menu"
                data-test="matrix-sub-menu"
                style={{ maxHeight: "300px", overflowX: "hidden", overflowY: "auto" }}
              >
                {Object.keys(booleanFilters)?.includes(menuSelection) ? (
                  <div data-test="switch-container">
                    <Switch
                      checked={first(filters[menuSelection]) === 1}
                      onClick={() => dispatch(toggleFilter(namespace, { row: menuSelection, item: 1 }))}
                    />
                    {booleanFilters[menuSelection].label}
                  </div>
                ) : isDateArray(subMenuItems) ? (
                  <CODateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    namespace={namespace}
                    dateRange={dateRange}
                    data={subMenuItems}
                    onChange={({ date, range }) => {
                      dispatch(
                        applyDateRangeFilter(namespace, {
                          row: menuSelection,
                          item: date,
                          dateRange: range,
                        })
                      );
                      onChangeFunction(date);
                    }}
                  />
                ) : (
                  sortBy(
                    applyFilter(
                      subMenuItems.filter(
                        item => !Object.values(booleanFilters).some(bFilter => bFilter.label === item)
                      ),
                      filterSearch,
                      minFilterLength
                    ),
                    item => sortItem(item)
                  ).map(item => (
                    <MenuItem
                      style={{ display: "flex", width: "100%", fontSize: "16px" }}
                      data-test="menu-item"
                      selected={filters[menuSelection]?.includes(item)}
                      key={menuItemKey(item)}
                      onClick={() => {
                        dispatch(toggleFilter(namespace, { row: menuSelection, item }));
                        onChangeFunction(item);
                      }}
                      dense
                    >
                      {withCheckbox && (
                        <Checkbox checked={determineCheckboxSelection(item, filters, menuSelection) || false} />
                      )}
                      {determineSubMenuText(item)}
                    </MenuItem>
                  ))
                )}
              </div>
              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between", height: "46px" }}>
                <div
                  data-test="matrix-menu-selected-counter"
                  style={{ padding: "9px 6px", margin: "8px", fontSize: "12px", color: "#bdbdbd" }}
                >
                  {`${(filters[menuSelection] && filters[menuSelection]?.length) || 0} ${translateGLFilter(
                    "selected_label"
                  )}`}
                </div>
                <Button
                  data-test="matrix-sub-menu-clear-button"
                  color="secondary"
                  variant="text"
                  onClick={() => {
                    dispatch(removeFilter(namespace, menuSelection));
                    onChangeFunction();
                  }}
                  disabled={filters[menuSelection] === undefined || filters[menuSelection]?.length === 0}
                >
                  {translateGLFilter("clear_button")}
                </Button>
              </div>
            </MenuList>
          </Popper>
        </div>
      </div>
    </ClickAwayListener>
  );
};

GLTableFilterDropdown.defaultProps = {
  menuSelection: null,
  menuOpen: false,
  booleanFilters: {},
  namespace: "",
  minItemsToShowFilter: 10,
  withCheckbox: true,
  minFilterLength: 1,
  filterSearch: "",
  isLoading: false,
  onChangeFunction: x => x,
  disabled: false,
  startDate: "",
  endDate: "",
  dateRange: "",
};

GLTableFilterDropdown.propTypes = {
  availableFilters: PropTypes.objectOf(PropTypes.array).isRequired,
  filters: PropTypes.objectOf(PropTypes.array).isRequired,
  menuOpen: PropTypes.bool,
  menuSelection: PropTypes.string,
  booleanFilters: PropTypes.object,
  namespace: PropTypes.string,
  minItemsToShowFilter: PropTypes.number,
  withCheckbox: PropTypes.bool,
  minFilterLength: PropTypes.number,
  filterSearch: PropTypes.string,
  isLoading: PropTypes.bool,
  onChangeFunction: PropTypes.func,
  disabled: PropTypes.bool,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  dateRange: PropTypes.string,
};

export default GLTableFilterDropdown;
