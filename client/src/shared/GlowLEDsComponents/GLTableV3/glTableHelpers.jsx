import isEmpty from "lodash/isEmpty";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import Remove from "@mui/icons-material/Remove";
import dayjs from "dayjs";

import { pickBy } from "lodash";

import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const applyFilters = (currentRows, filters, nonTagFilters, externalFilters, customFilters = {}) => {
  if (
    // apply filter if there's at least one element in any of the filter arrays
    Object.values(filters).some(val => val.length > 0)
  ) {
    const filteredRows = currentRows.filter(row =>
      Object.entries(filters).every(([category, selected]) => {
        if (selected.length === 0) return true;
        if (externalFilters?.indexOf(category) === -1 && nonTagFilters.indexOf(category) === -1) return true;
        // Use custom filter if provided
        if (customFilters && customFilters[category]) {
          return customFilters[category](row, selected);
        }

        const rowValueForCategory = row[category];
        const selectedValuesAreObjects = selected.every(s => typeof s === "object");

        if (Array.isArray(rowValueForCategory)) {
          return selected.every(expectedVal => rowValueForCategory.includes(expectedVal));
        } else if (selectedValuesAreObjects) {
          return selected.every(expectedVal => rowValueForCategory === expectedVal.value);
        } else {
          return selected.includes(rowValueForCategory);
        }
      })
    );
    return filterByKeys(filteredRows, filters, nonTagFilters, externalFilters);
  }
  return currentRows;
};

export const filterByKeys = (rows, filters, nonTagFilters, externalFilters) => {
  const activeAssignmentFilters = activeKeys(filters, nonTagFilters, externalFilters);
  if (isEmpty(activeAssignmentFilters)) {
    return rows;
  }

  return rows.filter(row => {
    const tagsUsed = [];
    const nonApplicable = [];

    const tags = row.keys || row.tags;

    if (isEmpty(tags) && !isEmpty(activeAssignmentFilters)) {
      return false;
    } else if (!isEmpty(activeAssignmentFilters)) {
      const rowFilterKeys = tags.map(t => t.key);
      const rowFilterValues = flatten(tags.map(t => t.value));

      activeAssignmentFilters.forEach(filter => {
        const filterKey = filter[0];
        if (rowFilterKeys.indexOf(filterKey) > -1) {
          filter[1].forEach(filterValue => {
            if (rowFilterValues.indexOf(filterValue) > -1) {
              tagsUsed.push(filterValue);
            } else {
              nonApplicable.push(filterValue);
            }
          });
        } else {
          nonApplicable.push(filter);
        }
      });
    }

    return !isEmpty(tagsUsed) && isEmpty(nonApplicable);
  });
};

export const activeKeys = (filters, nonTagFilters, externalFilters = []) => {
  return Object.entries(filters)
    .filter(item => nonTagFilters.indexOf(item[0]) === -1)
    .filter(item => externalFilters?.indexOf(item[0]) === -1)
    .filter(pair => !isEmpty(pair[1]));
};

export const applySearch = (currentRows, search, searchBy) => {
  if (!search) return currentRows;

  return currentRows.filter(row => {
    let searchable = "";
    if (searchBy) {
      searchable = typeof searchBy === "function" ? String(searchBy(row)) : String(row[searchBy]);
    } else {
      searchable = String(row?.name || "");
    }
    return searchable.toLowerCase().includes(search.toLowerCase());
  });
};

const applySort = (currentRows, sorting, columnDefs) => {
  if (sorting.length > 0) {
    return [...currentRows].sort((a, b) => {
      const evaluateRow = row => {
        const sortBy = columnDefs[sorting[0]].sortBy;
        const display = columnDefs[sorting[0]].display;
        // if no sortBy given then sort by "display" field (e.g "title")
        if (sortBy) {
          return sortBy(row);
        } else {
          return (typeof display === "function" ? display(row) : row[display]) || "";
        }
      };

      // this block allows for custom sorting of special characters and places null values at the end of list
      const alphabet = "*!@_.()#^&%$-=+~01234567989abcdefghijklmnopqrstuvwxyz";
      const row_a = typeof evaluateRow(a) === "string" ? evaluateRow(a).toLowerCase() : evaluateRow(a);
      const row_b = typeof evaluateRow(b) === "string" ? evaluateRow(b).toLowerCase() : evaluateRow(b);
      const index_a =
        evaluateRow(a) !== null && evaluateRow(a) !== undefined ? alphabet.indexOf(row_a[0]) : alphabet.length;
      const index_b =
        evaluateRow(b) !== null && evaluateRow(a) !== undefined ? alphabet.indexOf(row_b[0]) : alphabet.length;

      const order = sorting[1] === "asc" ? 1 : -1;

      if (index_a === index_b) {
        if (evaluateRow(a) < evaluateRow(b)) {
          return -order;
        }
        if (evaluateRow(a) > evaluateRow(b)) {
          return order;
        }
        return 0;
      } else {
        return order * (index_a - index_b);
      }
    });
  } else {
    return currentRows;
  }
};

