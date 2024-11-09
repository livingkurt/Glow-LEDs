import { createSlice } from "@reduxjs/toolkit";

const productsGridPage = createSlice({
  name: "productsGridPage",
  initialState: {
    selectedTags: [],
    selectedMicrolight: null,
    category: null,
    sort: null,
    search: "", // Add this line
  },
  reducers: {
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    setSelectedMicrolight: (state, action) => {
      state.selectedMicrolight = action.payload;
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
      const { tags, microlight, category, sort, search } = action.payload;
      state.selectedTags = tags;
      state.selectedMicrolight = microlight;
      state.category = category;
      state.sort = sort;
      state.search = search;
    },
  },
});

export const { setSelectedTags, setSelectedMicrolight, setCategory, setSort, setSearch, updateFilters } =
  productsGridPage.actions;
export default productsGridPage.reducer;
