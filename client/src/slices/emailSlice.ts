/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const emailSlice = createSlice({
  name: "emails",
  initialState: {
    loading: false,
    emails: [],
    email: {},
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
    set_email: (state, { payload }) => {
      const updated_email = payload;
      return {
        ...state,
        email: { ...state.email, ...updated_email }
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
    [API.listEmails.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.emails = [];
    },
    [API.listEmails.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.emails = payload.emails;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Emails Found";
    },
    [API.listEmails.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveEmail.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveEmail.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.email = payload.email;
      state.message = "Email Saved";
    },
    [API.saveEmail.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsEmail.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsEmail.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.email = payload;
      state.message = "Email Found";
    },
    [API.detailsEmail.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteEmail.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteEmail.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.email = payload.email;
      state.message = "Email Deleted";
    },
    [API.deleteEmail.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.sendContactEmail.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.sendContactEmail.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.email = payload.email;
      state.message = "Email Deleted";
    },
    [API.sendContactEmail.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_email } = emailSlice.actions;
export default emailSlice.reducer;