const applyPagination = (currentRows, page, pageSize) => currentRows.slice(page * pageSize, (page + 1) * pageSize);

export const calcVisibleRows = ({
  rows,
  sorting,
  filters,
  page,
  pageSize,
  search,
  searchBy,
  columnDefs,
  nonTagFilters,
  externalFilters,
  noPagination,
  customFilters,
}) => {
  // we need to know filteredRows to display proper count in pagination
  const filteredRows = applyFilters(
    applySearch(rows, search, searchBy),
    filters,
    nonTagFilters,
    externalFilters,
    customFilters
  );

  const visibleColumns = columnDefs;
  const sortedRows = applySort(filteredRows, sorting, visibleColumns);

  if (noPagination) {
    return { filteredRows, visibleRows: sortedRows };
  }
  // visibleRows this is what Table component uses to render rows
  const paginatedRows = applyPagination(sortedRows, page, pageSize);
  return { filteredRows, visibleRows: paginatedRows };
};
export const determineHover = (e, visiblity, name, namespace, rowType) => {
  if (
    e.target.id === `${namespace}-${rowType}-${name}` ||
    e.target.parentNode.id === `${namespace}-${rowType}-${name}` ||
    e.target.classList.contains(`icon-${rowType}-action-svg`) ||
    e.target.tagName === "path" ||
    e.target.tagName === "svg" ||
    e.target.classList.contains(`${namespace}-${rowType}-actions-${name}`)
  ) {
    const actions = document.getElementsByClassName(`${namespace}-${rowType}-actions-${name}`);
    if (actions.length > 0) {
      actions[0].style.visibility = visiblity;
    }
  }
};

export const determineHiddenSelected = (visibleRows, selectedRows) => {
  return selectedRows.length - visibleRows.filter(x => selectedRows.includes(x.id)).length;
};
export const isItemSelected = (name, selectedRows) => selectedRows.indexOf(name) !== -1;
export const isItemExpanded = (name, expandedRows) => expandedRows.indexOf(name) !== -1;

export const handleDataTypes = (item, typedString) => {
  if (typeof item === "string") {
    return item.includes(typedString) || item.toLowerCase().includes(typedString);
  } else if (typeof item === "number") {
    return item === parseInt(typedString, 10);
  } else {
    return false;
  }
};

export const sortItem = item => (typeof item === "string" ? item.toLowerCase() : item);

export const rowCheckboxClicked = target => {
  return target.type === "checkbox" || target.tagName === "INPUT" || target.tagName === "path";
};

export const applyFilter = (menuItems, filterSearch, minFilterLength) => {
  const set = menuItems || [];
  if (filterSearch.length >= minFilterLength) {
    return set.filter(item => handleDataTypes(item, filterSearch));
  } else {
    return set;
  }
};

const covalentTableTranslations = (path, params) => {
  const labelMap = {
    rows_per_page_label: "Rows per page:",
    last_tooltip: "Last",
    next_tooltip: "Next",
    previous_tooltip: "Previous",
    pagination_label: `${params?.int1}-${params?.int2} of ${params?.count}`,
    selected_counter_singular: `${params?.count} selected`,
    selected_counter_plural: `${params?.count} selected`,
    no_content_text: "No content found",
    default_search_placeholder_text: "Search By Name or ID",
    search_by_name_placeholder_text: "Search By Name",
    not_shown_label: `${params?.hiddenSelected} not shown on the current page`,
    close_slider_tooltip: "Close Details Panel",
  };

  if (labelMap[path]) {
    return labelMap[path];
  } else {
    return "";
  }
};

