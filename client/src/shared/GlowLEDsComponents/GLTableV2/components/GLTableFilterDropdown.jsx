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
import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useDispatch } from "react-redux";
import first from "lodash/first";
import sortBy from "lodash/sortBy";
import { makeStyles } from "@mui/styles";
import { applyFilter, enableClearAll, filterLabelsMap, sortItem } from "../glTableHelpers";
import {
  applyFilterSearch,
  clearBooleanFilter,
  removeAllFilters,
  removeFilter,
  toggleFilter,
  updateFilterDisplay
} from "../actions/actions";
import GLPopper from "../../GLPopper/GLPopper";
import { TextField } from "@mui/material";
import { humanize, toCapitalize } from "../../../../utils/helper_functions";

export const useStyles = makeStyles(() => ({
  mainMenu: {
    minWidth: "235px",
    maxHeight: "320px"
  },
  mainMenuList: {
    maxHeight: "300px",
    padding: "0px"
  },
  subMenu: {
    minWidth: "235px",
    maxHeight: "500px"
  },
  filterButton: {
    margin: "10px 0px"
  },
  menuItem: {
    padding: "15px"
  },
  mainMenuItem: {
    display: "flex",
    width: "100%",
    fontSize: "16px",
    justifyContent: "space-between"
  },
  subMenuItem: {
    display: "flex",
    width: "100%",
    fontSize: "16px"
  },
  mainMenuFooter: {
    display: "flex",
    justifyContent: "center",
    height: "46px"
  },
  menuItemsContainer: {
    maxHeight: "385px",
    overflowX: "hidden",
    overflowY: "auto"
  },
  subMenuCounter: {
    padding: "9px 6px",
    margin: "8px",
    fontSize: "12px",
    color: "#bdbdbd"
  },
  subMenuFooter: {
    display: "flex",
    justifyContent: "space-between",
    height: "46px"
  }
}));

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
  disabled
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

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
          ref={anchorRef}
          startIcon={<Icon>{"filter_list"}</Icon>}
          variant="outlined"
          className={classes.filterButton}
          onClick={() => {
            dispatch(updateFilterDisplay(namespace, { menuOpen: !menuOpen, menuSelection: null }));
          }}
        >
          Filter By
        </Button>

        <GLPopper
          open={menuOpen}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          disablePortal={false}
          paperClasses={classes.mainMenu}
          flip
          transition
          boundariesElement="viewport"
        >
          <MenuList id="matrix-main-menu" data-test="matrix-main-menu" className={classes.mainMenuList}>
            {Object.keys(availableFilters).map((mainMenuItem, index) => (
              <MenuItem
                id={`matrixMenuItem-${index}`}
                selected={mainMenuItem === menuSelection || (filters && filters[mainMenuItem]?.length > 0)}
                className={classes.menuItem}
                ref={el => {
                  subAnchorRef.current[mainMenuItem] = el;
                }}
                key={mainMenuItem}
                onClick={() => {
                  if (menuSelection === mainMenuItem) {
                    dispatch(updateFilterDisplay(namespace, { menuOpen: true, menuSelection: null }));
                  } else {
                    dispatch(updateFilterDisplay(namespace, { menuOpen: true, menuSelection: mainMenuItem }));
                  }
                }}
                dense
              >
                <div className={classes.mainMenuItem}>
                  <div>{`${filterLabelsMap[mainMenuItem] || toCapitalize(mainMenuItem)} (${availableFilters[mainMenuItem]?.length})`}</div>
                  <div>
                    {filters && filters[mainMenuItem]?.length > 0 ? <Badge variant="dot" color="primary" overlap="rectangular" /> : null}
                  </div>
                </div>
              </MenuItem>
            ))}
            <Divider />
            <div className={classes.mainMenuFooter}>
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
                Clear
              </Button>
            </div>
          </MenuList>
        </GLPopper>
        <div>
          <GLPopper
            open={Boolean(menuSelection)}
            anchorEl={subAnchorRef.current[menuSelection]}
            placement="right-start"
            disablePortal={false}
            paperClasses={classes.subMenu}
            flip
            transition
            boundariesElement="viewport"
          >
            <MenuList>
              {subMenuItems && subMenuItems?.length > minItemsToShowFilter && (
                <div data-test="matrix-sub-menu-input" style={{ paddingLeft: "10px", paddingRight: "10px", paddingBottom: "8px" }}>
                  <TextField
                    autoFocus
                    InputProps={{
                      "data-test": "covalent-table-sub-menu-search-input"
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
                      inputContainer: { marginTop: "0px", padding: "5px" }
                    }}
                  />
                </div>
              )}
              <div id="matrix-sub-menu" data-test="matrix-sub-menu" className={classes.menuItemsContainer}>
                {sortBy(applyFilter(subMenuItems, filterSearch, minFilterLength), item => sortItem(item)).map(item => (
                  <MenuItem
                    className={classes.subMenuItem}
                    data-test="menu-item"
                    selected={filters[menuSelection]?.includes(item)}
                    key={item}
                    onClick={() => {
                      dispatch(toggleFilter(namespace, { row: menuSelection, item }));
                      onChangeFunction(item);
                    }}
                    dense
                  >
                    {withCheckbox && <Checkbox checked={filters[menuSelection]?.includes(item) || false} />}
                    {typeof item === "string" ? humanize(item) : item}
                  </MenuItem>
                ))}
                {Object.keys(booleanFilters)?.includes(menuSelection) && (
                  <div className="jc-b ai-c">
                    <Switch
                      checked={first(filters[menuSelection]) === 1}
                      selected={first(filters[menuSelection]) === 1}
                      onClick={() => dispatch(toggleFilter(namespace, { row: menuSelection, item: 1 }))}
                    />
                    {humanize(booleanFilters[menuSelection].label)}
                    <Button
                      data-test="matrix-sub-menu-clear-button"
                      color="secondary"
                      variant="text"
                      onClick={() => {
                        dispatch(removeFilter(namespace, menuSelection));
                        onChangeFunction();
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </div>
              <Divider />
              <div className={classes.subMenuFooter}>
                <div data-test="matrix-menu-selected-counter" className={classes.subMenuCounter}>
                  {`${(filters[menuSelection] && filters[menuSelection]?.length) || 0} Selected`}
                </div>
                <Button
                  data-test="matrix-sub-menu-clear-button"
                  color="secondary"
                  variant="text"
                  onClick={() => {
                    dispatch(removeFilter(namespace));
                    onChangeFunction();
                  }}
                  disabled={filters[menuSelection] && filters[menuSelection]?.length === 0}
                >
                  Clear
                </Button>
              </div>
            </MenuList>
          </GLPopper>
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
  disabled: false
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
  disabled: PropTypes.bool
};

export default GLTableFilterDropdown;
