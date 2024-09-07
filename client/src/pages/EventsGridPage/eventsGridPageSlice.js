import { createSlice } from "@reduxjs/toolkit";

const eventsGridPage = createSlice({
  name: "eventsGridPage",
  initialState: {
    selectedTags: [],
    selectedChip: null,
    category: null,
    sort: null,
    search: "", // Add this line
  },
  reducers: {
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    setSelectedChip: (state, action) => {
      state.selectedChip = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSearch: (state, action) => {
      // Add this reducer
      state.search = action.payload;
    },
    updateFilters: (state, action) => {
      const { tags, chip, category, sort, search } = action.payload;
      state.selectedTags = tags;
      state.selectedChip = chip;
      state.category = category;
      state.sort = sort;
      state.search = search;
    },
  },
});

export const { setSelectedTags, setSelectedChip, setCategory, setSort, setSearch, updateFilters } =
  eventsGridPage.actions;
export default eventsGridPage.reducer;