const covalentTableFilterTranslations = (path, params) => {
  const labelMap = {
    filter_by_button: "FILTER BY",
    clear_all_button: "CLEAR ALL",
    selected_label: "Selected",
    clear_button: "CLEAR",
    multiselect_pill: "& %{count} more",
    locations_menu_item: "Locations",
    departments_menu_item: "Departments",
  };

  if (labelMap[path]) {
    return labelMap[path];
  } else {
    return "";
  }
};

const filterTranslations = (path, params) => {
  const labelMap = {
    locations_filter: "Locations",
    departments_filter: "Departments",
    status_filter: "Status",
    title_filter: "Title",
    shift_template_name_filter_key: "shift_template_name",
    shift_template_name_filter: "Shift",
    shift_num_filter: "Shift",
    employment_status_filter: "Employment Status",
    trainee_filter: "trainee",
    locations_filter_key: "locations",
    departments_filter_key: "departments",
    status_filter_key: "status",
    title_filter_key: "title",
    shift_filter_key: "shift",
    shift_num_filter_key: "shift",
    assigned_status_filter: "Assigned Status",
    workstation_name_filter: "Workstation",
    completion_status_filter: "Status",
    supervisor_name_filter: "Supervisor Name",
    archive_status_filter: "Archive Status",
    archived_status_filter_key: "archived_status",
  };

  if (labelMap[path]) {
    return labelMap[path];
  } else {
    return "";
  }
};

export const filterLabelsMap = value => {
  const labelMap = {
    departments: translateFilters("departments_filter"),
    locations: translateFilters("locations_filter"),
    status: translateFilters("status_filter"),
    trainee: translateFilters("trainee_filter"),
    title: translateFilters("title_filter"),
    shift_template_name: translateFilters("shift_template_name_filter"),
    employment_status: translateFilters("employment_status_filter"),
    assigned_status: translateFilters("assigned_status_filter"),
    workstation_name: translateFilters("workstation_name_filter"),
    completion_status: translateFilters("completion_status_filter"),
    supervisor_name: translateFilters("supervisor_name_filter"),
    product_model_name: "Work Order",
    serial_number: "Serial / WO #",
    delivery_date: "Delivery Date",
    job_group_completion_status: "Completion Status",
  };

  if (labelMap[value]) {
    return labelMap[value];
  } else {
    return toTitleCase(value);
  }
};

export const translateGLTable = (path, params) => {
  return covalentTableTranslations(path, params);
};

export const translateGLFilter = (path, params) => {
  return covalentTableFilterTranslations(path, params);
};
export const translateFilters = (path, params) => {
  return filterTranslations(path, params);
};

export const enableClearAll = filters => Object.values(filters).reduce((acc, cur) => acc || cur.length > 0, false);

export const totalPages = (rowsPerPage, count) => (rowsPerPage ? Math.ceil(count / rowsPerPage) : 10);
export const pageItems = (rowsPerPage, count) =>
  Array.from({ length: totalPages(rowsPerPage, count) }, (_, i) => i + 1);

export const getDisplayedRowsInfo = (count, page, rowsPerPage) => {
  const firstRowIndex = page * rowsPerPage + 1;
  const lastRowIndex = Math.min((page + 1) * rowsPerPage, count);
  return translateGLTable("pagination_label", { int1: firstRowIndex, int2: lastRowIndex, count });
};

export const selectedPage = newValue => (newValue === null ? "1" : newValue.toString());

export const rowIdentifier = (row, uniqueKey) => {
  // We can send an array of uniqueKey to create a composite unique key
  // in case a single uniqueKey like employee_id or job_id may be repeated
  // due to the nature of the data presentation in the table
  // (e.g. multiple employees in JobEligibleEmployeesModal table)
  if (Array.isArray(uniqueKey)) {
    return (
      uniqueKey
        .map(key => row[key])
        .filter(Boolean)
        .join("-") || row.id
    );
  } else {
    return row[uniqueKey] || row.id;
  }
};

export const dropdownRowIdentifier = (subRow, dropdownUniqueKey) =>
  typeof subRow === "string" ? subRow : subRow[dropdownUniqueKey] || subRow.id;

