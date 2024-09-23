import { createSlice } from "@reduxjs/toolkit";

const tutorialsGridPage = createSlice({
  name: "tutorialsGridPage",
  initialState: {
    selectedTags: [],
    selectedLevel: "",
    sort: "",
    selectedGlover: null,
    selectedTutorial: null,
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
    setSelectedTutorial: (state, action) => {
      state.selectedTutorial = action.payload;
    },
  },
});

export const { setSelectedTags, setSelectedLevel, setSort, updateFilters, setSelectedGlover, setSelectedTutorial } =
  tutorialsGridPage.actions;
export default tutorialsGridPage.reducer;
