/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import { handleTokenRefresh, setAuthToken, setCurrentUser } from "../api/axiosInstance";
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
    country: "",
  },
  email_subscription: false,
  stripe_connect_id: "",
  weekly_wage: 0,
  isWholesaler: false,
  minimum_order_amount: "",
  guest: false,
  international: false,
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
    user2: {},
    loginModal: false,
    email: "",
    password: "",
    email_validations: "",
    password_validations: "",
    showRegister: "",
    first_name: "",
    last_name: "",
    rePassword: "",
    re_password_validations: "",
    first_name_validations: "",
    last_name_validations: "",
    checkEmail: false,
    registerationSuccess: false,
    verificationSuccess: false,
    verificationLoading: false,
    loginSuccess: false,
    errorMessage: "",
    resendVerificationSucess: false,
    loadingVerification: false,
  },
  reducers: {
    set_user: (state, { payload }) => {
      const updated_user = payload;
      return {
        ...state,
        user: { ...state.user, ...updated_user },
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
    },
    openLoginModal: (state, { payload }) => {
      state.loginModal = true;
    },
    closeLoginModal: (state, { payload }) => {
      state.loginModal = false;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setPassword: (state, { payload }) => {
      state.password = payload;
    },
    setLoginValidations: (state, { payload }) => {
      state.email_validations = payload.email;
      state.password_validations = payload.password;
    },
    setRegisterValidations: (state, { payload }) => {
      state.email_validations = payload.email;
      state.password_validations = payload.password;
      state.re_password_validations = payload.repassword;
      state.first_name_validations = payload.first_name;
      state.last_name_validations = payload.last_name;
    },
    setShowRegister: (state, { payload }) => {
      state.showRegister = payload;
    },
    set_first_name: (state, { payload }) => {
      state.first_name = payload;
    },
    set_last_name: (state, { payload }) => {
      state.last_name = payload;
    },
    setRePassword: (state, { payload }) => {
      state.rePassword = payload;
    },
    setCheckEmail: (state, { payload }) => {
      state.checkEmail = payload;
    },
    setLoginSuccess: (state, { payload }) => {
      state.loginSuccess = payload;
    },
    setResendVerificationSucess: (state, { payload }) => {
      state.resendVerificationSucess = payload;
      state.email_validations = "";
      state.password_validations = "";
    },
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
    [API.listUsers.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveUser.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveUser.fulfilled as any]: (state: any, { payload }: any) => {
      // const { profile } = payload;
      state.loading = false;
      state.message = "User Saved";
      state.loading = false;
      state.remoteVersionRequirement = Date.now();
      state.edit_user_modal = false;
      state.success = true;
      // if (profile) {
      //   const accessToken = await handleTokenRefresh();
      //   setCurrentUser(accessToken);
      //   // window.location.reload();
      // }
    },
    [API.saveUser.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
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
    [API.detailsUser.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteUser.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteUser.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "User Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteUser.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
      state.loading = false;
    },
    [API.passwordReset.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.passwordReset.fulfilled as any]: (state: any, { payload }: any) => {
      const { current_user, data } = payload;

      if (!current_user.isAdmin) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAuthToken(false);
        state.current_user = {};
      }
      state.loading = false;
      state.message = "Password Reset";
      state.success = true;
    },
    [API.passwordReset.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.registerUser.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.registerationSuccess = false;
    },
    [API.registerUser.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "User Registered";
      state.registerationSuccess = true;
      state.loginModal = false;
    },
    [API.registerUser.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.verifyUser.pending as any]: (state: any, { payload }: any) => {
      state.verificationLoading = true;
      state.registerationSuccess = false;
    },
    [API.verifyUser.fulfilled as any]: (state: any, { payload }: any) => {
      state.verificationLoading = false;
      state.message = "User Registered";
      state.verificationSuccess = true;
    },
    [API.verifyUser.rejected as any]: (state: any, { payload, error }: any) => {
      state.verificationLoading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.resendVerification.pending as any]: (state: any, { payload }: any) => {
      state.loadingVerification = true;
    },
    [API.resendVerification.fulfilled as any]: (state: any, { payload }: any) => {
      state.loadingVerification = false;
      state.resendVerificationSucess = true;
    },
    [API.resendVerification.rejected as any]: (state: any, { payload, error }: any) => {
      state.loadingVerification = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
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
      state.loginModal = false;
      state.loginSuccess = true;
    },

    [API.loginUser.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.email_validations = payload.message;
      state.password_validations = payload.message;
      state.message = payload ? payload.message : "An error occurred";
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
    [API.loginAsUser.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.logoutUser.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.logoutUser.fulfilled as any]: (state: any, { payload }: any) => {
      const { my_cart } = payload;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAuthToken(false);
      localStorage.setItem("cartItems", JSON.stringify(my_cart.cartItems));
      state.current_user = {};
      state.loading = false;
    },
    [API.logoutUser.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
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
  open_edit_user_modal,
  openLoginModal,
  closeLoginModal,
  setEmail,
  setPassword,
  setLoginValidations,
  setShowRegister,
  set_first_name,
  set_last_name,
  setRePassword,
  setRegisterValidations,
  setCheckEmail,
  setLoginSuccess,
  setResendVerificationSucess,
} = userPage.actions;
export default userPage.reducer;