export const updateRowExpansions = (state, rowId, uniqueKey) => {
  let updatedExpansions;
  let updatedExpansionObjects;

  if (state.expandedRows.includes(rowId)) {
    updatedExpansions = state.expandedRows.filter(id => id !== rowId);
    updatedExpansionObjects = state.expandedRowObjects.filter(row => rowIdentifier(row, uniqueKey) !== rowId);
  } else {
    updatedExpansions = [...state.expandedRows, rowId];
    const rowObject = state.visibleRows.find(row => rowIdentifier(row, uniqueKey) === rowId);
    updatedExpansionObjects = [...state.expandedRowObjects, rowObject];
  }

  return { expandedRows: updatedExpansions, expandedRowObjects: updatedExpansionObjects };
};

export const updateAllRowExpansions = (state, uniqueKey) => {
  const expandedRowsCount = state.expandedRows.length;
  const visibleRowsCount = state.visibleRows.length;

  if (expandedRowsCount === visibleRowsCount) {
    return { expandedRows: [], expandedRowObjects: [] };
  } else {
    return {
      expandedRows: state.visibleRows.map(row => rowIdentifier(row, uniqueKey)),
      expandedRowObjects: state.visibleRows,
    };
  }
};

export const updateRowSelections = (state, rowId, uniqueKey) => {
  let updatedSelections;
  let updatedSelectionObjects;

  if (state.selectedRows.includes(rowId)) {
    updatedSelections = state.selectedRows.filter(id => id !== rowId);
    updatedSelectionObjects = state.selectedRowObjects.filter(row => rowIdentifier(row, uniqueKey) !== rowId);
  } else {
    updatedSelections = [...state.selectedRows, rowId];
    const rowObject = state.visibleRows.find(row => rowIdentifier(row, uniqueKey) === rowId);
    updatedSelectionObjects = [...state.selectedRowObjects, rowObject];
  }

  return { selectedRows: updatedSelections, selectedRowObjects: updatedSelectionObjects };
};

export const updateAllRowSelections = (state, uniqueKey, determineDisableRow = () => false) => {
  const selectedRowsCount = state.selectedRows.length;
  const visibleEnabledRows = state.visibleRows.filter(row => !determineDisableRow(row));
  const enabledRowCount = visibleEnabledRows.filter(row => !determineDisableRow(row)).length;

  if (selectedRowsCount === enabledRowCount) {
    return { selectedRows: [], selectedRowObjects: [] };
  } else {
    return {
      selectedRows: visibleEnabledRows.map(row => rowIdentifier(row, uniqueKey)),
      selectedRowObjects: visibleEnabledRows,
    };
  }
};

export const updateDropdownRowSelections = (state, dropdownRowId, dropdownUniqueKey, dropdownRowsUniqueKey) => {
  let updatedSelections;
  let updatedSelectionObjects;

  if (state.selectedDropdownRows.includes(dropdownRowId)) {
    updatedSelections = state.selectedDropdownRows.filter(id => id !== dropdownRowId);
    // Filter out the specific sub-row object based on dropdownRowId
    updatedSelectionObjects = state.selectedDropdownRowObjects.filter(
      subRow => rowIdentifier(subRow, dropdownUniqueKey) !== dropdownRowId
    );
  } else {
    updatedSelections = [...state.selectedDropdownRows, dropdownRowId];
    const rowObject = state.visibleRows
      .flatMap(row => row[dropdownRowsUniqueKey])
      .find(subRow => rowIdentifier(subRow, dropdownUniqueKey) === dropdownRowId);
    updatedSelectionObjects = [...state.selectedDropdownRowObjects, rowObject].filter(Boolean); // Filter out any undefined entries
  }

  return { selectedDropdownRows: updatedSelections, selectedDropdownRowObjects: updatedSelectionObjects };
};

