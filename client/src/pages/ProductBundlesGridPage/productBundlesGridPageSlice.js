import { createSlice } from "@reduxjs/toolkit";

const productBundlesGridPage = createSlice({
  name: "productBundlesGridPage",
  initialState: {
    selectedTags: [],
    selectedAffiliate: null,
    sort: null,
  },
  reducers: {
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    setSelectedAffiliate: (state, action) => {
      state.selectedAffiliate = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    updateFilters: (state, action) => {
      const { tags, affiliate, sort } = action.payload;
      state.selectedTags = tags;
      state.selectedAffiliate = affiliate;
      state.sort = sort;
    },
  },
});

export const { setSelectedTags, setSelectedAffiliate, setSort, updateFilters } = productBundlesGridPage.actions;
export default productBundlesGridPage.reducer;
