/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import jwt_decode from "jwt-decode";

import { create_query } from "../utils/helper_functions";
import { handleTokenRefresh, setCurrentUser } from "./axiosInstance";
import { updateCartItems } from "../helpers/userHelpers";

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
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
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
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveUser = createAsyncThunk("users/saveUser", async ({ user, profile }: any, thunkApi: any) => {
  try {
    if (!user._id) {
      const { data } = await axios.post("/api/users", user);
      Covy().showSnackbar({
        message: `User Created`,
        severity: "success",
      });
      return { data, profile };
    } else {
      const { data } = await axios.put(`/api/users/${user._id}`, user);
      Covy().showSnackbar({
        message: `User Updated`,
        severity: "success",
      });
      if (profile) {
        await handleTokenRefresh(true);
      }
      return { data, profile };
    }
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsUser = createAsyncThunk("users/detailsUser", async (id: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    Covy().showSnackbar({
      message: `User Found`,
      severity: "success",
    });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.delete(`/api/users/${id}`);
    Covy().showSnackbar({
      message: `User Deleted`,
      severity: "success",
    });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const registerUser = createAsyncThunk("users/registerUser", async (userData: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/register", userData);
    axios.post("/api/emails/account_created", data);
    Covy().showSnackbar({
      message: `User Registered`,
      severity: "success",
    });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const loginUser = createAsyncThunk("users/loginUser", async (userData: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/login", userData);

    // Decode access_token and get user info
    const decoded: any = jwt_decode(data.access_token);
    const userId = decoded._id;

    // Fetch user's cart
    const userCartResponse = await axios.get(`/api/carts/${userId}/user`);
    let userCart = userCartResponse.data;

    if (!userCart || !userCart.cartItems) {
      // If there is no cart for the user, create a new one
      const newCartResponse = await axios.post(`/api/carts`, { userId: userId, cartItems: [] });
      userCart = newCartResponse.data;
    }

    // Get anonymous cart from localStorage
    const anonymousCartItemsString = localStorage.getItem("cartItems");
    if (anonymousCartItemsString) {
      const anonymousCartItems = anonymousCartItemsString ? JSON.parse(anonymousCartItemsString) : { cartItems: [] };

      // Merge the carts
      anonymousCartItems.forEach((anonymousCartItem: any) => {
        userCart.cartItems = updateCartItems(userCart.cartItems, anonymousCartItem);
      });

      // Update the user's cart
      await axios.put(`/api/carts/${userId}/user`, { cartItems: userCart.cartItems });

      // Remove the anonymous cart
      // localStorage.removeItem("cartItems");
    }
    Covy().showSnackbar({
      message: `User Logged In`,
      severity: "success",
    });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

// export const loginUser = createAsyncThunk("users/loginUser", async (userData: any, thunkApi: any) => {
//   try {
//     const { data } = await axios.post("/api/users/login", userData);
//     return data;
//   } catch (error) {
//     Covy().showSnackbar({
//       message: errorMessage(error),
//       severity: "error"
//     });
//   }
// });

export const logoutUser = createAsyncThunk("users/logoutUser", async (refresh_token: any, thunkApi: any) => {
  const {
    carts: {
      cartPage: { my_cart },
    },
  } = thunkApi.getState();
  try {
    await axios.put("/api/users/logout", { refresh_token });
    Covy().showSnackbar({
      message: `User Logged Out`,
      severity: "success",
    });
    return { my_cart };
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
export const refreshLogin = async (refresh_token: any, thunkApi: any) => {
  try {
    return await axios.put("/api/users/refresh_login", { refresh_token });
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
  }
};

export const loginAsUser = createAsyncThunk("users/loginAsUser", async (userData: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/login_as_user", userData);
    Covy().showSnackbar({
      message: `Logged in as User`,
      severity: "success",
    });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const passwordReset = createAsyncThunk(
  "users/passwordReset",
  async ({ userId, password, rePassword }: { userId: string; password: string; rePassword: string }, thunkApi: any) => {
    const {
      users: {
        userPage: { current_user },
      },
    } = thunkApi.getState();
    try {
      const { data } = await axios.put("/api/users/password_reset", {
        userId,
        password,
        rePassword,
      });

      // if (data && data.hasOwnProperty("first_name")) {
      //   axios.post("/api/emails/password_reset", data);
      //   return data;
      // }
      Covy().showSnackbar({
        message: `Password Reset`,
        severity: "success",
      });
      return { current_user, data };
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);

export const resetPassword = createAsyncThunk("users/resetPassword", async (email: string, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/users/reset_password", { email });

    axios.post("/api/emails/reset_password", data);
    Covy().showSnackbar({
      message: `Reset Password`,
      severity: "success",
    });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
