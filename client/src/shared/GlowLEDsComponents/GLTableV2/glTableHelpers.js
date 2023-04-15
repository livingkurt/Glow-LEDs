import isEmpty from "lodash/isEmpty";

const applyFilters = (currentRows, filters, nonTagFilters) => {
  if (
    // apply filter if there's at least one element in any of the filter arrays
    Object.values(filters).some(val => val.length > 0)
  ) {
    const filteredRows = currentRows.filter(row =>
      Object.entries(filters).every(([category, selected]) => {
        // skip filter category if there are none selected
        if (selected.length === 0) return true;
        if (nonTagFilters.indexOf(category) === -1) return true;

        const rowValueForCategory = row[category];
        if (Array.isArray(rowValueForCategory)) {
          return selected.every(expectedVal => rowValueForCategory.includes(expectedVal));
        } else {
          return selected.includes(rowValueForCategory);
        }
      })
    );
    return filterByKeys(filteredRows, filters, nonTagFilters);
  }

  return currentRows;
};

export const filterByKeys = (rows, filters, nonTagFilters) => {
  const activeAssignmentFilters = activeKeys(filters, nonTagFilters);
  if (isEmpty(activeAssignmentFilters)) {
    return rows;
  }

  return rows.filter(row => {
    const tagsUsed = [];
    const nonApplicable = [];

    if (isEmpty(row.keys) && !isEmpty(activeAssignmentFilters)) {
      return false;
    } else if (!isEmpty(activeAssignmentFilters)) {
      const rowFilterKeys = row.keys.map(key => key.context);
      const rowFilterValues = row.keys.map(key => key.tag.name);

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

export const activeKeys = (assignmentFilters, nonTagFilters) =>
  Object.entries(assignmentFilters)
    .filter(item => nonTagFilters.indexOf(item[0]) === -1)
    .filter(pair => !isEmpty(pair[1]));

const applySearch = (currentRows, search, searchBy) => currentRows.filter(row => searchBy(row, search));

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
      const index_a = evaluateRow(a) !== null && evaluateRow(a) !== undefined ? alphabet.indexOf(row_a[0]) : alphabet.length;
      const index_b = evaluateRow(b) !== null && evaluateRow(a) !== undefined ? alphabet.indexOf(row_b[0]) : alphabet.length;

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

export const calcVisibleRows = ({ rows, sorting, filters, page, pageSize, search, searchBy, columnDefs, nonTagFilters }) => {
  // we need to know filteredRows to display proper count in pagination
  const filteredRows = applyFilters(applySearch(rows, search, searchBy), filters, nonTagFilters);
  // visibleRows this is what Table component uses to render rows
  const visibleRows = applyPagination(applySort(filteredRows, sorting, columnDefs), page, pageSize);
  return { filteredRows, visibleRows };
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

export const visibleSelected = (visibleRows, selectedRows) => visibleRows.filter(x => selectedRows.includes(x.id)).length;
export const isItemSelected = (name, selectedRows) => selectedRows.indexOf(name) !== -1;

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

export const filterLabelsMap = {
  departments: "departments",
  locations: "locations"
};

export const enableClearAll = filters => Object.values(filters).reduce((acc, cur) => acc || cur.length > 0, false);

export const pipe =
  (...fns) =>
  x =>
    fns.reduce((v, f) => f(v), x);

export const tableColors = {
  inactive: "#6d3e3e",
  active: "#3e4c6d",
  waiting: "#636363",
  completed: "#333333",
  paused: "#33323e",
  alt_color_1: "#4b7188",
  alt_color_2: "#6f5f7d",
  alt_color_3: "#874d72",
  alt_color_4: "#31887c",
  alt_color_5: "#a9a9a9"
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const parseQueryParams = search => {
  const params = {};

  if (!search) return params;

  search
    .substring(1) // Remove the '?' at the start
    .split("&")
    .forEach(param => {
      const [key, value] = param.split("=");
      params[key] = decodeURIComponent(value);
    });

  return params;
};

export const updateTableStateFromUrl = ({ location, search, filters, page, pageSize, sorting }) => {
  const queryParams = parseQueryParams(location.search);

  return {
    param_search: queryParams.search || search,
    param_filters: queryParams.filters ? JSON.parse(queryParams.filters) : filters,
    param_page: queryParams.page ? parseInt(queryParams.page, 10) : page,
    param_pageSize: queryParams.pageSize ? parseInt(queryParams.pageSize, 10) : pageSize,
    param_sorting: queryParams.sorting ? JSON.parse(queryParams.sorting) : sorting
  };
};

export const updateUrlWithTableState = ({ location, history, search, filters, page, pageSize, sorting }) => {
  const queryParams = new URLSearchParams({
    search,
    filters: JSON.stringify(filters),
    page,
    pageSize,
    sorting: JSON.stringify(sorting)
  });

  history.push({
    pathname: location.pathname,
    search: `?${queryParams.toString()}`
  });
};
