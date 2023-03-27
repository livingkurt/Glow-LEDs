/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

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
    [API.listCategorys.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.categorys = [];
    },
    [API.listCategorys.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.categorys = payload.categorys;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Categorys Found";
    },
    [API.listCategorys.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveCategory.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveCategory.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Category Saved";
    },
    [API.saveCategory.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsCategory.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsCategory.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.category = payload;
      state.message = "Category Found";
    },
    [API.detailsCategory.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteCategory.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteCategory.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.category = payload.category;
      state.message = "Category Deleted";
    },
    [API.deleteCategory.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_category } = categorySlice.actions;
export default categorySlice.reducer;
