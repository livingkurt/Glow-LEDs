/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";

export const getCarts = async ({
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
    return await axios.get(`/api/carts`, {
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

export const listCarts = createAsyncThunk("carts/listCarts", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/carts?${create_query(query)}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const addToCart = createAsyncThunk(
  "carts/addToCart",
  async ({ cart, cart_item, type }: { cart: any; cart_item: any; type: string }, thunkApi: any) => {
    try {
      const {
        users: {
          userPage: { current_user },
        },
        carts: {
          cartPage: { my_cart },
        },
      } = thunkApi.getState();

      // Call handle_cart route whether the cart exists or not
      let data;
      if (cart._id) {
        data = await axios.post(`/api/carts/${cart._id}/add_to_cart`, {
          cart_item,
          cartItems: my_cart.cartItems,
          current_user,
        });
      } else {
        data = await axios.post(`/api/carts/add_to_cart`, { cart_item, cartItems: my_cart.cartItems, current_user });
      }
      Covy().showSnackbar({
        message: `Cart Item Added`,
        severity: "success",
      });

      // Add current_user to the returned payload
      return { data: data.data, type, current_user };
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);

export const saveCart = createAsyncThunk("carts/saveCart", async (cart: any, thunkApi: any) => {
  try {
    if (!cart._id) {
      const { data } = await axios.post("/api/carts", cart);
      Covy().showSnackbar({
        message: `Cart Created`,
        severity: "success",
      });
      return { data };
    } else {
      const { data } = await axios.put(`/api/carts/${cart._id}`, cart);
      Covy().showSnackbar({
        message: `Cart Saved`,
        severity: "success",
      });
      return { data };
    }
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const updateQuantity = createAsyncThunk("carts/updateQuantity", async (cart: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user },
      },
    } = thunkApi.getState();
    const { data } = await axios.put(`/api/carts/${cart._id}`, cart);
    return { data: cart, current_user };
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsCart = createAsyncThunk("carts/detailsCart", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/carts/${id}`);
    Covy().showSnackbar({
      message: `Cart Found`,
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

export const getCurrentUserCart = createAsyncThunk("carts/getCurrentUserCart", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/carts/${id}/user`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const emptyCart = createAsyncThunk("carts/emptyCart", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.post(`/api/carts/${id}/empty_cart`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteCart = createAsyncThunk("carts/deleteCart", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.delete(`/api/carts/${id}`);
    Covy().showSnackbar({
      message: `Cart Deleted`,
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

export const deleteCartItem = createAsyncThunk(
  "carts/deleteCartItem",
  async ({ item_index, type }: { cart: any; item_index: any; type: string }, thunkApi: any) => {
    try {
      const {
        users: {
          userPage: { current_user },
        },
        carts: {
          cartPage: { my_cart },
        },
      } = thunkApi.getState();
      const { data } = await axios.put(`/api/carts/${my_cart._id}/cart_item/${item_index}`, { current_user, my_cart });
      Covy().showSnackbar({
        message: `Cart Item Deleted`,
        severity: "success",
      });
      return { data, type };
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);
