const defaultState = {
  tableName: "",
  namespace: "",
  rows: [],
  selectedRows: [],
  nonTagFilters: ["departments", "locations"],
  searchBy: (row, search) => {
    const searchableText = row.name;
    return searchableText.toLowerCase().includes(search.toLowerCase());
  },
  sorting: [0, "asc"],
  dropdownColumnDefs: [{}],
  availableFilters: {},
  filters: {},
  filteredRows: [],
  visibleRows: [],
  page: 0,
  pageSize: 10,
  search: "",
  enableRowSelect: true,
  enableDropdownRow: false,
  expandRow: "",
  enableSearch: true,
  menuOpen: false,
  menuSelection: null,
  enableRowClick: false,
  filterSearch: "",
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
    latestRemoteVersionTimestamp: 0
  }
};

export default defaultState;
