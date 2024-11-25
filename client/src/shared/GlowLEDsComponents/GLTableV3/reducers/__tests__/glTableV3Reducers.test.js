import glTableReducer from "../glTableReducer";
import * as JestHelpers from "test_utils/jestHelpers";
import {
  applyDateRangeFilter,
  clearTable,
  closeSlider,
  collapseAllDropdownRows,
  deselectDropdownRows,
  fetchTableFilters,
  fetchTablePage,
  toggleSlider,
  removeAllFilters,
  removeFilter,
  reorderDropdownRows,
  reorderRows,
  selectAllDropdownRows,
  selectDropdownRow,
  toggleAllDropdownRows,
  toggleFilter,
  updateFilterDisplay,
  applyUrlParams,
} from "../glTableActions";
import { glTableReducersInitialState } from "../__mocks__/glTableReducers.mocks";
import { mapValues } from "lodash";

const reducers = {
  glTable: glTableReducer("glTable", glTableReducersInitialState),
};
const namespace = "glTable";
const dropdownUniqueKey = "job_id";
const uniqueKey = "job_group_id";
const dropdownRowsUniqueKey = "jobs";

// eslint-disable-next-line max-lines-per-function
describe("glTableReducer", () => {
  it("should handle SELECT_DROPDOWN_ROW", () => {
    const store = JestHelpers.initializeStore(reducers, glTableReducersInitialState);
    store.dispatch(selectDropdownRow(namespace, 178, dropdownUniqueKey, dropdownRowsUniqueKey));
    const { glTable } = store.getState();
    expect(glTable.selectedDropdownRows).toEqual([178]);
  });

  it("should handle SELECT_ALL_DROPDOWN_ROWS", () => {
    const store = JestHelpers.initializeStore(reducers, glTableReducersInitialState);
    store.dispatch(
      selectAllDropdownRows(namespace, glTableReducersInitialState.rows[0], dropdownUniqueKey, dropdownRowsUniqueKey)
    );
    const { glTable } = store.getState();
    expect(glTable.selectedDropdownRows).toEqual([596, 595]); // Update the expected value
  });

  it("should handle DESELECT_DROPDOWN_ROWS", () => {
    const store = JestHelpers.initializeStore(reducers, glTableReducersInitialState);
    store.dispatch(deselectDropdownRows(namespace, [178, 596, 595], dropdownUniqueKey, dropdownRowsUniqueKey));
    const { glTable } = store.getState();
    expect(glTable.selectedDropdownRows).toEqual([]);
  });

  it("should handle TOGGLE_ALL_DROPDOWN_ROWS", () => {
    const store = JestHelpers.initializeStore(reducers, glTableReducersInitialState);
    store.dispatch(toggleAllDropdownRows(namespace, uniqueKey));
    expect(store.getState().glTable.expandedRows).toEqual([178]);
    store.dispatch(toggleAllDropdownRows(namespace, uniqueKey));
    expect(store.getState().glTable.expandedRows).toEqual([]);
  });

  it("should handle COLLAPSE_ALL_DROPDOWN_ROWS", () => {
    const store = JestHelpers.initializeStore(reducers, glTableReducersInitialState);
    store.dispatch(toggleAllDropdownRows(namespace, uniqueKey));
    expect(store.getState().glTable.expandedRows).toEqual([178]);
    expect(store.getState().glTable.expandedRowObjects).toEqual([glTableReducersInitialState.rows[0]]);
    store.dispatch(collapseAllDropdownRows(namespace));
    expect(store.getState().glTable.expandedRows).toEqual([]);
    expect(store.getState().glTable.expandedRowObjects).toEqual([]);
  });

  it("should handle UPDATE_FILTER_DISPLAY", () => {
    const store = JestHelpers.initializeStore(reducers, glTableReducersInitialState);
    const menuOpen = true;
    const menuSelection = "testSelection";

    store.dispatch(updateFilterDisplay(namespace, { menuOpen, menuSelection }));

    const { glTable } = store.getState();
    expect(glTable.menuOpen).toEqual(menuOpen);
    expect(glTable.menuSelection).toEqual(menuSelection);
  });

  it("should handle APPLY_DATE_RANGE_FILTER", () => {
    const newState = {
      glTable: {
        ...glTableReducersInitialState,
        filters: {
          testSelection: [],
        },
        menuSelection: "testSelection",
        availableFilters: {
          testSelection: ["2024-01-01", "2024-01-02", "2024-01-04", "2024-01-05"],
        },
      },
    };
    const store = JestHelpers.initializeStore(reducers, newState);
    const menuSelection = "testSelection";

    store.dispatch(
      applyDateRangeFilter(namespace, { row: menuSelection, item: ["2024-01-01", "2024-01-07"], dateRange: "thisWeek" })
    );

    const { glTable } = store.getState();

    // Add your assertions here
    expect(glTable.filters[menuSelection]).toEqual(["2024-01-01", "2024-01-02", "2024-01-04", "2024-01-05"]);
    expect(glTable.menuSelection).toEqual(menuSelection);
  });

  it("should handle REMOVE_FILTER", () => {
    const store = JestHelpers.initializeStore(reducers, glTableReducersInitialState);
    const filterToRemove = "locations";

    // First, we'll dispatch an action to set a filter
    store.dispatch(updateFilterDisplay(namespace, { menuOpen: true, menuSelection: filterToRemove }));
    store.dispatch(toggleFilter(namespace, { row: "locations", item: "testItem" }));

    // Check that the filter was set correctly
    let { glTable } = store.getState();
    expect(glTable.filters[filterToRemove]).toEqual(["testItem"]);

    // Now, we'll dispatch the REMOVE_FILTER action
    store.dispatch(removeFilter(namespace, filterToRemove));

    // Check that the filter was removed correctly
    glTable = store.getState().glTable;
    expect(glTable.filters[filterToRemove]).toEqual([]);
  });

  it("should handle REMOVE_FILTER for date array", () => {
    const newState = {
      glTable: {
        ...glTableReducersInitialState,
        filters: {
          dates: [],
        },
        menuSelection: "dates",
        availableFilters: {
          dates: [
            "2024-01-01T00:00:00.000Z",
            "2024-01-02T00:00:00.000Z",
            "2024-01-04T00:00:00.000Z",
            "2024-01-05T00:00:00.000Z",
          ],
        },
      },
    };
    const store = JestHelpers.initializeStore(reducers, newState);
    const filterToRemove = "dates";

    store.dispatch(
      applyDateRangeFilter(namespace, {
        row: "dates",
        item: ["2024-01-01T00:00:00.000Z", "2024-01-07T00:00:00.000Z"],
        dateRange: "thisWeek",
      })
    );

    // Check that the filter was set correctly
    let { glTable } = store.getState();
    expect(Array.isArray(glTable.filters[filterToRemove])).toBe(true);
    expect(glTable.filters[filterToRemove].length).toBeGreaterThan(0);

    // Now, we'll dispatch the REMOVE_FILTER action
    store.dispatch(removeFilter(namespace, filterToRemove));

    // Check that the filter was removed correctly and date values are null
    glTable = store.getState().glTable;
    expect(glTable.filters[filterToRemove]).toEqual([]);
    expect(glTable.startDate).toBeNull();
    expect(glTable.endDate).toBeNull();
    expect(glTable.dateRange).toBeNull();
  });

  it("should handle REMOVE_ALL_FILTERS", () => {
    const store = JestHelpers.initializeStore(reducers, glTableReducersInitialState);
    const filtersToSet = ["locations", "users"];

    // First, we'll dispatch actions to set some filters
    filtersToSet.forEach(filter => {
      store.dispatch(updateFilterDisplay(namespace, { menuOpen: true, menuSelection: filter }));
      store.dispatch(toggleFilter(namespace, { row: filter, item: "testItem" }));
    });

    // Check that the filters were set correctly
    let { glTable } = store.getState();
    filtersToSet.forEach(filter => {
      expect(glTable.filters[filter]).toEqual(["testItem"]);
    });
    // Now, we'll dispatch the REMOVE_ALL_FILTERS action
    store.dispatch(removeAllFilters(namespace));

    // Check that all filters were removed correctly
    glTable = store.getState().glTable;
    const updatedFilters = mapValues(glTable.availableFilters, () => []);
    expect(glTable.filters).toEqual(updatedFilters);
  });

  it("should handle applyUrlParams", () => {
    const store = JestHelpers.initializeStore(reducers, glTableReducersInitialState);
    const urlParams = { testParam: "testValue" };

    store.dispatch(applyUrlParams(namespace, urlParams));

    const { glTable } = store.getState();
    expect(glTable.urlParams).toEqual(urlParams);
  });

  it("should dispatch CLEAR_TABLE with an empty payload", () => {
    const mockDispatch = jest.fn();

    clearTable(namespace)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: `${namespace}/CLEAR_TABLE`,
      payload: {},
    });
  });

  it("should handle reorderRows", () => {
    const store = JestHelpers.initializeStore(reducers, glTableReducersInitialState);
    const reorderedItems = [
      { id: 2, name: "Item 2", rank: 0 },
      { id: 1, name: "Item 1", rank: 1 },
    ];

    // Dispatch the action to reorder rows
    store.dispatch(reorderRows(namespace, { reorderedItems }));

    // Check that the rows were reordered correctly
    const { glTable } = store.getState();
    expect(glTable.rows).toEqual(reorderedItems);
  });

  it("should handle reorderDropdownRows, update target row, and not modify unrelated rows", async () => {
    const initialState = {
      glTable: {
        ...glTableReducersInitialState,
        rows: [
          {
            job_group_id: 1,
            jobs: [
              { job_id: 101, name: "Job 1", sequence: 1 },
              { job_id: 102, name: "Job 2", sequence: 2 },
              { job_id: 103, name: "Job 3", sequence: 3 },
            ],
          },
          {
            job_group_id: 2,
            jobs: [
              { job_id: 201, name: "Job 4", sequence: 1 },
              { job_id: 202, name: "Job 5", sequence: 2 },
            ],
          },
        ],
      },
    };

    const store = JestHelpers.initializeStore(
      { glTable: glTableReducer(namespace, initialState.glTable) },
      initialState
    );

    const mockRemoteReorderDropdownApi = jest.fn().mockResolvedValue({});

    await store.dispatch(
      reorderDropdownRows(namespace, {
        parentId: 1,
        reorderedDropdownItems: [
          { job_id: 103, name: "Job 3", sequence: 1 },
          { job_id: 101, name: "Job 1", sequence: 2 },
          { job_id: 102, name: "Job 2", sequence: 3 },
        ],
        remoteReorderDropdownApi: mockRemoteReorderDropdownApi,
        updatedRows: [
          {
            job_group_id: 1,
            jobs: [
              { job_id: 103, name: "Job 3", sequence: 1 },
              { job_id: 101, name: "Job 1", sequence: 2 },
              { job_id: 102, name: "Job 2", sequence: 3 },
            ],
          },
          {
            job_group_id: 2,
            jobs: [
              { job_id: 201, name: "Job 4", sequence: 1 },
              { job_id: 202, name: "Job 5", sequence: 2 },
            ],
          },
        ],
      })
    );

    const newState = store.getState().glTable;
    // Check that the local state was updated for the first row
    expect(newState.rows[0].jobs).toEqual([
      { job_id: 103, name: "Job 3", sequence: 1 },
      { job_id: 101, name: "Job 1", sequence: 2 },
      { job_id: 102, name: "Job 2", sequence: 3 },
    ]);

    // Check that the second row was not modified
    expect(newState.rows[1]).toEqual({
      job_group_id: 2,
      jobs: [
        { job_id: 201, name: "Job 4", sequence: 1 },
        { job_id: 202, name: "Job 5", sequence: 2 },
      ],
    });

    // Check that the remote API was called
    expect(mockRemoteReorderDropdownApi).toHaveBeenCalledTimes(1);
    expect(mockRemoteReorderDropdownApi).toHaveBeenCalledWith({
      parentId: 1,
      reorderedDropdownItems: [
        { job_id: 103, name: "Job 3", sequence: 1 },
        { job_id: 101, name: "Job 1", sequence: 2 },
        { job_id: 102, name: "Job 2", sequence: 3 },
      ],
    });
  });

  it("should handle reorderRows with filters present", () => {
    const initialState = {
      glTable: {
        ...glTableReducersInitialState,
        filters: ["someFilter"],
        rows: [
          { id: 1, name: "Item 1", rank: 0 },
          { id: 2, name: "Item 2", rank: 1 },
        ],
        visibleRows: [
          { id: 1, name: "Item 1", rank: 0 },
          { id: 2, name: "Item 2", rank: 1 },
        ],
      },
    };

    const store = JestHelpers.initializeStore(
      { glTable: glTableReducer(namespace, initialState.glTable) },
      initialState
    );

    const reorderedItems = [
      { id: 2, name: "Item 2", rank: 0 },
      { id: 1, name: "Item 1", rank: 1 },
    ];

    // Dispatch the action to reorder rows
    store.dispatch(reorderRows(namespace, { reorderedItems }));

    // Check that only visibleRows were reordered and rows remained unchanged
    const { glTable } = store.getState();
    expect(glTable.visibleRows).toEqual(reorderedItems);
    expect(glTable.rows).toEqual(initialState.glTable.rows);
    expect(glTable.filters).toEqual(["someFilter"]);
  });

  it("should handle reorderRows for remote tables", () => {
    const initialState = {
      glTable: {
        ...glTableReducersInitialState,
        remote: { isRemote: true },
        rows: [
          { id: 1, name: "Item 1", rank: 0 },
          { id: 2, name: "Item 2", rank: 1 },
        ],
        visibleRows: [
          { id: 1, name: "Item 1", rank: 0 },
          { id: 2, name: "Item 2", rank: 1 },
        ],
        filteredRows: [
          { id: 1, name: "Item 1", rank: 0 },
          { id: 2, name: "Item 2", rank: 1 },
        ],
      },
    };

    const store = JestHelpers.initializeStore(
      { glTable: glTableReducer(namespace, initialState.glTable) },
      initialState
    );

    const reorderedItems = [
      { id: 2, name: "Item 2", rank: 0 },
      { id: 1, name: "Item 1", rank: 1 },
    ];

    // Dispatch the action to reorder rows
    store.dispatch(reorderRows(namespace, { reorderedItems }));

    // Check that rows, visibleRows, and filteredRows were all reordered
    const { glTable } = store.getState();
    expect(glTable.rows).toEqual(reorderedItems);
    expect(glTable.visibleRows).toEqual(reorderedItems);
    expect(glTable.filteredRows).toEqual(reorderedItems);
    expect(glTable.remote.isRemote).toBe(true);
  });
});