export const updateAllDropdownRowSelections = (state, row, dropdownUniqueKey, dropdownRowsUniqueKey) => {
  const dropdownRows = row[dropdownRowsUniqueKey];

  const allSelected = dropdownRows.every(dropdownRow =>
    state.selectedDropdownRows.includes(rowIdentifier(dropdownRow, dropdownUniqueKey))
  );

  let selectedDropdownRows;
  let selectedDropdownRowObjects;

  if (allSelected) {
    selectedDropdownRows = state.selectedDropdownRows.filter(
      id => !dropdownRows.some(dropdownRow => rowIdentifier(dropdownRow, dropdownUniqueKey) === id)
    );
    selectedDropdownRowObjects = state.selectedDropdownRowObjects.filter(
      obj =>
        !dropdownRows.some(
          dropdownRow => rowIdentifier(dropdownRow, dropdownUniqueKey) === rowIdentifier(obj, dropdownUniqueKey)
        )
    );
  } else {
    const uniqueSelections = new Set([
      ...state.selectedDropdownRows,
      ...dropdownRows.map(dropdownRow => rowIdentifier(dropdownRow, dropdownUniqueKey)),
    ]);
    selectedDropdownRows = Array.from(uniqueSelections);
    selectedDropdownRowObjects = [...state.selectedDropdownRowObjects];
    dropdownRows.forEach(dropdownRow => {
      if (!state.selectedDropdownRows.includes(rowIdentifier(dropdownRow, dropdownUniqueKey))) {
        selectedDropdownRowObjects.push(dropdownRow);
      }
    });
  }

  return { selectedDropdownRows, selectedDropdownRowObjects };
};

export const updateFilters = (existingFilters, item) => {
  if (existingFilters?.includes(item)) {
    return existingFilters.filter(fil => {
      return typeof item === "object" ? fil.display !== item.display : fil !== item;
    });
  } else {
    return [...(existingFilters || []), item];
  }
};

export const setFilter = (existingFilters, item) => {
  // If the filter doesn't exist, add it
  if (
    !existingFilters?.some(filter => (typeof item === "object" ? filter.display === item.display : filter === item))
  ) {
    return [...(existingFilters || []), item];
  }
  // If the filter already exists, return the existing filters unchanged
  return existingFilters;
};

export const updateDateRangeFilters = (item, availableFilterOptions) => {
  if (Array.isArray(item)) {
    const [startDate, endDate] = item;
    const filteredOptions = availableFilterOptions.filter(option => {
      const optionDate = new Date(option).toISOString().split("T")[0];
      return optionDate >= startDate && optionDate <= endDate;
    });
    return Array.from(new Set(filteredOptions));
  } else {
    return [];
  }
};

export const updateExternalTableFilters = (state, filterName, item) => {
  return {
    ...state,
    externalFilters: [filterName],
    filters: { [filterName]: [item] },
  };
};

export const createFilters = (rows, filterList, noTranslation = false) => {
  const availableFilters = {};
  filterList.forEach(key => {
    // if noTranslation = true, it will not translate filter key here
    const new_key = noTranslation ? key : translateFilters(`${key}_filter_key`);
    availableFilters[new_key] = uniq(flatten(rows.map(i => i[key]))).filter(Boolean);
  });
  return availableFilters;
};

export const createDisplayValueFilters = (rows, filterList, noTranslation = false, valueMap = {}) => {
  const availableFilters = {};
  filterList.forEach(key => {
    // if noTranslation = true, it will not translate filter key here
    const new_key = noTranslation ? key : translateFilters(`${key}_filter_key`);
    availableFilters[new_key] = uniq(flatten(rows.map(i => i[key])))
      .filter(Boolean)
      .map(value => {
        return {
          display: valueMap[value] || value,
          value,
        };
      });
  });
  return availableFilters;
};

export const determineExpandAllTooltip = (expandedRows, visibleRows) => {
  if (expandedRows.length === visibleRows.length) {
    return "Collapse All Rows";
  }
  return "Expand All Rows";
};

export const determineExpandAllIcon = (expandedRows, visibleRows) => {
  if (expandedRows.length === visibleRows.length) {
    return <KeyboardArrowUp />;
  }
  if (expandedRows.length === 0) {
    return <KeyboardArrowDown />;
  }
  return <Remove />;
};

export const determineRowCount = (remoteCount, filteredRows) => remoteCount || filteredRows.length;

export const determineHasFilters = availableFilters => availableFilters && Object.keys(availableFilters).length > 0;

export const determineShowRowCount = (tableName, rowCount) => (tableName && rowCount ? ` (${rowCount})` : ``);

export const determineEnabledRowCount = (rows, determineDisableRow) => {
  return rows.filter(row => !determineDisableRow(row)).length;
};

