/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { create_query } from "../utils/helper_functions";
import { handleTokenRefresh, setCurrentUser } from "./axiosInstance";

export const getUsers = async ({
  search,
  sorting,
  filters,
  page,
  pageSize
}: {
  search: string;
  sorting: any;
  filters: any;
  page: number;
  pageSize: number;
}) => {
  try {
    return axios.get(`/api/users`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters
      }
    });
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
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
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const saveUser = createAsyncThunk("users/saveUser", async ({ user, profile }: any, thunkApi: any) => {
  try {
    if (!user._id) {
      const { data } = await axios.post("/api/users", user);

      return { data, profile };
    } else {
      const { data } = await axios.put(`/api/users/${user._id}`, user);
      if (profile) {
        await handleTokenRefresh(true);
      }
      return { data, profile };
    }
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const detailsUser = createAsyncThunk("users/detailsUser", async (id: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.delete(`/api/users/${id}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const registerUser = createAsyncThunk("users/registerUser", async (userData: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/register", userData);
    axios.post("/api/emails/account_created", data);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const loginUser = createAsyncThunk("users/loginUser", async (userData: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/login", userData);

    // Decode access_token and get user info
    const decoded: any = jwt_decode(data.access_token);
    const userId = decoded._id;

    console.log({ data });
    // Fetch user's cart
    const userCartResponse = await axios.get(`/api/carts/${userId}/user`);
    const userCart = userCartResponse.data;
    console.log({ userCart });
    // Get anonymous cart from localStorage
    const anonymousCartString = localStorage.getItem("my_cart");
    const anonymousCart = anonymousCartString ? JSON.parse(anonymousCartString) : { cartItems: [] };

    // Merge the carts
    anonymousCart.cartItems.forEach((anonymousCartItem: any) => {
      const existingItemIndex = userCart.cartItems.findIndex(
        (userCartItem: any) => userCartItem.product_id === anonymousCartItem.product_id
      );
      if (existingItemIndex !== -1) {
        userCart.cartItems[existingItemIndex].quantity += anonymousCartItem.quantity;
      } else {
        userCart.cartItems.push(anonymousCartItem);
      }
    });

    // Update the user's cart
    await axios.put(`/api/carts/${userId}/user`, { cartItems: userCart.cartItems });

    // Remove the anonymous cart
    localStorage.removeItem("my_cart");

    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

// export const loginUser = createAsyncThunk("users/loginUser", async (userData: any, thunkApi: any) => {
//   try {
//     const { data } = await axios.post("/api/users/login", userData);
//     return data;
//   } catch (error) {
//     Covy().showSnackbar({
//       message: `Error: ${error}`,
//       severity: "error"
//     });
//   }
// });

export const logoutUser = createAsyncThunk("users/logoutUser", async (refresh_token: any, thunkApi: any) => {
  const {
    carts: {
      cartPage: { my_cart }
    }
  } = thunkApi.getState();
  try {
    await axios.put("/api/users/logout", { refresh_token });
    return { my_cart };
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});
export const refreshLogin = async (refresh_token: any, thunkApi: any) => {
  try {
    return await axios.put("/api/users/refresh_login", { refresh_token });
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
};

export const loginAsUser = createAsyncThunk("users/loginAsUser", async (userData: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/login_as_user", userData);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const passwordReset = createAsyncThunk(
  "users/passwordReset",
  async ({ userId, password, rePassword }: { userId: string; password: string; rePassword: string }, thunkApi: any) => {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    try {
      const { data } = await axios.put("/api/users/password_reset", {
        userId,
        password,
        rePassword
      });

      // if (data && data.hasOwnProperty("first_name")) {
      //   axios.post("/api/emails/password_reset", data);
      //   return data;
      // }
      return { current_user, data };
    } catch (error) {
      Covy().showSnackbar({
        message: `Error: ${error}`,
        severity: "error"
      });
    }
  }
);

export const resetPassword = createAsyncThunk("users/resetPassword", async (email: string, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/reset_password", { email });

    axios.post("/api/emails/reset_password", data);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});