describe("fetchTablePage", () => {
  it("should dispatch FETCH_TABLE_PAGE and FETCH_TABLE_PAGE_SUCCESS when the API call is successful", async () => {
    const mockDispatch = jest.fn();
    const mockRemoteApi = jest.fn().mockResolvedValue({ data: "testData" });
    const mockParams = { remoteApi: mockRemoteApi, search: "", filters: {}, sorting: {}, page: 1, pageSize: 10 };

    await fetchTablePage("testNamespace", mockParams)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ type: "testNamespace/FETCH_TABLE_PAGE" })
    );
    expect(mockDispatch).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "testNamespace/FETCH_TABLE_PAGE_SUCCESS",
        payload: { data: "testData", id: "1" },
      })
    );
  });

  it("should show a snackbar when the API call fails", async () => {
    const mockDispatch = jest.fn();
    const mockRemoteApi = jest.fn().mockRejectedValue(new Error("testError"));
    const mockParams = { remoteApi: mockRemoteApi, search: "", filters: {}, sorting: {}, page: 1, pageSize: 10 };

    window.Covy = { showSnackbar: jest.fn() };

    await fetchTablePage("testNamespace", mockParams)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ type: "testNamespace/FETCH_TABLE_PAGE" })
    );
    expect(window.Covy.showSnackbar).toHaveBeenCalledWith({
      message: translateCovy("retreiving_table_page_error"),
      severity: "error",
    });
  });
});

