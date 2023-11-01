/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import jwt_decode from "jwt-decode";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";
import { handleTokenRefresh } from "./axiosInstance";
import { loginUpdateCartItems } from "../helpers/userHelpers";

export const getUsers = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/users`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters: JSON.stringify(filters),
      },
    });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const getUserFilters = async () => {
  const { data } = await axios.get(`/api/users/filters`);
  return data;
};

export const listUsers = createAsyncThunk("users/listUsers", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/users?${create_query(query)}`);

    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveUser = createAsyncThunk("users/saveUser", async ({ user, profile }, { dispatch, rejectWithValue }) => {
  try {
    if (!user._id) {
      const { data } = await axios.post("/api/users", user);
      dispatch(showSuccess({ message: `User Created` }));
      return { data, profile };
    } else {
      const { data } = await axios.put(`/api/users/${user._id}`, user);
      dispatch(showSuccess({ message: `User Updated` }));
      if (profile) {
        await handleTokenRefresh(true);
      }
      return { data, profile };
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const detailsUser = createAsyncThunk("users/detailsUser", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    dispatch(showSuccess({ message: `User Found` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveStripeAccount = createAsyncThunk(
  "users/saveStripeAccount",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/payments/stripe_account/${id}`);
      dispatch(showSuccess({ message: `Stripe Account Saved` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/users/${id}`);
    dispatch(showSuccess({ message: `User Deleted` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const registerUser = createAsyncThunk("users/registerUser", async (userData, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/users/register", userData);
    dispatch(showSuccess({ message: `User Registered` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const verifyUser = createAsyncThunk("emails/verifyUser", async ({ token }, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/api/users/verify/${token}`);
    dispatch(showSuccess({ message: `User Account Verified` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
  }
});

export const loginUser = createAsyncThunk("users/loginUser", async (userData, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/users/login", userData);
    const decoded = jwt_decode(data.access_token);
    const userId = decoded._id;

    const userCartResponse = await axios.get(`/api/carts/${userId}/user`);
    let userCart = userCartResponse.data;

    if (!userCart || !userCart.cartItems) {
      const newCartResponse = await axios.post(`/api/carts`, { userId, cartItems: [] });
      userCart = newCartResponse.data;
    }

    const anonymousCartItemsString = localStorage.getItem("cartItems");
    if (anonymousCartItemsString) {
      const anonymousCartItems = JSON.parse(anonymousCartItemsString);
      userCart.cartItems = loginUpdateCartItems(userCart.cartItems, anonymousCartItems);

      await axios.put(`/api/carts/${userId}/user`, { cartItems: userCart.cartItems });
      localStorage.removeItem("cartItems");
    }

    dispatch(showSuccess({ message: `User Logged In` }));
    return data;
  } catch (error) {
    // dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const logoutUser = createAsyncThunk(
  "users/logoutUser",
  async (_args, { dispatch, rejectWithValue, getState }) => {
    const {
      carts: {
        cartPage: { my_cart },
      },
    } = getState();
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await axios.put("/api/users/logout", { refresh_token: refreshToken });
      dispatch(showSuccess({ message: `User Logged Out` }));
      return { my_cart };
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginAsUser = createAsyncThunk("users/loginAsUser", async (userData, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/users/login_as_user", userData);
    dispatch(showSuccess({ message: `Logged in as User` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const generatePasswordResetToken = createAsyncThunk(
  "users/generatePasswordResetToken",
  async ({ email, currentPassword }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/users/generate_password_reset_token", {
        email,
        currentPassword,
      });

      dispatch(showSuccess({ message: `Password Successfully Reset` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async ({ token, password, rePassword }, { dispatch, rejectWithValue, getState }) => {
    const {
      users: {
        userPage: { current_user },
      },
    } = getState();
    try {
      const { data } = await axios.put("/api/users/reset_password", {
        token,
        password,
        rePassword,
      });

      dispatch(showSuccess({ message: `Password Successfully Reset` }));
      return { current_user, data };
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const verifyEmailPasswordReset = createAsyncThunk(
  "users/verifyEmailPasswordReset",
  async ({ email }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/users/verify_email_password_reset", { email });
      dispatch(showSuccess({ message: `Verify Email Sent` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
