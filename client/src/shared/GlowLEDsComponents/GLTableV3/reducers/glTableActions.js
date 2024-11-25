import uniqueId from "lodash/uniqueId";
import {
  APPLY_SEARCH,
  TOGGLE_SORT,
  UPDATE_PAGE,
  UPDATE_PAGE_SIZE,
  UPDATE_FILTER_DISPLAY,
  TOGGLE_FILTER,
  REMOVE_FILTER,
  REMOVE_ALL_FILTERS,
  SELECT_ALL_ROWS,
  SELECT_ROW,
  DESELECT_ROWS,
  ADD_ROWS,
  CLEAR_TABLE,
  APPLY_FILTER_SEARCH,
  FETCH_TABLE_PAGE,
  FETCH_TABLE_PAGE_SUCCESS,
  FETCH_TABLE_FILTERS,
  FETCH_TABLE_FILTERS_SUCCESS,
  REORDER_ROWS_SUCCESS,
  SELECT_ALL_DROPDOWN_ROWS,
  SELECT_DROPDOWN_ROW,
  DESELECT_DROPDOWN_ROWS,
  TOGGLE_ALL_DROPDOWN_ROWS,
  TOGGLE_DROPDOWN_ROW,
  COLLAPSE_ALL_DROPDOWN_ROWS,
  APPLY_DATE_RANGE_FILTER,
  APPLY_FILTER,
  TOGGLE_SLIDER,
  CLOSE_SLIDER,
  APPLY_URL_PARAMS,
} from "./covalentTableActionTypes";
import { showError } from "../../../../slices/snackbarSlice";

// ----------- Remote Fetch -----------

export const fetchTablePage =
  (namespace, { remoteApi, search, filters, sorting, page, pageSize, urlParams }) =>
  async dispatch => {
    const id = uniqueId();
    dispatch({
      type: `${namespace}/${FETCH_TABLE_PAGE}`,
      payload: { id },
    });
    try {
      const { data } = await remoteApi({ search, filters, sorting, page, pageSize, urlParams });

      dispatch({
        type: `${namespace}/${FETCH_TABLE_PAGE_SUCCESS}`,
        payload: { data, id },
      });
    } catch (error) {
      dispatch(showError(error));
    }
  };

export const fetchTableFilters =
  (namespace, { remoteFiltersApi }) =>
  async dispatch => {
    dispatch({
      type: `${namespace}/${FETCH_TABLE_FILTERS}`,
    });
    try {
      const response = await remoteFiltersApi();
      dispatch({
        type: `${namespace}/${FETCH_TABLE_FILTERS_SUCCESS}`,
        payload: response,
      });
    } catch (error) {
      dispatch(showError(error));
    }
  };

// ----------- Rows -----------
export const addRows =
  (
    namespace,
    {
      rows,
      searchBy,
      columnDefs,
      nonTagFilters,
      filters,
      availableFilters,
      isRemote,
      onRenderComplete,
      noPagination,
      customFilters,
      uniqueKey,
      dropdownUniqueKey,
    }
  ) =>
  dispatch => {
    dispatch({
      type: `${namespace}/${ADD_ROWS}`,
      payload: {
        rows,
        searchBy,
        columnDefs,
        nonTagFilters,
        filters,
        availableFilters,
        isRemote,
        noPagination,
        customFilters,
        uniqueKey,
        dropdownUniqueKey,
      },
    });
    if (rows.length > 0 && onRenderComplete) {
      onRenderComplete();
    }
  };

// ----------- Reorder Table -----------
export const reorderRows =
  (namespace, { reorderedItems, remoteReorderApi }) =>
  async dispatch => {
    dispatch({
      type: `${namespace}/${REORDER_ROWS_SUCCESS}`,
      payload: { reorderedItems },
    });

    if (remoteReorderApi) {
      await remoteReorderApi({ reorderedItems });
    }
  };

// ----------- Reorder Dropdown Table -----------
export const reorderDropdownRows =
  (namespace, { parentId, reorderedDropdownItems, remoteReorderDropdownApi, updatedRows }) =>
  async dispatch => {
    dispatch({
      type: `${namespace}/${REORDER_ROWS_SUCCESS}`,
      payload: { reorderedItems: updatedRows },
    });

    if (remoteReorderDropdownApi) {
      await remoteReorderDropdownApi({ parentId, reorderedDropdownItems });
    }
  };

// ----------- Clear Table -----------
export const clearTable = namespace => dispatch => {
  dispatch({
    type: `${namespace}/${CLEAR_TABLE}`,
    payload: {},
  });
};

// ----------- Search -----------
export const applySearch = (namespace, search) => dispatch => {
  dispatch({
    type: `${namespace}/${APPLY_SEARCH}`,
    payload: { search },
  });
};