describe("fetchTableFilters", () => {
  it("should dispatch FETCH_TABLE_FILTERS and FETCH_TABLE_FILTERS_SUCCESS when the API call is successful", async () => {
    const mockDispatch = jest.fn();
    const mockRemoteFiltersApi = jest.fn().mockResolvedValue({ data: "testData" });
    const mockParams = { remoteFiltersApi: mockRemoteFiltersApi };

    await fetchTableFilters("testNamespace", mockParams)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ type: "testNamespace/FETCH_TABLE_FILTERS" })
    );
    expect(mockDispatch).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "testNamespace/FETCH_TABLE_FILTERS_SUCCESS",
        payload: { data: "testData" },
      })
    );
  });

  it("should show a snackbar when the API call fails", async () => {
    const mockDispatch = jest.fn();
    const mockRemoteFiltersApi = jest.fn().mockRejectedValue(new Error("testError"));
    const mockParams = { remoteFiltersApi: mockRemoteFiltersApi };

    window.Covy = { showSnackbar: jest.fn() };

    await fetchTableFilters("testNamespace", mockParams)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ type: "testNamespace/FETCH_TABLE_FILTERS" })
    );
    expect(window.Covy.showSnackbar).toHaveBeenCalledWith({
      message: translateCovy("retreiving_table_filters_error"),
      severity: "error",
    });
  });
});

