/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/categoryApi";

const categorySlice = createSlice({
  name: "categorys",
  initialState: {
    loading: false,
    categorys: [],
    category: {},
    message: "",
    error: {},
    search: "",
    sort: "",
    page: 1,
    limit: 10,
    sort_options: ["Newest", "Artist Name", "Facebook Name", "Instagram Handle", "Sponsor", "Promoter"],
    colors: [
      { name: "Sponsor", color: "#3e4c6d" },
      { name: "Promoter", color: "#7d5555" },
      { name: "Team", color: "#557d6c" },
      { name: "Not Active", color: "#757575" },
      { name: "Rave Mob", color: "#55797d" }
    ]
  },
  reducers: {
    set_category: (state, { payload }) => {
      const updated_category = payload;
      return {
        ...state,
        category: { ...state.category, ...updated_category }
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_search: (state, { payload }) => {
      state.search = payload;
    },
    set_sort: (state, { payload }) => {
      state.sort = payload;
    },
    set_page: (state, { payload }) => {
      state.page = payload;
    },
    set_limit: (state, { payload }) => {
      state.limit = payload;
    }
  },
  extraReducers: {
    [API.listCategorys.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.categorys = [];
    },
    [API.listCategorys.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.categorys = payload.categorys;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Categorys Found";
    },
    [API.listCategorys.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createCategory.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createCategory.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.category = payload.category;
      state.message = "Category Saved";
    },
    [API.createCategory.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.updateCategory.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.updateCategory.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.category = payload.category;
      state.message = "Category Saved";
    },
    [API.updateCategory.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsCategory.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsCategory.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.category = payload;
      state.message = "Category Found";
    },
    [API.detailsCategory.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteCategory.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteCategory.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.category = payload.category;
      state.message = "Category Deleted";
    },
    [API.deleteCategory.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_category } = categorySlice.actions;
export default categorySlice.reducer;
