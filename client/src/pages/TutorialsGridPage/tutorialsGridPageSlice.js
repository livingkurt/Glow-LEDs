import { createSlice } from "@reduxjs/toolkit";

const tutorialsGridPage = createSlice({
  name: "tutorialsGridPage",
  initialState: {
    selectedTags: [],
    selectedLevel: "",
    sort: "",
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
    updateFilters: (state, action) => {
      const { tags, level, sort } = action.payload;
      state.selectedTags = tags;
      state.selectedLevel = level;
      state.sort = sort;
    },
  },
});

export const { setSelectedTags, setSelectedLevel, setSort, updateFilters } = tutorialsGridPage.actions;
export default tutorialsGridPage.reducer;