describe("toggleSlider", () => {
  let originalWindowLocation;

  beforeEach(() => {
    originalWindowLocation = window.location;
    delete window.location;
    window.location = { pathname: "/test", search: "?existingParam=value" };
    window.history.pushState = jest.fn();
  });

  afterEach(() => {
    window.location = originalWindowLocation;
  });

  it("should handle toggleSlider with sliderParamName", () => {
    const store = JestHelpers.initializeStore(reducers, glTableReducersInitialState);
    const row = { id: 1, name: "Test Row", searchField: "searchValue" };
    const sliderParamName = { display: "testParam", value: "id" };

    store.dispatch(toggleSlider(namespace, { row, sliderParamName }));

    const { glTable } = store.getState();
    expect(glTable.slider).toEqual({ isOpen: true, row });
    expect(window.history.pushState).toHaveBeenCalledWith({}, "", "/test?existingParam=value&testParam=1");
  });

  it("should toggle slider closed if already open with the same row", () => {
    const initialState = {
      glTable: {
        ...glTableReducersInitialState,
        slider: { isOpen: true, row: { id: 1, name: "Test Row" } },
      },
    };
    const store = JestHelpers.initializeStore(
      { glTable: glTableReducer(namespace, initialState.glTable) },
      initialState
    );
    const row = { id: 1, name: "Test Row" };
    const sliderParamName = { display: "testParam", value: "id" };

    store.dispatch(toggleSlider(namespace, { row, sliderParamName }));

    const { glTable } = store.getState();
    expect(glTable.slider).toEqual({ isOpen: false, row });
  });

  it("should handle toggleSlider with falsy row value", () => {
    const store = JestHelpers.initializeStore(reducers, {
      ...glTableReducersInitialState,
      slider: { isOpen: true, row: { id: 1 } },
    });
    const sliderParamName = { display: "testParam", value: "id" };

    store.dispatch(toggleSlider(namespace, { row: null, sliderParamName }));

    const { glTable } = store.getState();
    expect(glTable.slider).toEqual({ isOpen: false, row: null });
    expect(window.history.pushState).toHaveBeenCalledWith({}, "", "/test?existingParam=value");
  });

  it("should open slider if already open but with a different row", () => {
    const initialState = {
      glTable: {
        ...glTableReducersInitialState,
        slider: { isOpen: true, row: { id: 1, name: "Test Row 1" } },
      },
    };
    const store = JestHelpers.initializeStore(
      { glTable: glTableReducer(namespace, initialState.glTable) },
      initialState
    );
    const row = { id: 2, name: "Test Row 2" };
    const sliderParamName = { display: "testParam", value: "id" };

    store.dispatch(toggleSlider(namespace, { row, sliderParamName }));

    const { glTable } = store.getState();
    expect(glTable.slider).toEqual({ isOpen: true, row });
    expect(window.history.pushState).toHaveBeenCalledWith({}, "", "/test?existingParam=value&testParam=2");
  });

  it("should handle toggleSlider without sliderParamName", () => {
    const store = JestHelpers.initializeStore(reducers, glTableReducersInitialState);
    const row = { id: 1, name: "Test Row" };

    store.dispatch(toggleSlider(namespace, { row, sliderParamName: null }));

    const { glTable } = store.getState();
    expect(glTable.slider).toEqual({ isOpen: true, row });
    expect(window.history.pushState).not.toHaveBeenCalled();
  });
});

