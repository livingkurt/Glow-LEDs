/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/userApi";

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
    user: {},
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
    set_user: (state, { payload }) => {
      const updated_user = payload;
      return {
        ...state,
        user: { ...state.user, ...updated_user }
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
    [API.listUsers.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.users = [];
    },
    [API.listUsers.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.users = payload.users;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Users Found";
    },
    [API.listUsers.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createUser.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createUser.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.user = payload.user;
      state.message = "User Saved";
    },
    [API.createUser.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.updateUser.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.updateUser.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.user = payload.user;
      state.message = "User Saved";
    },
    [API.updateUser.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsUser.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsUser.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.user = payload;
      state.message = "User Found";
    },
    [API.detailsUser.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteUser.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteUser.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.user = payload.user;
      state.message = "User Deleted";
    },
    [API.deleteUser.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_user } = userSlice.actions;
export default userSlice.reducer;
