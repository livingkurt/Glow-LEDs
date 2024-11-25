/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  updateDropdownRowSelections,
  updateAllRowSelections,
  updateRowSelections,
  updateAllDropdownRowSelections,
  updateAllRowExpansions,
  updateRowExpansions,
  toTitleCase,
  isDateArray,
  determineSubMenuText,
  menuItemKey,
  updateDateRangeFilters,
  determineCheckboxSelection,
  determineEnabledRowCount,
  chipLabel,
  getChips,
  getBooleanChip,
  getMultiselectChip,
  getSingleChip,
  filterByKeys,
  applySearch,
  rowIdentifier,
} from "../glTableHelpers";

describe("glTableHelpers", () => {
  describe("updateDropdownRowSelections", () => {
    it("should remove the dropdown row from selections if it is already selected", () => {
      const state = {
        selectedDropdownRows: ["row1", "row2"],
        selectedDropdownRowObjects: [{ id: "row1" }, { id: "row2" }],
        visibleRows: [{ dropdownRows: [{ id: "row1" }, { id: "row2" }] }],
      };
      const dropdownRowId = "row1";
      const dropdownUniqueKey = "id";
      const dropdownRowsUniqueKey = "dropdownRows";

      const result = updateDropdownRowSelections(state, dropdownRowId, dropdownUniqueKey, dropdownRowsUniqueKey);

      expect(result).toEqual({
        selectedDropdownRows: ["row2"],
        selectedDropdownRowObjects: [{ id: "row2" }],
      });
    });

    it("should add the dropdown row to selections if it is not already selected", () => {
      const state = {
        selectedDropdownRows: ["row2"],
        selectedDropdownRowObjects: [{ id: "row2" }],
        visibleRows: [{ dropdownRows: [{ id: "row1" }, { id: "row2" }] }],
      };
      const dropdownRowId = "row1";
      const dropdownUniqueKey = "id";
      const dropdownRowsUniqueKey = "dropdownRows";

      const result = updateDropdownRowSelections(state, dropdownRowId, dropdownUniqueKey, dropdownRowsUniqueKey);

      expect(result).toEqual({
        selectedDropdownRows: ["row2", "row1"],
        selectedDropdownRowObjects: [{ id: "row2" }, { id: "row1" }],
      });
    });
  });

  describe("updateRowExpansions", () => {
    it("should remove the row from expansions if it is already expanded", () => {
      const state = {
        expandedRows: ["row1", "row2"],
        expandedRowObjects: [{ id: "row1" }, { id: "row2" }],
        visibleRows: [{ id: "row1" }, { id: "row2" }],
      };
      const rowId = "row1";
      const uniqueKey = "id";

      const result = updateRowExpansions(state, rowId, uniqueKey);

      expect(result).toEqual({
        expandedRows: ["row2"],
        expandedRowObjects: [{ id: "row2" }],
      });
    });

    it("should add the row to expansions if it is not already expanded", () => {
      const state = {
        expandedRows: ["row2"],
        expandedRowObjects: [{ id: "row2" }],
        visibleRows: [{ id: "row1" }, { id: "row2" }],
      };
      const rowId = "row1";
      const uniqueKey = "id";

      const result = updateRowExpansions(state, rowId, uniqueKey);

      expect(result).toEqual({
        expandedRows: ["row2", "row1"],
        expandedRowObjects: [{ id: "row2" }, { id: "row1" }],
      });
    });
  });

  describe("updateAllRowExpansions", () => {
    it("should collapse all rows if all rows are expanded", () => {
      const state = {
        expandedRows: ["row1", "row2"],
        visibleRows: [{ id: "row1" }, { id: "row2" }],
      };
      const uniqueKey = "id";

      const result = updateAllRowExpansions(state, uniqueKey);

      expect(result).toEqual({
        expandedRows: [],
        expandedRowObjects: [],
      });
    });

    it("should expand all rows if not all rows are expanded", () => {
      const state = {
        expandedRows: ["row1"],
        visibleRows: [{ id: "row1" }, { id: "row2" }],
      };
      const uniqueKey = "id";

      const result = updateAllRowExpansions(state, uniqueKey);

      expect(result).toEqual({
        expandedRows: ["row1", "row2"],
        expandedRowObjects: [{ id: "row1" }, { id: "row2" }],
      });
    });
  });

  describe("updateAllRowSelections", () => {
    it("should clear all selections if all rows are selected", () => {
      const state = {
        selectedRows: ["row1", "row2"],
        visibleRows: [{ id: "row1" }, { id: "row2" }],
      };
      const uniqueKey = "id";
      const determineDisableRow = () => false;

      const result = updateAllRowSelections(state, uniqueKey, determineDisableRow);

      expect(result).toEqual({
        selectedRows: [],
        selectedRowObjects: [],
      });
    });

    it("should select all rows if not all rows are selected", () => {
      const state = {
        selectedRows: ["row1"],
        visibleRows: [{ id: "row1" }, { id: "row2" }],
      };
      const uniqueKey = "id";
      const determineDisableRow = () => false;

      const result = updateAllRowSelections(state, uniqueKey, determineDisableRow);

      expect(result).toEqual({
        selectedRows: ["row1", "row2"],
        selectedRowObjects: [{ id: "row1" }, { id: "row2" }],
      });
    });

    it("should select all rows when determineDisableRow is not provided", () => {
      const state = {
        selectedRows: ["row1"],
        visibleRows: [{ id: "row1" }, { id: "row2" }],
      };

      const uniqueKey = "id";
      const result = updateAllRowSelections(state, uniqueKey);

      expect(result).toEqual({
        selectedRows: ["row1", "row2"],
        selectedRowObjects: [{ id: "row1" }, { id: "row2" }],
      });
    });

    it("should select only enabled visible rows when determineDisableRow is provided", () => {
      const state = {
        selectedRows: [],
        visibleRows: [
          { id: "row1", disabled: false },
          { id: "row2", disabled: true },
          { id: "row3", disabled: false },
        ],
      };

      const uniqueKey = "id";
      const determineDisableRow = row => row.disabled;

      const result = updateAllRowSelections(state, uniqueKey, determineDisableRow);

      expect(result).toEqual({
        selectedRows: ["row1", "row3"],
        selectedRowObjects: [
          { id: "row1", disabled: false },
          { id: "row3", disabled: false },
        ],
      });
    });

    it("should handle no visible rows", () => {
      const state = {
        selectedRows: [],
        visibleRows: [],
      };
      const uniqueKey = "id";

      const result = updateAllRowSelections(state, uniqueKey);

      expect(result).toEqual({
        selectedRows: [],
        selectedRowObjects: [],
      });
    });

    it("should handle all visible rows being disabled", () => {
      const state = {
        selectedRows: [],
        visibleRows: [
          { id: "row1", disabled: true },
          { id: "row2", disabled: true },
        ],
      };
      const uniqueKey = "id";
      const determineDisableRow = row => row.disabled;

      const result = updateAllRowSelections(state, uniqueKey, determineDisableRow);

      expect(result).toEqual({
        selectedRows: [],
        selectedRowObjects: [],
      });
    });
  });

  describe("updateRowSelections", () => {
    it("should remove the row from selections if it is already selected", () => {
      const state = {
        selectedRows: ["row1", "row2"],
        selectedRowObjects: [{ id: "row1" }, { id: "row2" }],
        visibleRows: [{ id: "row1" }, { id: "row2" }],
      };
      const rowId = "row1";
      const uniqueKey = "id";

      const result = updateRowSelections(state, rowId, uniqueKey);

      expect(result).toEqual({
        selectedRows: ["row2"],
        selectedRowObjects: [{ id: "row2" }],
      });
    });

    it("should add the row to selections if it is not already selected", () => {
      const state = {
        selectedRows: ["row2"],
        selectedRowObjects: [{ id: "row2" }],
        visibleRows: [{ id: "row1" }, { id: "row2" }],
      };
      const rowId = "row1";
      const uniqueKey = "id";

      const result = updateRowSelections(state, rowId, uniqueKey);

      expect(result).toEqual({
        selectedRows: ["row2", "row1"],
        selectedRowObjects: [{ id: "row2" }, { id: "row1" }],
      });
    });
  });

  describe("updateAllDropdownRowSelections", () => {
    it("should deselect all dropdown rows if all are selected", () => {
      const state = {
        selectedDropdownRows: ["row1", "row2"],
        selectedDropdownRowObjects: [{ id: "row1" }, { id: "row2" }],
      };
      const row = { dropdownRows: [{ id: "row1" }, { id: "row2" }] };
      const dropdownUniqueKey = "id";
      const dropdownRowsUniqueKey = "dropdownRows";

      const result = updateAllDropdownRowSelections(state, row, dropdownUniqueKey, dropdownRowsUniqueKey);

      expect(result).toEqual({
        selectedDropdownRows: [],
        selectedDropdownRowObjects: [],
      });
    });

    it("should select all dropdown rows if not all are selected", () => {
      const state = {
        selectedDropdownRows: ["row1"],
        selectedDropdownRowObjects: [{ id: "row1" }],
      };
      const row = { dropdownRows: [{ id: "row1" }, { id: "row2" }] };
      const dropdownUniqueKey = "id";
      const dropdownRowsUniqueKey = "dropdownRows";

      const result = updateAllDropdownRowSelections(state, row, dropdownUniqueKey, dropdownRowsUniqueKey);

      expect(result).toEqual({
        selectedDropdownRows: ["row1", "row2"],
        selectedDropdownRowObjects: [{ id: "row1" }, { id: "row2" }],
      });
    });
  });

  describe("toTitleCase", () => {
    it("should return an empty string if the input is null", () => {
      const result = toTitleCase(null);
      expect(result).toEqual("");
    });

    it("should return an empty string if the input is an empty string", () => {
      const result = toTitleCase("");
      expect(result).toEqual("");
    });

    it("should return the same string if there are no hyphens or underscores", () => {
      const result = toTitleCase("Test");
      expect(result).toEqual("Test");
    });

    it("should convert a hyphenated string to title case", () => {
      const result = toTitleCase("test-string");
      expect(result).toEqual("Test String");
    });

    it("should convert an underscored string to title case", () => {
      const result = toTitleCase("test_string");
      expect(result).toEqual("Test String");
    });

    it("should convert a string with leading hyphens and underscores to title case", () => {
      const result = toTitleCase("---test_string");
      expect(result).toEqual("Test String");
    });
  });

  describe("isDateArray", () => {
    it("should return true if all items in the array are valid date strings", () => {
      const items = ["2023-12-23T06:41:13.019Z", "2023-11-02T22:57:46.901Z", "2023-12-08T01:58:20.025Z"];
      expect(isDateArray(items)).toBe(true);
    });

    it("should return false if any item in the array is not a valid date string", () => {
      const items = ["2023-12-23T06:41:13.019Z", "not a date"];
      expect(isDateArray(items)).toBe(false);
    });

    it("should return false if any item in the array is not a string", () => {
      const items = ["2023-12-23T06:41:13.019Z", 123];
      expect(isDateArray(items)).toBe(false);
    });

    it("should return false if the input is not an array", () => {
      const items = "2023-12-23T06:41:13.019Z";
      expect(isDateArray(items)).toBe(false);
    });
  });

  describe("determineSubMenuText", () => {
    it("should return the title case of the string if item is a string", () => {
      const item = "test string";
      const expected = toTitleCase(item);
      const result = determineSubMenuText(item);
      expect(result).toEqual(expected);
    });

    it("should return the title case of the display property if item is an object", () => {
      const item = { display: "test string" };
      const expected = toTitleCase(item.display);
      const result = determineSubMenuText(item);
      expect(result).toEqual(expected);
    });

    it("should return the item itself if item is neither a string nor an object", () => {
      const item = 123;
      const result = determineSubMenuText(item);
      expect(result).toEqual(item);
    });
  });

  describe("menuItemKey", () => {
    it("should return the display property if the item is an object", () => {
      const item = { display: "testDisplay" };
      const result = menuItemKey(item);
      expect(result).toEqual("testDisplay");
    });

    it("should return the item itself if the item is not an object", () => {
      const item = "testItem";
      const result = menuItemKey(item);
      expect(result).toEqual("testItem");
    });
  });

  describe("updateDateRangeFilters", () => {
    it("should return filtered options within the date range if item is an array", () => {
      const item = ["2022-01-01", "2022-01-31"];
      const availableFilterOptions = ["2022-01-15", "2022-02-01", "2022-01-01", "2022-01-31"];

      const result = updateDateRangeFilters(item, availableFilterOptions);

      expect(result).toEqual(["2022-01-15", "2022-01-01", "2022-01-31"]);
    });

    it("should return an empty array if item is not an array", () => {
      const item = "2022-01-01";
      const availableFilterOptions = ["2022-01-15", "2022-02-01", "2022-01-01", "2022-01-31"];

      const result = updateDateRangeFilters(item, availableFilterOptions);

      expect(result).toEqual([]);
    });

    it("should return an empty array if no options are within the date range", () => {
      const item = ["2022-01-01", "2022-01-31"];
      const availableFilterOptions = ["2022-02-01", "2022-02-15", "2022-02-28"];

      const result = updateDateRangeFilters(item, availableFilterOptions);

      expect(result).toEqual([]);
    });
  });

  describe("determineCheckboxSelection", () => {
    it("should return true if item is an object and is in the filters", () => {
      const item = { key: "value" };
      const filters = { menu1: [item] };
      const menuSelection = "menu1";

      const result = determineCheckboxSelection(item, filters, menuSelection);

      expect(result).toBe(true);
    });

    it("should return false if item is an object and is not in the filters", () => {
      const item = { key: "value" };
      const filters = { menu1: [{ key: "otherValue" }] };
      const menuSelection = "menu1";

      const result = determineCheckboxSelection(item, filters, menuSelection);

      expect(result).toBe(false);
    });

    it("should return true if item is not an object and is in the filters", () => {
      const item = "value";
      const filters = { menu1: [item] };
      const menuSelection = "menu1";

      const result = determineCheckboxSelection(item, filters, menuSelection);

      expect(result).toBe(true);
    });

    it("should return false if item is not an object and is not in the filters", () => {
      const item = "value";
      const filters = { menu1: ["otherValue"] };
      const menuSelection = "menu1";

      const result = determineCheckboxSelection(item, filters, menuSelection);

      expect(result).toBe(false);
    });

    it("should return undefined if menuSelection is not in filters", () => {
      const item = "value";
      const filters = { menu1: [item] };
      const menuSelection = "menu2";

      const result = determineCheckboxSelection(item, filters, menuSelection);

      expect(result).toBe(undefined);
    });
  });

  describe("chipLabel", () => {
    it("should return the display name if chip name is an object", () => {
      const chip = { name: { display: "Test Display" } };
      const result = chipLabel(chip);
      expect(result).toEqual("Test Display");
    });

    it("should return the name if chip name is not an object", () => {
      const chip = { name: "Test Name" };
      const result = chipLabel(chip);
      expect(result).toEqual("Test Name");
    });

    it("should truncate the label if it exceeds the maximum length", () => {
      const chip = { name: "This is a very long name that exceeds the maximum length" };
      const result = chipLabel(chip);
      expect(result).toEqual("This is a very long name that excee...");
    });

    it("should not truncate the label if it does not exceed the maximum length", () => {
      const chip = { name: "This is a short name" };
      const result = chipLabel(chip);
      expect(result).toEqual("This is a short name");
    });
    it("should return the display value if chip name is an object and contains a valid date", () => {
      const chip = { name: { display: "04/08/2024" } };
      const result = chipLabel(chip);
      expect(result).toEqual("04/08/2024");
    });

    it("should return the name if chip name is a string and contains a valid date", () => {
      const chip = { name: "04/08/2024" };
      const result = chipLabel(chip);
      expect(result).toEqual("04/08/2024");
    });

    it("should return the display value if chip name is an object and contains a valid date range", () => {
      const chip = { name: { display: "04/08/2024 - 04/14/2024" } };
      const result = chipLabel(chip);
      expect(result).toEqual("04/08/2024 - 04/14/2024");
    });

    it("should return the name if chip name is a string and contains a valid date range", () => {
      const chip = { name: "04/08/2024 - 04/14/2024" };
      const result = chipLabel(chip);
      expect(result).toEqual("04/08/2024 - 04/14/2024");
    });

    it("should apply toTitleCase to the display value if chip name is an object and does not contain a valid date", () => {
      const chip = { name: { display: "test display" } };
      const result = chipLabel(chip);
      expect(result).toEqual("Test display");
    });

    it("should apply toTitleCase to the name if chip name is a string and does not contain a valid date", () => {
      const chip = { name: "test name" };
      const result = chipLabel(chip);
      expect(result).toEqual("Test name");
    });
  });

  describe("getChips", () => {
    it("should return an empty array when filters are empty", () => {
      const filters = {};
      const booleanFilters = {};
      const externalFilters = [];
      const startDate = null;
      const endDate = null;

      const result = getChips(filters, booleanFilters, externalFilters, startDate, endDate);

      expect(result).toEqual([]);
    });

    it("should return boolean chips when filters contain boolean values", () => {
      const filters = { filter1: [true] };
      const booleanFilters = { filter1: true };
      const externalFilters = [];
      const startDate = null;
      const endDate = null;

      const result = getChips(filters, booleanFilters, externalFilters, startDate, endDate);

      expect(result).toEqual([getBooleanChip("filter1", booleanFilters)]);
    });

    it("should return multiselect chips when filters contain multiple values", () => {
      const filters = { filter1: ["value1", "value2"] };
      const booleanFilters = {};
      const externalFilters = [];
      const startDate = null;
      const endDate = null;

      const result = getChips(filters, booleanFilters, externalFilters, startDate, endDate);

      expect(result).toEqual([getMultiselectChip("filter1", ["value1", "value2"], startDate, endDate)]);
    });

    it("should return single chips when filters contain a single value", () => {
      const filters = { filter1: ["value1"] };
      const booleanFilters = {};
      const externalFilters = [];
      const startDate = null;
      const endDate = null;

      const result = getChips(filters, booleanFilters, externalFilters, startDate, endDate);

      expect(result).toEqual([getSingleChip("filter1", ["value1"])]);
    });

    it("should ignore external filters", () => {
      const filters = { filter1: ["value1"], filter2: ["value2"] };
      const booleanFilters = {};
      const externalFilters = ["filter1"];
      const startDate = null;
      const endDate = null;

      const result = getChips(filters, booleanFilters, externalFilters, startDate, endDate);

      expect(result).toEqual([getSingleChip("filter2", ["value2"])]);
    });

    it("should handle date filters correctly", () => {
      const filters = { filter1: ["2024-04-03T00:00:00.000Z"] };
      const booleanFilters = {};
      const externalFilters = [];
      const startDate = "2024-04-03T00:00:00.000Z";
      const endDate = "2024-04-03T00:00:00.000Z";
      const result = getChips(filters, booleanFilters, externalFilters, startDate, endDate);
      expect(result).toEqual([getSingleChip("filter1", ["2024-04-03T00:00:00.000Z"])]);
    });

    it("should handle date range filters correctly", () => {
      const filters = { filter1: ["2024-04-03T00:00:00.000Z", "2024-04-05T00:00:00.000Z"] };
      const booleanFilters = {};
      const externalFilters = [];
      const startDate = "2024-04-03T00:00:00.000Z";
      const endDate = "2024-04-05T00:00:00.000Z";
      const result = getChips(filters, booleanFilters, externalFilters, startDate, endDate);
      expect(result).toEqual([
        getMultiselectChip("filter1", ["2024-04-03T00:00:00.000Z", "2024-04-05T00:00:00.000Z"], startDate, endDate),
      ]);
    });

    it("should handle a combination of filter types", () => {
      const filters = {
        filter1: [true],
        filter2: ["value1", "value2"],
        filter3: ["value3"],
        filter4: ["2024-04-03T00:00:00.000Z"],
      };
      const booleanFilters = { filter1: true };
      const externalFilters = ["filter3"];
      const startDate = "2024-04-03T00:00:00.000Z";
      const endDate = "2024-04-03T00:00:00.000Z";
      const result = getChips(filters, booleanFilters, externalFilters, startDate, endDate);
      expect(result).toEqual([
        getBooleanChip("filter1", booleanFilters),
        getMultiselectChip("filter2", ["value1", "value2"], startDate, endDate),
        getSingleChip("filter4", ["2024-04-03T00:00:00.000Z"]),
      ]);
    });
  });

  describe("filterByKeys", () => {
    const rows = [
      { id: 1, keys: [{ key: "color", value: ["red", "blue"] }] },
      { id: 2, keys: [{ key: "size", value: ["small"] }] },
      {
        id: 3,
        keys: [
          { key: "color", value: ["green"] },
          { key: "size", value: ["large"] },
        ],
      },
      { id: 4, keys: [] },
    ];

    it("should return all rows when filters are empty", () => {
      const filters = {};
      const nonTagFilters = ["color"];
      const externalFilters = [];

      const result = filterByKeys(rows, filters, nonTagFilters, externalFilters);

      expect(result).toEqual(rows);
    });

    it("should filter rows based on active filters", () => {
      const filters = { color: ["red", "blue"], size: ["small"] };
      const nonTagFilters = ["color"];
      const externalFilters = [];

      const result = filterByKeys(rows, filters, nonTagFilters, externalFilters);
      expect(result).toEqual([
        {
          "id": 2,
          "keys": [
            {
              "key": "size",
              "value": ["small"],
            },
          ],
        },
      ]);
    });

    it("should return an empty array when no rows match the filters", () => {
      const filters = { color: ["yellow"], size: ["medium"] };
      const nonTagFilters = ["color"];
      const externalFilters = [];

      const result = filterByKeys(rows, filters, nonTagFilters, externalFilters);

      expect(result).toEqual([]);
    });

    it("should handle rows with missing keys property", () => {
      const rowsWithMissingKeys = [
        { id: 1, tags: [{ key: "color", value: ["red", "blue"] }] },
        { id: 2, tags: [{ key: "size", value: ["small"] }] },
      ];
      const filters = { color: ["red"] };
      const nonTagFilters = ["color"];
      const externalFilters = [];

      const result = filterByKeys(rowsWithMissingKeys, filters, nonTagFilters, externalFilters);

      expect(result).toEqual([
        { id: 1, tags: [{ key: "color", value: ["red", "blue"] }] },
        { id: 2, tags: [{ key: "size", value: ["small"] }] },
      ]);
    });

    it("should handle empty rows array", () => {
      const emptyRows = [];
      const filters = { color: ["red"] };
      const nonTagFilters = ["color"];
      const externalFilters = [];

      const result = filterByKeys(emptyRows, filters, nonTagFilters, externalFilters);

      expect(result).toEqual([]);
    });
  });

  describe("determineEnabledRowCount", () => {
    it("should return total number of rows if all rows are enabled", () => {
      const rows = [
        { id: 1, enabled: true },
        { id: 2, enabled: true },
        { id: 3, enabled: true },
      ];
      const determineDisableRow = row => !row.enabled;

      const result = determineEnabledRowCount(rows, determineDisableRow);
      expect(result).toBe(rows.length);
    });

    it("should return only the number of rows that are enabled", () => {
      const rows = [
        { id: 1, enabled: true },
        { id: 2, enabled: false },
        { id: 3, enabled: true },
      ];
      const determineDisableRow = row => !row.enabled;

      const result = determineEnabledRowCount(rows, determineDisableRow);
      expect(result).toBe(rows.filter(row => row.enabled).length);
    });

    it("should return 0 if there are no rows", () => {
      const rows = [];
      const determineDisableRow = row => !row.enabled;

      const result = determineEnabledRowCount(rows, determineDisableRow);
      expect(result).toBe(rows.length);
    });
  });

  describe("applySearch", () => {
    const testRows = [
      { id: 1, name: "Apple", color: "red" },
      { id: 2, name: "Banana", color: "yellow" },
      { id: 3, name: "Cherry", color: "red" },
    ];

    it("should return all rows when search is empty", () => {
      const result = applySearch(testRows, "", null);
      expect(result).toEqual(testRows);
    });

    it("should filter rows by name when searchBy is not provided", () => {
      const result = applySearch(testRows, "ban", null);
      expect(result).toEqual([{ id: 2, name: "Banana", color: "yellow" }]);
    });

    it("should handle null row.name when searchBy is not provided", () => {
      const rowsWithNullName = [{ id: 1 }, { id: 2, name: "test" }];
      const result = applySearch(rowsWithNullName, "test", null);
      expect(result).toEqual([{ id: 2, name: "test" }]);
    });

    it("should filter rows by specified property when searchBy is a string", () => {
      const result = applySearch(testRows, "red", "color");
      expect(result).toEqual([
        { id: 1, name: "Apple", color: "red" },
        { id: 3, name: "Cherry", color: "red" },
      ]);
    });

    it("should filter rows using searchBy function when provided", () => {
      const searchByFunction = row => `${row.name}-${row.color}`;
      const result = applySearch(testRows, "apple-red", searchByFunction);
      expect(result).toEqual([{ id: 1, name: "Apple", color: "red" }]);
    });

    it("should be case insensitive", () => {
      const result = applySearch(testRows, "APPLE", null);
      expect(result).toEqual([{ id: 1, name: "Apple", color: "red" }]);
    });
  });

  describe("rowIdentifier", () => {
    const rows = [
      { id: 1, employee_name: "John Doe", job_template_id: "123", job_name: "Engineer" },
      { id: 2, employee_name: "Jane Smith", job_template_id: "456", job_name: "Manager" },
      { id: 3, employee_name: "Alice Johnson", job_template_id: "789", job_name: "Supervisor" },
    ];

    describe("when uniqueKey is a string", () => {
      it("should return value of uniqueKey from row if it exists", () => {
        const result = rowIdentifier(rows[1], "job_template_id");
        expect(result).toBe(rows[1].job_template_id);
      });

      it("should return row ID if uniqueKey is not found or passed", () => {
        const result = rowIdentifier(rows[1], "not_existent_key");
        expect(result).toBe(rows[1].id);
      });
    });

    describe("when uniqueKey is an array", () => {
      it("should return composite of two uniqueKeys if Array if passed for uniqueKey", () => {
        const result = rowIdentifier(rows[1], ["id", "job_template_id"]);
        expect(result).toBe(`${rows[1].id}-${rows[1].job_template_id}`);
      });

      it("should return the key if one of the uniqueKey in array does not exist in row", () => {
        const result = rowIdentifier(rows[1], ["id", "not_existent_key"]);
        expect(result).toBe(`${rows[1].id}`);
      });

      it("should return row id if the uniqueKey array is empty", () => {
        const result = rowIdentifier(rows[1], []);
        expect(result).toBe(rows[1].id);
      });
    });
  });
});
