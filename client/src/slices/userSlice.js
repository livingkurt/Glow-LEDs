/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../api/axiosInstance";
import jwt_decode from "jwt-decode";

import * as API from "../api";

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
    current_password_validations: "",
    showRegister: "",
    first_name: "",
    last_name: "",
    rePassword: "",
    re_password_validations: "",
    first_name_validations: "",
    last_name_validations: "",
    checkEmail: false,
    registrationSuccess: false,
    verificationSuccess: false,
    verificationLoading: false,
    loginSuccess: false,
    errorMessage: "",
    resendVerificationSucess: false,
    loadingVerification: false,
    loadingPasswordReset: false,
    showForgotPassword: false,
    loadingResetPassword: false,
    changePasswordModal: false,
    changePassword: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
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
      state.showRegister = payload?.register;
      state.token = payload?.token;
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
    setShowForgotPassword: (state, { payload }) => {
      state.showForgotPassword = payload;
    },
    setChangePassword: (state, { payload }) => {
      const passwords = payload;
      return {
        ...state,
        changePassword: { ...state.changePassword, ...passwords },
      };
    },
    openChangePasswordModal: (state, { payload }) => {
      state.changePasswordModal = true;
    },
    closeChangePasswordModal: (state, { payload }) => {
      state.changePasswordModal = false;
    },
    setChangeValidations: (state, { payload }) => {
      state.current_password_validations = payload.currentPassword;
      state.password_validations = payload.password;
      state.re_password_validations = payload.rePassword;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(API.listUsers.pending, state => {
        state.loading = true;
        state.users = [];
      })
      .addCase(API.listUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
        state.message = "Users Found";
      })
      .addCase(API.listUsers.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload ? payload.error : error.message;
        state.message = payload ? payload.message : "An error occurred";
      })
      .addCase(API.saveUser.pending, state => {
        state.loading = true;
      })
      .addCase(API.saveUser.fulfilled, state => {
        state.loading = false;
        state.message = "User Saved";
        state.remoteVersionRequirement = Date.now();
        state.edit_user_modal = false;
        state.success = true;
      })
      .addCase(API.saveUser.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload ? payload.error : error.message;
        state.message = payload ? payload.message : "An error occurred";
      })
      .addCase(API.detailsUser.pending, state => {
        state.loading = true;
      })
      .addCase(API.detailsUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.message = "User Found";
      })
      .addCase(API.detailsUser.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload ? payload.error : error.message;
        state.message = payload ? payload.message : "An error occurred";
      })
      .addCase(API.deleteUser.pending, state => {
        state.loading = true;
      })
      .addCase(API.deleteUser.fulfilled, state => {
        state.loading = false;
        state.message = "User Deleted";
        state.remoteVersionRequirement = Date.now();
      })
      .addCase(API.deleteUser.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload ? payload.error : error.message;
        state.message = payload ? payload.message : "An error occurred";
      })
      .addCase(API.resetPassword.pending, state => {
        state.loadingResetPassword = true;
      })
      .addCase(API.resetPassword.fulfilled, (state, { payload }) => {
        const { current_user } = payload;
        if (!current_user.isAdmin) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setAuthToken(false);
          state.current_user = {};
        }
        state.loadingResetPassword = false;
        state.message = "Password Reset";
        state.success = true;
      })
      .addCase(API.resetPassword.rejected, (state, { payload, error }) => {
        state.loadingResetPassword = false;
        state.error = payload ? payload.error : error.message;
        state.message = payload ? payload.message : "An error occurred";
      })
      .addCase(API.registerUser.pending, state => {
        state.loading = true;
        state.registrationSuccess = false;
      })
      .addCase(API.registerUser.fulfilled, state => {
        state.loading = false;
        state.message = "User Registered";
        state.registrationSuccess = true;
      })
      .addCase(API.registerUser.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload ? payload.error : error.message;
        state.message = payload ? payload.message : "An error occurred";
      })
      .addCase(API.verifyUser.pending, state => {
        state.verificationLoading = true;
        state.registrationSuccess = false;
      })
      .addCase(API.verifyUser.fulfilled, state => {
        state.verificationLoading = false;
        state.message = "User Verified";
        state.verificationSuccess = true;
      })
      .addCase(API.verifyUser.rejected, (state, { payload, error }) => {
        state.verificationLoading = false;
        state.error = payload ? payload.error : error.message;
        state.message = payload ? payload.message : "An error occurred";
      })
      .addCase(API.resendVerification.pending, state => {
        state.loadingVerification = true;
      })
      .addCase(API.resendVerification.fulfilled, state => {
        state.loadingVerification = false;
        state.resendVerificationSucess = true;
      })
      .addCase(API.resendVerification.rejected, (state, { payload, error }) => {
        state.loadingVerification = false;
        state.error = payload ? payload.error : error.message;
        state.message = payload ? payload.message : "An error occurred";
      })
      .addCase(API.loginUser.pending, state => {
        state.loading = true;
      })
      .addCase(API.loginUser.fulfilled, (state, { payload }) => {
        const { access_token, refresh_token } = payload;
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);
        setAuthToken(access_token);
        const decoded = jwt_decode(access_token);
        state.loading = false;
        state.current_user = decoded;
        state.message = "User Login Success";
        state.loginModal = false;
        state.loginSuccess = true;
      })
      .addCase(API.loginUser.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload ? payload.error : error.message;
        state.email_validations = payload.message;
        state.password_validations = payload.message;
        state.message = payload ? payload.message : "An error occurred";
      })
      .addCase(API.logoutUser.pending, state => {
        state.loading = true;
      })
      .addCase(API.logoutUser.fulfilled, (state, { payload }) => {
        const { my_cart } = payload;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAuthToken(false);
        localStorage.setItem("cartItems", JSON.stringify(my_cart.cartItems));
        state.current_user = {};
        state.loading = false;
      })
      .addCase(API.logoutUser.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload ? payload.error : error.message;
        state.message = payload ? payload.message : "An error occurred";
      });
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
  setShowForgotPassword,
  setChangePassword,
  openChangePasswordModal,
  closeChangePasswordModal,
  setChangeValidations,
} = userPage.actions;
export default userPage.reducer;
