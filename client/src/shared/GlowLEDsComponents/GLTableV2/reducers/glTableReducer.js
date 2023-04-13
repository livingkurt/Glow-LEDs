/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import {
  APPLY_SEARCH,
  TOGGLE_SORT,
  UPDATE_PAGE,
  UPDATE_PAGE_SIZE,
  UPDATE_FILTER_DISPLAY,
  TOGGLE_FILTER,
  REMOVE_FILTER,
  REMOVE_ALL_FILTERS,
  APPLY_FILTER,
  SELECT_ROW,
  DESELECT_ROWS,
  SELECT_ALL_ROWS,
  ADD_ROWS,
  ON_EXPAND_ROW,
  CLEAR_TABLE,
  APPLY_FILTER_SEARCH,
  FETCH_TABLE_PAGE,
  FETCH_TABLE_PAGE_SUCCESS,
  FETCH_TABLE_FILTERS,
  FETCH_TABLE_FILTERS_SUCCESS,
  REORDER_ROWS
} from "../actions/actionTypes";
import { calcVisibleRows } from "../glTableHelpers";
import defaultState from "./defaultState";

const reducer =
  (namespace, defaultStateOverride, reducerOptions = {}) =>
  (state = { ...defaultState, ...defaultStateOverride }, action = {}) => {
    switch (action.type) {
      case `${namespace}/${ADD_ROWS}`: {
        const { rows, columnDefs, nonTagFilters, filters, availableFilters, isRemote } = action.payload;
        const newState = {
          ...state,
          rows,
          filters: Object.keys(state.filters).length > 0 || Object.keys(filters).length === 0 ? state.filters : filters,
          availableFilters,
          search: state.search,
          columnDefs,
          nonTagFilters,
          remote: {
            ...state.remote,
            isRemote
          }
        };
        return {
          ...newState,
          ...calcVisibleRows(newState)
        };
      }
      case `${namespace}/${REORDER_ROWS}`: {
        const { items } = action.payload;
        let reorderedRows = [...items];
        // // Update the order attribute for each row
        reorderedRows = reorderedRows.map((row, index) => {
          const newRow = { ...row };
          const updatedRow = reorderedRows.find(item => item._id === newRow._id);

          if (updatedRow) {
            newRow.order = index;
          }

          return newRow;
        });

        return {
          ...state,
          rows: reorderedRows,
          filteredRows: reorderedRows,
          visibleRows: reorderedRows
        };
      }

      case `${namespace}/${FETCH_TABLE_FILTERS}`: {
        return {
          ...state,
          remote: {
            ...state.remote,
            isLoadingFilters: true
          }
        };
      }
      case `${namespace}/${FETCH_TABLE_FILTERS_SUCCESS}`: {
        const filters = action.payload;

        return {
          ...state,
          availableFilters: filters,
          remote: {
            ...state.remote,
            isLoadingFilters: false
          }
        };
      }
      case `${namespace}/${FETCH_TABLE_PAGE}`: {
        const { id } = action.payload;
        return {
          ...state,
          remote: {
            ...state.remote,
            isRemoteLoading: true,
            remotePageLoadingState: { ...state.remote.remotePageLoadingState, [id]: false }
          }
        };
      }
      case `${namespace}/${FETCH_TABLE_PAGE_SUCCESS}`: {
        const {
          response: {
            data: { data, total_count }
          },
          id
        } = action.payload;
        const idNumber = Number(id);
        const newRemotePageLoadingState = { ...state.remote.remotePageLoadingState, [id]: true };
        const lastRequestedPageId = Math.max(...Object.keys(newRemotePageLoadingState).map(x => Number(x)));
        const newIsRemoteLoading = newRemotePageLoadingState[lastRequestedPageId] === false;
        if (idNumber > state.remote.lastRemoteFetchedPageId) {
          return {
            ...state,
            rows: data,
            filteredRows: data,
            visibleRows: data,
            remote: {
              ...state.remote,
              remoteCount: total_count,
              lastRemoteFetchedPageId: Number(id),
              latestRemoteVersionTimestamp: Date.now(),
              remotePageLoadingState: newRemotePageLoadingState,
              isRemoteLoading: newIsRemoteLoading
            }
          };
        } else {
          return {
            ...state,
            remote: {
              ...state.remote,
              remotePageLoadingState: newRemotePageLoadingState,
              isRemoteLoading: newIsRemoteLoading
            }
          };
        }
      }
      case `${namespace}/${CLEAR_TABLE}`: {
        return {
          ...state,
          rows: [],
          search: "",
          filteredRows: [],
          visibleRows: [],
          selectedRows: [],
          filters: {}
        };
      }
      case `${namespace}/${APPLY_SEARCH}`: {
        const { search } = action.payload;

        const newState = {
          ...state,
          search,
          page: 0
        };

        if (state.remote.isRemote) return { ...newState };

        return {
          ...newState,
          ...calcVisibleRows(newState)
        };
      }

      case `${namespace}/${TOGGLE_SORT}`: {
        const { columnIndex, orderDirection } = action.payload;
        const newState = {
          ...state,
          sorting: [columnIndex, orderDirection]
        };

        if (state.remote.isRemote) return { ...newState };

        return {
          ...newState,
          ...calcVisibleRows(newState)
        };
      }
      case `${namespace}/${ON_EXPAND_ROW}`: {
        const { rowName } = action.payload;
        const { expandRow } = state;
        return {
          ...state,
          expandRow: expandRow === rowName ? "" : rowName
        };
      }
      case `${namespace}/${UPDATE_PAGE_SIZE}`: {
        const newState = {
          ...state,
          pageSize: action.pageSize,
          page: 0
        };

        if (state.remote.isRemote) return { ...newState };

        return {
          ...newState,
          ...calcVisibleRows(newState)
        };
      }
      case `${namespace}/${UPDATE_PAGE}`: {
        const newState = {
          ...state,
          page: action.page
        };

        if (state.remote.isRemote) return { ...newState };

        return {
          ...newState,
          ...calcVisibleRows(newState)
        };
      }
      case `${namespace}/${UPDATE_FILTER_DISPLAY}`: {
        const { menuOpen, menuSelection } = action.payload;
        return {
          ...state,
          menuOpen,
          menuSelection,
          filterSearch: ""
        };
      }
      case `${namespace}/${TOGGLE_FILTER}`: {
        const { filters, menuSelection } = state;
        const { item } = action.payload;

        if (filters[menuSelection]?.includes(item)) {
          return {
            ...state,
            filters: {
              ...filters,
              [menuSelection]: filters[menuSelection].filter(filter => filter !== item)
            }
          };
        } else {
          return {
            ...state,
            filters: {
              ...filters,
              [menuSelection]: [...(filters[menuSelection] || []), item]
            }
          };
        }
      }
      case `${namespace}/${REMOVE_FILTER}`: {
        const { filters, menuSelection } = state;
        const filter = action.payload || menuSelection;
        const newState = {
          ...state,
          filters: {
            ...filters,
            [filter]: []
          }
        };

        if (state.remote.isRemote) return { ...newState };

        return {
          ...newState,
          ...calcVisibleRows(newState)
        };
      }
      case `${namespace}/${REMOVE_ALL_FILTERS}`: {
        const newState = {
          ...state,
          filters: {}
        };

        if (state.remote.isRemote) return { ...newState };

        return {
          ...newState,
          ...calcVisibleRows(newState)
        };
      }
      case `${namespace}/${APPLY_FILTER}`: {
        if (state.remote.isRemote) return { ...state };

        return {
          ...state,
          ...calcVisibleRows({ ...state, page: 0 }),
          page: 0
        };
      }
      case `${namespace}/${SELECT_ROW}`: {
        const { rowId } = action.payload;
        const { selectedRows } = state;
        const updatedSelections = selectedRows.includes(rowId) ? selectedRows.filter(id => id !== rowId) : [...selectedRows, rowId];
        return {
          ...state,
          selectedRows: [...updatedSelections]
        };
      }
      case `${namespace}/${DESELECT_ROWS}`: {
        return {
          ...state,
          selectedRows: []
        };
      }
      case `${namespace}/${SELECT_ALL_ROWS}`: {
        const { selectedRows, visibleRows } = state;
        const selectedRowsCount = selectedRows.length;
        const visibleRowsCount = visibleRows.length;
        const updatedSelections = selectedRowsCount === visibleRowsCount ? [] : visibleRows.map(row => row._id);
        return {
          ...state,
          selectedRows: [...updatedSelections]
        };
      }
      case `${namespace}/${APPLY_FILTER_SEARCH}`: {
        const { filterSearch } = action.payload;
        return {
          ...state,
          filterSearch
        };
      }
      default: {
        if (reducerOptions.extraReducers && action.type in reducerOptions.extraReducers) {
          return reducerOptions.extraReducers[action.type](state, action);
        }
        return state;
      }
    }
  };

export default reducer;