describe("closeSlider", () => {
  let originalWindowLocation;

  beforeEach(() => {
    originalWindowLocation = window.location;
    delete window.location;
    window.location = { pathname: "/test", search: "?existingParam=value&testParam=1" };
    window.history.pushState = jest.fn();
  });

  afterEach(() => {
    window.location = originalWindowLocation;
  });

  it("should handle closeSlider with sliderParamName", () => {
    const store = JestHelpers.initializeStore(reducers, {
      ...glTableReducersInitialState,
      slider: { isOpen: true, row: { id: 1 } },
    });
    const sliderParamName = { display: "testParam" };

    store.dispatch(closeSlider(namespace, sliderParamName));

    const { glTable } = store.getState();
    expect(glTable.slider.isOpen).toBe(false);
    expect(window.history.pushState).toHaveBeenCalledWith({}, "", "/test?existingParam=value");
  });

  it("should handle closeSlider without sliderParamName", () => {
    const store = JestHelpers.initializeStore(reducers, {
      ...glTableReducersInitialState,
      slider: { isOpen: true, row: { id: 1 } },
    });

    store.dispatch(closeSlider(namespace));

    const { glTable } = store.getState();
    expect(glTable.slider.isOpen).toBe(false);
    expect(window.history.pushState).not.toHaveBeenCalled();
  });
});
