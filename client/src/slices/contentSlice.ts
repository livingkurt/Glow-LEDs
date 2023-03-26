/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const contentSlice = createSlice({
  name: "contents",
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
    set_content: (state, { payload }) => {
      const updated_content = payload;
      return {
        ...state,
        content: { ...state.content, ...updated_content }
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
    [API.listContents.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveContent.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveContent.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Content Saved";
    },
    [API.saveContent.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsContent.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsContent.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.content = payload;
      state.message = "Content Found";
    },
    [API.detailsContent.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteContent.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteContent.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.content = payload.content;
      state.message = "Content Deleted";
    },
    [API.deleteContent.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_content } = contentSlice.actions;
export default contentSlice.reducer;
