import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import first from "lodash/first";
import sortBy from "lodash/sortBy";
import { styled } from "@mui/material/styles";
import { Button, Switch, Badge, Checkbox, ClickAwayListener, Divider, Icon, MenuItem, MenuList } from "@mui/material";
import { applyFilter, enableClearAll, filterLabelsMap, sortItem } from "../glTableHelpers";
import {
  applyFilterSearch,
  removeAllFilters,
  removeFilter,
  toggleFilter,
  updateFilterDisplay,
} from "../actions/actions";
import GLPopper from "../../GLPopper/GLPopper";
import { humanize, toCapitalize } from "../../../../utils/helper_functions";
import GLTextFieldV2 from "../../GLTextFieldV2/GLTextFieldV2";

// Styled components
const MainMenu = styled("div")(({ theme }) => ({
  minWidth: "235px",
  maxHeight: "320px",
}));

const MainMenuList = styled(MenuList)(({ theme }) => ({
  maxHeight: "300px",
  padding: "0px",
}));

const SubMenu = styled("div")(({ theme }) => ({
  minWidth: "235px",
  maxHeight: "500px",
}));

const FilterButton = styled(Button)(({ theme }) => ({
  margin: "10px 0px",
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "15px",
}));

const MainMenuItemContent = styled("div")({
  display: "flex",
  width: "100%",
  fontSize: "16px",
  justifyContent: "space-between",
});

const SubMenuItemContent = styled("div")({
  display: "flex",
  width: "100%",
  fontSize: "16px",
});

const MainMenuFooter = styled("div")({
  display: "flex",
  justifyContent: "center",
  height: "46px",
});

const MenuItemsContainer = styled("div")({
  maxHeight: "385px",
  overflowX: "hidden",
  overflowY: "auto",
});

const SubMenuCounter = styled("div")(({ theme }) => ({
  padding: "9px 6px",
  margin: "8px",
  fontSize: "12px",
  color: theme.palette.text.secondary,
}));

const SubMenuFooter = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  height: "46px",
});

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
        <FilterButton
          disabled={isLoading || disabled}
          id="matrixMenuButton"
          color="secondary"
          ref={anchorRef}
          startIcon={<Icon>filter_list</Icon>}
          variant="outlined"
          onClick={() => {
            dispatch(updateFilterDisplay(namespace, { menuOpen: !menuOpen, menuSelection: null }));
          }}
        >
          Filter By
        </FilterButton>

        <GLPopper
          open={menuOpen}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          disablePortal={false}
          paperClasses={MainMenu}
          flip
          transition
          boundariesElement="viewport"
        >
          <MainMenuList id="matrix-main-menu" data-test="matrix-main-menu">
            {Object.keys(availableFilters).map((mainMenuItem, index) => (
              <StyledMenuItem
                id={`matrixMenuItem-${index}`}
                selected={mainMenuItem === menuSelection || (filters && filters[mainMenuItem]?.length > 0)}
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
                <MainMenuItemContent>
                  <div>{`${filterLabelsMap[mainMenuItem] || toCapitalize(mainMenuItem)} (${
                    availableFilters[mainMenuItem]?.length
                  })`}</div>
                  <div>
                    {filters && filters[mainMenuItem]?.length > 0 ? (
                      <Badge variant="dot" color="primary" overlap="rectangular" />
                    ) : null}
                  </div>
                </MainMenuItemContent>
              </StyledMenuItem>
            ))}
            <Divider />
            <MainMenuFooter>
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
            </MainMenuFooter>
          </MainMenuList>
        </GLPopper>
        <div>
          <GLPopper
            open={Boolean(menuSelection)}
            anchorEl={subAnchorRef.current[menuSelection]}
            placement="right-start"
            disablePortal={false}
            paperClasses={SubMenu}
            flip
            transition
            boundariesElement="viewport"
          >
            <MenuList>
              {subMenuItems && subMenuItems?.length > minItemsToShowFilter && (
                <div
                  data-test="matrix-sub-menu-input"
                  style={{ paddingLeft: "10px", paddingRight: "10px", paddingBottom: "8px" }}
                >
                  <GLTextFieldV2
                    autoFocus
                    InputProps={{
                      "data-test": "covalent-table-sub-menu-search-input",
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
              <MenuItemsContainer id="matrix-sub-menu" data-test="matrix-sub-menu">
                {sortBy(applyFilter(subMenuItems, filterSearch, minFilterLength), item => sortItem(item)).map(item => (
                  <StyledMenuItem
                    data-test="menu-item"
                    selected={filters[menuSelection]?.includes(item)}
                    key={item}
                    onClick={() => {
                      dispatch(toggleFilter(namespace, { row: menuSelection, item }));
                      onChangeFunction(item);
                    }}
                    dense
                  >
                    <SubMenuItemContent>
                      {withCheckbox && <Checkbox checked={filters[menuSelection]?.includes(item) || false} />}
                      {typeof item === "string" ? humanize(item) : item}
                    </SubMenuItemContent>
                  </StyledMenuItem>
                ))}
                {Object.keys(booleanFilters)?.includes(menuSelection) && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Switch
                      checked={first(filters[menuSelection]) === 1}
                      onChange={() => dispatch(toggleFilter(namespace, { row: menuSelection, item: 1 }))}
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
              </MenuItemsContainer>
              <Divider />
              <SubMenuFooter>
                <SubMenuCounter data-test="matrix-menu-selected-counter">
                  {`${(filters[menuSelection] && filters[menuSelection]?.length) || 0} Selected`}
                </SubMenuCounter>
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
              </SubMenuFooter>
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
  disabled: false,
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
};

export default GLTableFilterDropdown;
