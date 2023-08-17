/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const contentPage = createSlice({
  name: "contentPage",
  initialState: {
    loading: false,
    contents: [],
    content: {},
    message: "",
    error: {},
    search: "",
    sort: "",
    page: 1,
    limit: 10,
  },
  reducers: {
    set_content: (state, { payload }) => {
      const updated_content = payload;
      return {
        ...state,
        content: { ...state.content, ...updated_content },
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
    },
  },
  extraReducers: {
    [API.listContents.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.contents = [];
    },
    [API.listContents.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.contents = payload.contents;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Contents Found";
    },
    [API.listContents.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveContent.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveContent.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Content Saved";
    },
    [API.saveContent.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsContent.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsContent.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.content = payload;
      state.message = "Content Found";
    },
    [API.detailsContent.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteContent.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteContent.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.content = payload.content;
      state.message = "Content Deleted";
    },
    [API.deleteContent.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_content } = contentPage.actions;
export default contentPage.reducer;
