import { createSlice } from "@reduxjs/toolkit";

const tutorialsGridPage = createSlice({
  name: "tutorialsGridPage",
  initialState: {
    selectedCategorys: [],
    selectedLevel: "",
    sort: "",
  },
  reducers: {
    setSelectedCategorys: (state, action) => {
      state.selectedCategorys = action.payload;
    },
    setSelectedLevel: (state, action) => {
      state.selectedLevel = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    updateFilters: (state, action) => {
      const { tags, level, sort } = action.payload;
      state.selectedCategorys = tags;
      state.selectedLevel = level;
      state.sort = sort;
    },
  },
});

export const { setSelectedCategorys, setSelectedLevel, setSort, updateFilters } = tutorialsGridPage.actions;
export default tutorialsGridPage.reducer;
