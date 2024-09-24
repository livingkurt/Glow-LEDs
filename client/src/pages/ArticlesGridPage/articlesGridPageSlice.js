import { createSlice } from "@reduxjs/toolkit";

const articlesGridPage = createSlice({
  name: "articlesGridPage",
  initialState: {
    selectedTags: [],
    sort: "",
    selectedAuthor: null,
    selectedArticle: null,
  },
  reducers: {
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSelectedAuthor: (state, action) => {
      state.selectedAuthor = action.payload;
    },
    updateFilters: (state, action) => {
      const { tags, sort, author } = action.payload;
      state.selectedTags = tags;
      state.sort = sort;
      state.selectedAuthor = author;
    },
    setSelectedArticle: (state, action) => {
      state.selectedArticle = action.payload;
    },
  },
});

export const { setSelectedTags, setSort, updateFilters, setSelectedAuthor, setSelectedArticle } =
  articlesGridPage.actions;
export default articlesGridPage.reducer;
