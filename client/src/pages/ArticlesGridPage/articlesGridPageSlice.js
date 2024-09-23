import { createSlice } from "@reduxjs/toolkit";

const articlesGridPage = createSlice({
  name: "articlesGridPage",
  initialState: {
    selectedTags: [],
    selectedLevel: "",
    sort: "",
    selectedGlover: null,
    selectedArticle: null,
  },
  reducers: {
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    setSelectedLevel: (state, action) => {
      state.selectedLevel = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSelectedGlover: (state, action) => {
      state.selectedGlover = action.payload;
    },
    updateFilters: (state, action) => {
      const { tags, level, sort } = action.payload;
      state.selectedTags = tags;
      state.selectedLevel = level;
      state.sort = sort;
    },
    setSelectedArticle: (state, action) => {
      state.selectedArticle = action.payload;
    },
  },
});

export const { setSelectedTags, setSelectedLevel, setSort, updateFilters, setSelectedGlover, setSelectedArticle } =
  articlesGridPage.actions;
export default articlesGridPage.reducer;
