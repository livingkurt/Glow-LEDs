/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import jwt_decode from "jwt-decode";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";
import { handleTokenRefresh, setCurrentUser } from "./axiosInstance";
import { loginUpdateCartItems, updateCartItems } from "../helpers/userHelpers";

export const getUsers = async ({
  search,
  sorting,
  filters,
  page,
  pageSize,
}: {
  search: string;
  sorting: any;
  filters: any;
  page: number;
  pageSize: number;
}) => {
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
  } catch (error: any) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const getUserFilters = async () => {
  const { data } = await axios.get(`/api/users/filters`);
  return data;
};

export const listUsers = createAsyncThunk("users/listUsers", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/users?${create_query(query)}`);

    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveUser = createAsyncThunk("users/saveUser", async ({ user, profile }: any, thunkApi: any) => {
  try {
    if (!user._id) {
      const { data } = await axios.post("/api/users", user);
      thunkApi.dispatch(showSuccess({ message: `User Created` }));
      return { data, profile };
    } else {
      const { data } = await axios.put(`/api/users/${user._id}`, user);
      thunkApi.dispatch(showSuccess({ message: `User Updated` }));
      if (profile) {
        await handleTokenRefresh(true);
      }
      return { data, profile };
    }
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsUser = createAsyncThunk("users/detailsUser", async (id: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    thunkApi.dispatch(showSuccess({ message: `User Found` }));
    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.delete(`/api/users/${id}`);
    thunkApi.dispatch(showSuccess({ message: `User Deleted` }));
    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const registerUser = createAsyncThunk("users/registerUser", async (userData: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/register", userData);
    // axios.post("/api/emails/account_created", data);
    // axios.post("/api/emails/verify", data);
    thunkApi.dispatch(showSuccess({ message: `User Registered` }));
    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const verifyUser = createAsyncThunk("emails/verifyUser", async ({ token }: any, thunkApi: any) => {
  try {
    const { data } = await axios.post(`/api/users/verify/${token}`);
    thunkApi.dispatch(showSuccess({ message: `User Account Verified` }));
    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
  }
});

export const loginUser = createAsyncThunk("users/loginUser", async (userData: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/login", userData);
    const decoded: any = jwt_decode(data.access_token);
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

    thunkApi.dispatch(showSuccess({ message: `User Logged In` }));
    return data;
  } catch (error: any) {
    // thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const logoutUser = createAsyncThunk("users/logoutUser", async (refresh_token: any, thunkApi: any) => {
  const {
    carts: {
      cartPage: { my_cart },
    },
  } = thunkApi.getState();
  try {
    await axios.put("/api/users/logout", { refresh_token });
    thunkApi.dispatch(showSuccess({ message: `User Logged Out` }));
    return { my_cart };
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
export const refreshLogin = async (refresh_token: any, thunkApi: any) => {
  try {
    return await axios.put("/api/users/refresh_login", { refresh_token });
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const loginAsUser = createAsyncThunk("users/loginAsUser", async (userData: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/login_as_user", userData);
    thunkApi.dispatch(showSuccess({ message: `Logged in as User` }));
    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async ({ token, password, rePassword }: { token: string; password: string; rePassword: string }, thunkApi: any) => {
    const {
      users: {
        userPage: { current_user },
      },
    } = thunkApi.getState();
    try {
      const { data } = await axios.put("/api/users/reset_password", {
        token,
        password,
        rePassword,
      });

      thunkApi.dispatch(showSuccess({ message: `Password Successfully Reset` }));
      return { current_user, data };
    } catch (error: any) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
    }
  }
);

export const verifyEmailPasswordReset = createAsyncThunk(
  "users/verifyEmailPasswordReset",
  async ({ email }: any, thunkApi: any) => {
    try {
      const { data } = await axios.post("/api/users/verify_email_password_reset", { email });
      thunkApi.dispatch(showSuccess({ message: `Verify Email Sent` }));
      return data;
    } catch (error: any) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
