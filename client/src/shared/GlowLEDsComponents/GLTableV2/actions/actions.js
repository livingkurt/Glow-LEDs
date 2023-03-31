import uniqueId from "lodash/uniqueId";
import { pipe } from "../glTableHelpers";
import {
  APPLY_SEARCH,
  TOGGLE_SORT,
  UPDATE_PAGE,
  UPDATE_PAGE_SIZE,
  UPDATE_FILTER_DISPLAY,
  TOGGLE_FILTER,
  APPLY_FILTER,
  REMOVE_FILTER,
  REMOVE_ALL_FILTERS,
  SELECT_ALL_ROWS,
  SELECT_ROW,
  DESELECT_ROWS,
  ADD_ROWS,
  ON_EXPAND_ROW,
  CLEAR_TABLE,
  APPLY_FILTER_SEARCH,
  FETCH_TABLE_PAGE,
  FETCH_TABLE_PAGE_SUCCESS,
  FETCH_TABLE_FILTERS,
  FETCH_TABLE_FILTERS_SUCCESS
} from "./actionTypes";

// ----------- Remote Fetch -----------

export const fetchTablePage =
  (namespace, { remoteApi, search, filters, sorting, page, pageSize }) =>
  dispatch => {
    const id = uniqueId();
    dispatch({
      type: `${namespace}/${FETCH_TABLE_PAGE}`,
      payload: { id }
    });
    return remoteApi({ search, filters, sorting, page, pageSize }).then(response => {
      dispatch({
        type: `${namespace}/${FETCH_TABLE_PAGE_SUCCESS}`,
        payload: { response, id }
      });
    });
  };

export const fetchTableFilters =
  (namespace, { remoteFiltersApi }) =>
  dispatch => {
    dispatch({
      type: `${namespace}/${FETCH_TABLE_FILTERS}`
    });
    return remoteFiltersApi().then(response => {
      dispatch({
        type: `${namespace}/${FETCH_TABLE_FILTERS_SUCCESS}`,
        payload: response
      });
    });
  };

// ----------- Rows -----------
export const addRows =
  (namespace, { rows, searchBy, columnDefs, nonTagFilters, filters, availableFilters, isRemote }) =>
  dispatch => {
    dispatch({
      type: `${namespace}/${ADD_ROWS}`,
      payload: { rows, searchBy, columnDefs, nonTagFilters, filters, availableFilters, isRemote }
    });
  };

// ----------- Clear Table -----------
export const clearTable = namespace => dispatch => {
  dispatch({
    type: `${namespace}/${CLEAR_TABLE}`,
    payload: {}
  });
};

// ----------- Search -----------
export const applySearch = (namespace, search) => dispatch => {
  dispatch({
    type: `${namespace}/${APPLY_SEARCH}`,
    payload: { search }
  });
};

// ----------- Sort -----------
export const toggleSort = (namespace, columnIndex, orderDirection) => dispatch => {
  dispatch({
    type: `${namespace}/${TOGGLE_SORT}`,
    payload: { columnIndex, orderDirection }
  });
};

// ----------- Row Dropdown -----------
export const onExpandRow = (namespace, rowName) => dispatch => {
  dispatch({
    type: `${namespace}/${ON_EXPAND_ROW}`,
    payload: { rowName }
  });
};
// ----------- Pagination -----------
export const updatePage = (namespace, page) => dispatch => {
  dispatch({
    type: `${namespace}/${UPDATE_PAGE}`,
    page
  });
};

export const updatePageSize = (namespace, pageSize) => dispatch => {
  dispatch({
    type: `${namespace}/${UPDATE_PAGE_SIZE}`,
    pageSize
  });
};

// ----------- Row Selection -----------
export const selectAllRows = namespace => dispatch => {
  dispatch({
    type: `${namespace}/${SELECT_ALL_ROWS}`
  });
};

export const selectRow = (namespace, rowId) => dispatch => {
  dispatch({
    type: `${namespace}/${SELECT_ROW}`,
    payload: { rowId }
  });
};

export const deselectRows = namespace => dispatch => {
  dispatch({
    type: `${namespace}/${DESELECT_ROWS}`
  });
};

// ----------- Filters -----------
export const updateFilterDisplay =
  (namespace, { menuOpen, menuSelection }) =>
  dispatch => {
    dispatch({ type: `${namespace}/${UPDATE_FILTER_DISPLAY}`, payload: { menuOpen, menuSelection } });
  };

export const toggleFilter = (namespace, filter) => dispatch => {
  pipe(
    dispatch({
      type: `${namespace}/${TOGGLE_FILTER}`,
      payload: filter
    }),
    dispatch({
      type: `${namespace}/${APPLY_FILTER}`
    })
  );
};

export const removeFilter = (namespace, filter) => dispatch => {
  dispatch({
    type: `${namespace}/${REMOVE_FILTER}`,
    payload: filter
  });
};

export const removeAllFilters = namespace => dispatch => {
  dispatch({
    type: `${namespace}/${REMOVE_ALL_FILTERS}`
  });
};

export const applyFilterSearch = (namespace, filterSearch) => dispatch => {
  dispatch({
    type: `${namespace}/${APPLY_FILTER_SEARCH}`,
    payload: { filterSearch }
  });
};