export const toTitleCase = s => {
  if (!s) {
    return "";
  }

  return typeof s === "string"
    ? s
        .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
        .replace(/[-_]+(.)/g, (_, c) => ` ${c.toUpperCase()}`) // First char after each -/_
    : s;
};

export const isDateArray = items =>
  Array.isArray(items) && items.every(item => typeof item === "string" && isValidDate(item));

export const determineSubMenuText = item => {
  if (typeof item === "string") {
    return toTitleCase(item);
  } else if (typeof item === "object") {
    return toTitleCase(item.display);
  } else {
    return item;
  }
};

export const determineCheckboxSelection = (item, filters, menuSelection) => {
  if (typeof item === "object") {
    return filters[menuSelection].filter(f => JSON.stringify(f) === JSON.stringify(item)).length > 0;
  } else {
    return filters[menuSelection]?.includes(item);
  }
};

export const menuItemKey = item => {
  if (typeof item === "object") {
    return item.display;
  } else {
    return item;
  }
};

export const chipLabel = chip => {
  const maxLabelLength = 35;
  let label = "";

  if (typeof chip.name === "object") {
    const displayValue = chip.name.display;
    if (containsValidDate(displayValue)) {
      label = displayValue;
    } else {
      label = `${toTitleCase(displayValue)}`;
    }
  } else if (containsValidDate(chip.name)) {
    label = chip.name;
  } else {
    label = `${toTitleCase(chip.name)}`;
  }

  // Truncate label if it exceeds the maximum length
  if (label.length > maxLabelLength) {
    return `${label.substring(0, maxLabelLength)}...`;
  }

  return label;
};

// Helper function to check if a string represents a date or a date range
const containsValidDate = str => {
  // Regular expression to match date formats (YYYY-MM-DD) or date range formats (YYYY-MM-DD - YYYY-MM-DD)
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}(?:\s*-\s*\d{2}\/\d{2}\/\d{4})?$/;
  return dateRegex.test(str);
};

export const isValidDate = date => {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(date);
};

export const getChipName = (filterArray, startDate, endDate) => {
  const filterName = typeof filterArray[0] === "object" ? filterArray[0].display : filterArray[0];

  if (isValidDate(filterName)) {
    if (filterArray.length > 1) {
      const startDateFormatted = dayjs.utc(startDate).format("MM/DD/YYYY");
      const endDateFormatted = dayjs.utc(endDate).format("MM/DD/YYYY");
      return `${startDateFormatted} - ${endDateFormatted}`;
    } else {
      return dayjs.utc(filterName).format("MM/DD/YYYY");
    }
  } else {
    return filterName;
  }
};
export const getBooleanChip = (filterCategory, booleanFilters) => {
  return {
    key: filterCategory,
    name: booleanFilters[filterCategory].label || filterCategory,
  };
};

export const getMultiselectChip = (filterCategory, filterArray, startDate, endDate) => {
  let name = "";
  const filterName = typeof filterArray[0] === "object" ? filterArray[0].display : filterArray[0];

  if (isValidDate(filterName)) {
    const startDateFormatted = dayjs(startDate).format("MM/DD/YYYY");
    const endDateFormatted = dayjs(endDate).format("MM/DD/YYYY");
    name = `${startDateFormatted} - ${endDateFormatted}`;
  } else {
    name = filterName;
    name = `${name} ${translateGLFilter("multiselect_pill", { count: filterArray.length - 1 })}`;
  }

  return {
    key: filterCategory,
    name,
  };
};

export const getSingleChip = (filterCategory, filterArray) => {
  const name = getChipName(filterArray, "", "");
  return {
    key: filterCategory,
    name,
  };
};

export const getChips = (filters, booleanFilters, externalFilters, startDate, endDate) => {
  return Object.entries(pickBy(filters, filterCategory => filterCategory.length > 0))
    .filter(item => externalFilters?.indexOf(item[0]) === -1)
    .map(([filterCategory, filterArray]) => {
      if (Object.keys(booleanFilters).includes(filterCategory)) {
        return getBooleanChip(filterCategory, booleanFilters);
      } else if (filterArray.length > 1) {
        return getMultiselectChip(filterCategory, filterArray, startDate, endDate);
      } else {
        return getSingleChip(filterCategory, filterArray);
      }
    });
};
