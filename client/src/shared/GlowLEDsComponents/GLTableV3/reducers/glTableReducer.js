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
  SELECT_ROW,
  DESELECT_ROWS,
  SELECT_ALL_ROWS,
  ADD_ROWS,
  CLEAR_TABLE,
  APPLY_FILTER_SEARCH,
  FETCH_TABLE_PAGE,
  FETCH_TABLE_PAGE_SUCCESS,
  FETCH_TABLE_FILTERS,
  FETCH_TABLE_FILTERS_SUCCESS,
  REORDER_ROWS_SUCCESS,
  SELECT_DROPDOWN_ROW,
  DESELECT_DROPDOWN_ROWS,
  SELECT_ALL_DROPDOWN_ROWS,
  TOGGLE_DROPDOWN_ROW,
  TOGGLE_ALL_DROPDOWN_ROWS,
  COLLAPSE_ALL_DROPDOWN_ROWS,
  APPLY_DATE_RANGE_FILTER,
  APPLY_FILTER,
  TOGGLE_SLIDER,
  CLOSE_SLIDER,
  APPLY_URL_PARAMS,
} from './glTableActionTypes';
import {
  calcVisibleRows,
  isDateArray,
  setFilter,
  updateAllDropdownRowSelections,
  updateAllRowExpansions,
  updateAllRowSelections,
  updateDateRangeFilters,
  updateDropdownRowSelections,
  updateFilters,
  updateRowExpansions,
  updateRowSelections,
} from '../glTableHelpers';
import defaultState from './defaultState';
import { mapValues } from 'lodash';

