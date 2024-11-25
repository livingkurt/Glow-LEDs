const tableState = {
  tableName: '',
  namespace: '',
  rows: [],
  selectedRows: [],
  selectedRowObjects: [],
  selectedDropdownRows: [],
  selectedDropdownRowObjects: [],
  expandedRows: [],
  expandedRowObjects: [],
  nonTagFilters: ['departments', 'locations'],
  externalFilters: [],
  searchBy: 'name',
  sorting: [0, 'asc'],
  dropdownColumnDefs: [{}],
  availableFilters: {},
  filters: {},
  filteredRows: [],
  visibleRows: [],
  page: 0,
  pageSize: 10,
  search: '',
  expandRow: '',
  menuOpen: false,
  menuSelection: null,
  filterSearch: '',
  startDate: '',
  endDate: '',
  dateRange: '',
  // Describes Remote fetching state of the table if remote is enabled
  remote: {
    isRemote: false,
    remotePageLoadingState: {}, // Maps query ID => state (true/false - loaded/loading)
    isRemoteLoading: false, // Describes if there is still page loading in progress based on remotePageLoadingState
    lastRemoteFetchedPageId: 0,
    isLoadingFilters: false,
    remoteCount: null,
    // time when we last fetched a page from a remote, if a prop
    // is passed requesting a newer version we would need to issue a re-fetch
    latestRemoteVersionTimestamp: 0,
  },
  loading: false,
  columnDefs: [],
  booleanFilters: {},
  urlParams: null,
  slider: {
    isOpen: false,
    row: {},
    uniqueKey: null,
  },
};

export default {
  ...tableState,
};