// ----------- Sort -----------
export const toggleSort = (namespace, columnIndex, orderDirection) => dispatch => {
  dispatch({
    type: `${namespace}/${TOGGLE_SORT}`,
    payload: { columnIndex, orderDirection },
  });
};

// ----------- Row Selection -----------
export const toggleAllDropdownRows = (namespace, uniqueKey) => dispatch => {
  dispatch({
    type: `${namespace}/${TOGGLE_ALL_DROPDOWN_ROWS}`,
    payload: { uniqueKey },
  });
};

export const toggleDropdownRow = (namespace, rowId, uniqueKey) => dispatch => {
  dispatch({
    type: `${namespace}/${TOGGLE_DROPDOWN_ROW}`,
    payload: { rowId, uniqueKey },
  });
};
export const collapseAllDropdownRows = namespace => dispatch => {
  dispatch({
    type: `${namespace}/${COLLAPSE_ALL_DROPDOWN_ROWS}`,
  });
};

// ----------- Pagination -----------
export const updatePage = (namespace, page) => dispatch => {
  dispatch({
    type: `${namespace}/${UPDATE_PAGE}`,
    payload: { page },
  });
};

export const updatePageSize = (namespace, pageSize) => dispatch => {
  dispatch({
    type: `${namespace}/${UPDATE_PAGE_SIZE}`,
    payload: { pageSize },
  });
};

// ----------- Row Selection -----------
export const selectAllRows =
  (namespace, uniqueKey, determineDisableRow = () => false) =>
  dispatch => {
    dispatch({
      type: `${namespace}/${SELECT_ALL_ROWS}`,
      payload: { uniqueKey, determineDisableRow },
    });
  };

export const selectRow = (namespace, rowId, uniqueKey) => dispatch => {
  dispatch({
    type: `${namespace}/${SELECT_ROW}`,
    payload: { rowId, uniqueKey },
  });
};

export const deselectRows = namespace => dispatch => {
  dispatch({
    type: `${namespace}/${DESELECT_ROWS}`,
  });
};

export const applyUrlParams = (namespace, urlParams) => dispatch => {
  dispatch({
    type: `${namespace}/${APPLY_URL_PARAMS}`,
    payload: { urlParams },
  });
};

export const toggleSlider =
  (namespace, { row, sliderParamName }) =>
  dispatch => {
    dispatch({
      type: `${namespace}/${TOGGLE_SLIDER}`,
      payload: { row, sliderParamName },
    });
  };

export const closeSlider = (namespace, sliderParamName) => dispatch => {
  dispatch({
    type: `${namespace}/${CLOSE_SLIDER}`,
    payload: { sliderParamName },
  });
};

// ----------- Dropdown Row Selection -----------
export const selectAllDropdownRows = (namespace, row, dropdownUniqueKey, dropdownRowsUniqueKey) => dispatch => {
  dispatch({
    type: `${namespace}/${SELECT_ALL_DROPDOWN_ROWS}`,
    payload: { row, dropdownUniqueKey, dropdownRowsUniqueKey },
  });
};

export const selectDropdownRow = (namespace, dropdownRowId, dropdownUniqueKey, dropdownRowsUniqueKey) => dispatch => {
  dispatch({
    type: `${namespace}/${SELECT_DROPDOWN_ROW}`,
    payload: { dropdownRowId, dropdownUniqueKey, dropdownRowsUniqueKey },
  });
};

export const deselectDropdownRows = namespace => dispatch => {
  dispatch({
    type: `${namespace}/${DESELECT_DROPDOWN_ROWS}`,
  });
};

// ----------- Filters -----------
export const updateFilterDisplay =
  (namespace, { menuOpen, menuSelection }) =>
  dispatch => {
    dispatch({ type: `${namespace}/${UPDATE_FILTER_DISPLAY}`, payload: { menuOpen, menuSelection } });
  };

export const toggleFilter = (namespace, filter) => dispatch => {
  dispatch({
    type: `${namespace}/${TOGGLE_FILTER}`,
    payload: { filter },
  });
};

export const applyFilter = (namespace, filter) => dispatch => {
  dispatch({
    type: `${namespace}/${APPLY_FILTER}`,
    payload: { filter },
  });
};

export const applyDateRangeFilter = (namespace, filter) => dispatch => {
  dispatch({
    type: `${namespace}/${APPLY_DATE_RANGE_FILTER}`,
    payload: { filter },
  });
};

export const removeFilter = (namespace, filter) => dispatch => {
  dispatch({
    type: `${namespace}/${REMOVE_FILTER}`,
    payload: { filter },
  });
};

export const removeAllFilters = namespace => dispatch => {
  dispatch({
    type: `${namespace}/${REMOVE_ALL_FILTERS}`,
  });
};

export const applyFilterSearch = (namespace, filterSearch) => dispatch => {
  dispatch({
    type: `${namespace}/${APPLY_FILTER_SEARCH}`,
    payload: { filterSearch },
  });
};