const reducer =
  (namespace, defaultStateOverride, reducerOptions = {}) =>
  (state = { ...defaultState, ...defaultStateOverride }, action = {}) => {
    switch (action.type) {
      case `${namespace}/${ADD_ROWS}`: {
        const {
          rows,
          columnDefs,
          nonTagFilters,
          filters,
          availableFilters,
          isRemote,
          searchBy,
          noPagination,
          customFilters,
          uniqueKey,
          dropdownUniqueKey,
        } = action.payload;
        const newState = {
          ...state,
          rows,
          filters: Object.keys(state.filters).length > 0 || Object.keys(filters).length === 0 ? state.filters : filters,
          availableFilters,
          customFilters,
          search: state.search,
          columnDefs,
          nonTagFilters,
          searchBy,
          noPagination,
          uniqueKey,
          dropdownUniqueKey,
          remote: {
            ...state.remote,
            isRemote,
          },
        };
        return {
          ...newState,
          ...calcVisibleRows(newState),
        };
      }
      case `${namespace}/${REORDER_ROWS_SUCCESS}`: {
        const { reorderedItems } = action.payload;

        if (state.filters && state.filters.length > 0) {
          return {
            ...state,
            visibleRows: reorderedItems,
          };
        }

        if (state.remote.isRemote) {
          return { ...state, visibleRows: reorderedItems, filteredRows: reorderedItems, rows: reorderedItems };
        }
        const newState = {
          ...state,
          rows: reorderedItems,
        };
        return {
          ...newState,
          ...calcVisibleRows(newState),
        };
      }

      case `${namespace}/${FETCH_TABLE_FILTERS}`: {
        return {
          ...state,
          remote: {
            ...state.remote,
            isLoadingFilters: true,
          },
        };
      }
      case `${namespace}/${FETCH_TABLE_FILTERS_SUCCESS}`: {
        const filters = action.payload;

        return {
          ...state,
          availableFilters: filters,
          remote: {
            ...state.remote,
            isLoadingFilters: false,
          },
        };
      }
      case `${namespace}/${FETCH_TABLE_PAGE}`: {
        const { id } = action.payload;
        return {
          ...state,
          remote: {
            ...state.remote,
            isRemoteLoading: true,
            remotePageLoadingState: { ...state.remote.remotePageLoadingState, [id]: false },
          },
        };
      }
      case `${namespace}/${FETCH_TABLE_PAGE_SUCCESS}`: {
        const {
          data: { data, total_count, parse },
          id,
        } = action.payload;

        const idNumber = Number(id);
        const newRemotePageLoadingState = { ...state.remote.remotePageLoadingState, [id]: true };
        const lastRequestedPageId = Math.max(...Object.keys(newRemotePageLoadingState).map(x => Number(x)));
        const newIsRemoteLoading = newRemotePageLoadingState[lastRequestedPageId] === false;

        // For sql queries that return a stringified array of objects for its result set (often queries that do aggregations)
        const rows = parse && typeof data === 'string' ? JSON.parse(data) : data;

        // when making mock state for jest, dont forget to set the lastRemoteFetchedPageId to 0 so it can store the response from the initial request
        if (idNumber > state.remote.lastRemoteFetchedPageId) {
          return {
            ...state,
            rows,
            filteredRows: rows,
            visibleRows: rows,
            remote: {
              ...state.remote,
              remoteCount: total_count,
              lastRemoteFetchedPageId: Number(id),
              latestRemoteVersionTimestamp: Date.now(),
              remotePageLoadingState: newRemotePageLoadingState,
              isRemoteLoading: newIsRemoteLoading,
            },
          };
        } else {
          return {
            ...state,
            remote: {
              ...state.remote,
              remotePageLoadingState: newRemotePageLoadingState,
              isRemoteLoading: newIsRemoteLoading,
            },
          };
        }
      }
      case `${namespace}/${CLEAR_TABLE}`: {
        return {
          ...state,
          rows: [],
          search: '',
          filteredRows: [],
          visibleRows: [],
          selectedRows: [],
          selectedRowObjects: [],
          filters: {},
        };
      }
      case `${namespace}/${APPLY_SEARCH}`: {
        const { search } = action.payload;

        const newState = { ...state, search, page: 0 };

        if (state.remote.isRemote) return { ...newState };

        return { ...newState, ...calcVisibleRows(newState) };
      }

      case `${namespace}/${TOGGLE_SORT}`: {
        const { columnIndex, orderDirection } = action.payload;

        if (state.remote.isRemote) return { ...state, sorting: [columnIndex, orderDirection] };

        const newState = { ...state, sorting: [columnIndex, orderDirection] };
        return { ...newState, ...calcVisibleRows(newState) };
      }

      case `${namespace}/${UPDATE_PAGE_SIZE}`: {
        const { pageSize } = action.payload;
        const newState = { ...state, pageSize, page: 0 };

        if (state.remote.isRemote) return { ...newState };
        return {
          ...newState,
          ...calcVisibleRows(newState),
        };
      }

      case `${namespace}/${UPDATE_PAGE}`: {
        const { page } = action.payload;
        const newState = { ...state, page };

        if (state.remote.isRemote) return { ...newState };

        return {
          ...newState,
          ...calcVisibleRows(newState),
        };
      }

      case `${namespace}/${UPDATE_FILTER_DISPLAY}`: {
        const { menuOpen, menuSelection } = action.payload;

        return {
          ...state,
          menuOpen,
          menuSelection,
          filterSearch: '',
        };
      }

      case `${namespace}/${TOGGLE_FILTER}`: {
        const { filter } = action.payload;
        const { item } = filter;

        const { filters, menuSelection } = state;
        const updatedFilters = {
          ...filters,
          [menuSelection]: updateFilters(filters[menuSelection], item),
        };

        if (state.remote.isRemote) return { ...state, filters: updatedFilters };

        const newState = { ...state, filters: updatedFilters, page: 0 };
        return { ...newState, ...calcVisibleRows(newState) };
      }
      case `${namespace}/${APPLY_FILTER}`: {
        const { filter } = action.payload;
        const { item, menuSelection: filterMenuSelection } = filter;

        const { filters, menuSelection } = state;
        const updatedFilters = {
          ...filters,
          [menuSelection || filterMenuSelection]: setFilter(filters[menuSelection || filterMenuSelection], item),
        };

        if (state.remote.isRemote) return { ...state, filters: updatedFilters };

        const newState = { ...state, filters: updatedFilters, page: 0 };
        return { ...newState, ...calcVisibleRows(newState) };
      }
      case `${namespace}/${APPLY_DATE_RANGE_FILTER}`: {
        const { filter } = action.payload;
        const { item, dateRange } = filter;
        const [startDate, endDate] = item;

        const { filters, menuSelection, availableFilters } = state;
        const updatedFilters = {
          ...filters,
          [menuSelection]: updateDateRangeFilters(item, availableFilters[menuSelection]),
        };

        if (state.remote.isRemote) return { ...state, filters: updatedFilters, startDate, endDate, dateRange };

        const newState = { ...state, startDate, endDate, dateRange, filters: updatedFilters, page: 0 };
        return { ...newState, ...calcVisibleRows(newState) };
      }
      case `${namespace}/${REMOVE_FILTER}`: {
        const { filter } = action.payload;

        const { filters, menuSelection } = state;

        const updatedFilters = { ...filters, [filter || menuSelection]: [] };

        if (state.remote.isRemote) return { ...state, filters: updatedFilters };

        const newState = { ...state, filters: updatedFilters };
        if (isDateArray(filters[menuSelection])) {
          return {
            ...newState,
            startDate: null,
            endDate: null,
            dateRange: null,
            ...calcVisibleRows(newState),
          };
        }

        return { ...newState, ...calcVisibleRows(newState) };
      }

      case `${namespace}/${REMOVE_ALL_FILTERS}`: {
        const { availableFilters } = state;
        const updatedFilters = mapValues(availableFilters, () => []);

        if (state.remote.isRemote) return { ...state, filters: updatedFilters };

        const newState = { ...state, filters: updatedFilters };
        return { ...newState, ...calcVisibleRows(newState) };
      }

      case `${namespace}/${TOGGLE_DROPDOWN_ROW}`: {
        const { rowId, uniqueKey } = action.payload;

        const updates = updateRowExpansions(state, rowId, uniqueKey);
        return { ...state, ...updates };
      }

      case `${namespace}/${TOGGLE_ALL_DROPDOWN_ROWS}`: {
        const { uniqueKey } = action.payload;

        const updates = updateAllRowExpansions(state, uniqueKey);
        return { ...state, ...updates };
      }

      case `${namespace}/${COLLAPSE_ALL_DROPDOWN_ROWS}`: {
        return { ...state, expandedRows: [], expandedRowObjects: [] };
      }

      case `${namespace}/${SELECT_ROW}`: {
        const { rowId, uniqueKey } = action.payload;

        const updates = updateRowSelections(state, rowId, uniqueKey);
        return { ...state, ...updates };
      }

      case `${namespace}/${SELECT_ALL_ROWS}`: {
        const { uniqueKey, determineDisableRow } = action.payload;

        const updates = updateAllRowSelections(state, uniqueKey, determineDisableRow);
        return { ...state, ...updates };
      }

      case `${namespace}/${DESELECT_ROWS}`: {
        return { ...state, selectedRows: [], selectedRowObjects: [] };
      }

      case `${namespace}/${TOGGLE_SLIDER}`: {
        const { row, sliderParamName } = action.payload;

        if (sliderParamName?.display && sliderParamName?.value) {
          const params = new URLSearchParams(window.location.search);
          const paramKey = typeof sliderParamName === 'object' ? sliderParamName.display : sliderParamName;
          const valueKey = typeof sliderParamName === 'object' ? sliderParamName.value : sliderParamName;

          if (state.slider?.row?.id === row?.id) {
            params.delete(paramKey);
          } else {
            params.set(paramKey, row[valueKey]);
          }

          const newUrl = `${window.location.pathname}?${params.toString()}`;
          window.history.pushState({}, '', newUrl);
        }

        if (!row) {
          return { ...state, slider: { isOpen: false, row: null } };
        }

        if (state.slider?.row?.id === row.id) {
          return { ...state, slider: { isOpen: !state.slider.isOpen, row }, urlParams: null };
        }
        return { ...state, slider: { isOpen: true, row } };
      }
      case `${namespace}/${CLOSE_SLIDER}`: {
        const { sliderParamName } = action.payload;
        if (sliderParamName) {
          const params = new URLSearchParams(window.location.search);
          const paramKey = typeof sliderParamName === 'object' ? sliderParamName.display : sliderParamName;
          params.delete(paramKey);

          const newUrl = `${window.location.pathname}?${params.toString()}`;
          window.history.pushState({}, '', newUrl);
        }
        return { ...state, slider: { ...state.slider, isOpen: false }, urlParams: null };
      }
      case `${namespace}/${APPLY_URL_PARAMS}`: {
        const { urlParams } = action.payload;
        return { ...state, urlParams };
      }

      case `${namespace}/${SELECT_DROPDOWN_ROW}`: {
        const { dropdownRowId, dropdownUniqueKey, dropdownRowsUniqueKey } = action.payload;
        const updates = updateDropdownRowSelections(state, dropdownRowId, dropdownUniqueKey, dropdownRowsUniqueKey);
        return { ...state, ...updates };
      }

      case `${namespace}/${SELECT_ALL_DROPDOWN_ROWS}`: {
        const { row, dropdownUniqueKey, dropdownRowsUniqueKey } = action.payload;

        const updates = updateAllDropdownRowSelections(state, row, dropdownUniqueKey, dropdownRowsUniqueKey);
        return { ...state, ...updates };
      }

      case `${namespace}/${DESELECT_DROPDOWN_ROWS}`: {
        return { ...state, selectedDropdownRows: [], selectedDropdownRowObjects: [] };
      }

      case `${namespace}/${APPLY_FILTER_SEARCH}`: {
        const { filterSearch } = action.payload;
        return { ...state, filterSearch };
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
