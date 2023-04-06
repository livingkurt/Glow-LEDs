/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    access_token: "",
    users: [],
    user: {
      first_name: "",
      last_name: "",
      email: "",
      is_affiliated: false,
      is_employee: false,
      affiliate: {},
      isVerified: false,
      is_admin: false,
      shipping: {
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postalCode: "",
        international: false,
        country: ""
      },
      email_subscription: false,
      stripe_connect_id: "",
      weekly_wage: 0,
      wholesaler: false,
      minimum_order_amount: "",
      guest: false,
      international: false
    },
    remoteVersionRequirement: 0,
    edit_user_modal: false,
    user_modal: false,
    current_user: {},
    message: "",
    success: false,
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
      console.log({ updated_user });
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
    },
    set_current_user: (state, { payload }) => {
      state.current_user = payload;
    },
    logout_user: (state, { payload }) => {
      localStorage.removeItem("accessToken");
      setAuthToken(false);
      return {
        ...state,
        current_user: {}
      };
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_user_modal: (state, { payload }) => {
      state.edit_user_modal = payload;
    },
    open_create_user_modal: (state, { payload }) => {
      state.edit_user_modal = true;
      state.user = {
        first_name: "",
        last_name: "",
        email: "",
        is_affiliated: false,
        is_employee: false,
        affiliate: {},
        isVerified: false,
        is_admin: false,
        shipping: {
          first_name: "",
          last_name: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          postalCode: "",
          international: false,
          country: ""
        },
        email_subscription: false,
        stripe_connect_id: "",
        weekly_wage: 0,
        wholesaler: false,
        minimum_order_amount: "",
        guest: false,
        international: false
      };
    },
    open_edit_user_modal: (state, { payload }) => {
      state.edit_user_modal = true;
      state.user = payload;
    },
    close_user_modal: (state, { payload }) => {
      state.user_modal = false;
      state.user = {
        first_name: "",
        last_name: "",
        email: "",
        is_affiliated: false,
        is_employee: false,
        affiliate: {},
        isVerified: false,
        is_admin: false,
        shipping: {
          first_name: "",
          last_name: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          postalCode: "",
          international: false,
          country: ""
        },
        email_subscription: false,
        stripe_connect_id: "",
        weekly_wage: 0,
        wholesaler: false,
        minimum_order_amount: "",
        guest: false,
        international: false
      };
    },
    open_user_modal: (state, { payload }) => {
      state.user_modal = true;
      state.user = payload;
    }
  },
  extraReducers: {
    [API.listUsers.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.users = [];
    },
    [API.listUsers.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.users = payload.users;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Users Found";
      state.loading = false;
    },
    [API.listUsers.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveUser.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveUser.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "User Saved";
      state.loading = false;
      state.remoteVersionRequirement = Date.now();
      state.edit_user_modal = false;
    },
    [API.saveUser.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsUser.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsUser.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.user = payload;
      state.message = "User Found";
      state.loading = false;
    },
    [API.detailsUser.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteUser.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteUser.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "User Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteUser.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
      state.loading = false;
    },
    [API.passwordReset.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.passwordReset.fulfilled as any]: (state: any, { payload }: any) => {
      state.access_token = "";
      state.current_user = payload;
      state.loading = false;
      state.message = "Password Reset";
      state.success = true;
    },
    [API.passwordReset.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.registerUser.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.registerUser.fulfilled as any]: (state: any, { payload }: any) => {
      state.access_token = "";
      // state.current_user = payload;
      state.loading = false;
      state.message = "User Registered";
      state.success = true;
    },
    [API.registerUser.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.loginUser.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.loginUser.fulfilled as any]: (state: any, { payload }: any) => {
      const { access_token, refresh_token } = payload;
      localStorage.setItem("accessToken", access_token);
      setAuthToken(access_token);
      const decoded = jwt_decode(access_token);
      state.access_token = access_token;
      state.loading = false;
      state.current_user = decoded;
      state.message = "User Login Success";
      state.success = true;
    },
    [API.loginUser.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const {
  set_search,
  set_sort,
  set_page,
  set_limit,
  set_loading,
  set_user,
  set_current_user,
  logout_user,
  set_success,
  set_edit_user_modal,
  open_create_user_modal,
  open_user_modal,
  close_user_modal,
  open_edit_user_modal
} = userSlice.actions;
export default userSlice.reducer;
