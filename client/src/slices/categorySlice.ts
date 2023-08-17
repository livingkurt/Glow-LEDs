import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/categoryApi";

const categoryPage = createSlice({
  name: "categoryPage",
  initialState: {
    loading: false,
    categorys: [],
    category: {
      name: "",
    },
    remoteVersionRequirement: 0,
    edit_category_modal: false,
    category_modal: false,
    message: "",
    success: false,
    error: {},
  },
  reducers: {
    set_category: (state, { payload }) => {
      const updated_category = payload;
      return {
        ...state,
        category: { ...state.category, ...updated_category },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_category_modal: (state, { payload }) => {
      state.edit_category_modal = payload;
    },
    open_create_category_modal: (state, { payload }) => {
      state.edit_category_modal = true;
      state.category = {
        name: "",
      };
    },
    open_edit_category_modal: (state, { payload }) => {
      state.edit_category_modal = true;
      state.category = payload;
    },
    close_category_modal: (state, { payload }) => {
      state.category_modal = false;
      state.category = {
        name: "",
      };
    },
    open_category_modal: (state, { payload }) => {
      state.category_modal = true;
      state.category = payload;
    },
    setRemoteVersionRequirement: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listCategorys.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.categorys = [];
    },
    [API.listCategorys.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.categorys = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Categorys Found";
    },
    [API.listCategorys.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveCategory.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveCategory.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.edit_category_modal = false;
      state.success = true;
      state.message = "Category Saved";
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveCategory.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsCategory.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsCategory.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.category = payload;
      state.message = "Category Found";
    },
    [API.detailsCategory.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteCategory.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteCategory.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.category = payload.category;
      state.message = "Category Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteCategory.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_category,
  set_edit_category_modal,
  open_create_category_modal,
  open_category_modal,
  close_category_modal,
  open_edit_category_modal,
  setRemoteVersionRequirement,
} = categoryPage.actions;
export default categoryPage.reducer;
