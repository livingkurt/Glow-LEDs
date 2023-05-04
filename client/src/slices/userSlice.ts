/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import { setAuthToken } from "../api/axiosInstance";
import jwt_decode from "jwt-decode";

const user = {
  first_name: "",
  last_name: "",
  email: "",
  is_affiliated: false,
  is_employee: false,
  affiliate: {},
  isVerified: false,
  isAdmin: false,
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
  isWholesaler: false,
  minimum_order_amount: "",
  guest: false,
  international: false
};

const userPage = createSlice({
  name: "userPage",
  initialState: {
    loading: false,
    users: [],
    user: user,
    remoteVersionRequirement: 0,
    combine_user_modal: false,
    edit_user_modal: false,
    user_modal: false,
    current_user: {},
    message: "",
    success: false,
    error: {},
    user1: {},
    user2: {}
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
    set_current_user: (state, { payload }) => {
      state.current_user = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_user_modal: (state, { payload }) => {
      state.edit_user_modal = payload;
    },
    open_create_user_modal: (state, { payload }) => {
      state.edit_user_modal = true;
      state.user = user;
    },
    open_edit_user_modal: (state, { payload }) => {
      state.edit_user_modal = true;
      state.user = payload;
    },
    open_combine_users_modal: (state, { payload }) => {
      const { user1, user2 } = payload;
      state.combine_user_modal = true;
      state.user1 = user1;
      state.user2 = user2;
    },
    close_modals: (state, { payload }) => {
      state.combine_user_modal = false;
      state.edit_user_modal = false;
    }
  },
  extraReducers: {
    [API.listUsers.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.users = [];
    },
    [API.listUsers.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.users = payload.data;
      state.totalPages = payload.total_count;
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
      const { profile } = payload;
      state.loading = false;
      state.message = "User Saved";
      state.loading = false;
      state.remoteVersionRequirement = Date.now();
      state.edit_user_modal = false;
      state.success = true;
      if (profile) {
        window.location.reload();
      }
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
      localStorage.setItem("refreshToken", refresh_token); // Store the refresh token
      setAuthToken(access_token);
      const decoded = jwt_decode(access_token);
      state.loading = false;
      state.current_user = decoded;
      state.message = "User Login Success";
      state.success = true;
    },

    [API.loginUser.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.loginAsUser.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.loginAsUser.fulfilled as any]: (state: any, { payload }: any) => {
      const { access_token, refresh_token } = payload;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token); // Store the refresh token
      setAuthToken(access_token);
      const decoded = jwt_decode(access_token);
      state.access_token = access_token;
      state.loading = false;
      state.current_user = decoded;
      state.message = "User Login Success";
      state.success = true;
    },
    [API.loginAsUser.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.logoutUser.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.logoutUser.fulfilled as any]: (state: any, { payload }: any) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAuthToken(false);
      state.current_user = {};
    },
    [API.logoutUser.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const {
  set_loading,
  set_user,
  set_current_user,
  set_success,
  set_edit_user_modal,
  open_create_user_modal,
  open_combine_users_modal,
  close_modals,
  open_edit_user_modal
} = userPage.actions;
export default userPage.reducer;
