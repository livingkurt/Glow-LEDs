/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showInfo, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getCarts = async ({ search, sorting, filters, page, pageSize }) => {
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
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const listCarts = createAsyncThunk("carts/listCarts", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/carts?${create_query(query)}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const addToCart = createAsyncThunk(
  "carts/addToCart",
  async ({ cart, cartItems, type }, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        users: {
          userPage: { current_user },
        },
        carts: {
          cartPage: { my_cart },
        },
      } = getState();

      // Call handle_cart route whether the cart exists or not
      let response;
      if (cart?._id) {
        response = await axios.post(`/api/carts/${cart._id}/add_to_cart`, {
          cartItems: Array.isArray(cartItems) ? cartItems : [cartItems],
          existingCartItems: my_cart?.cartItems || [],
          current_user,
        });
      } else {
        response = await axios.post(`/api/carts/add_to_cart`, {
          cartItems: Array.isArray(cartItems) ? cartItems : [cartItems],
          existingCartItems: my_cart?.cartItems || [],
          current_user,
        });
      }

      const { data, messages } = response.data;

      if (messages && messages.length > 0) {
        messages.forEach(message => {
          dispatch(showInfo({ message, duration: 3000 }));
        });
      } else {
        dispatch(showSuccess({ message: `Cart Items Added`, duration: 1000 }));
      }

      // Add current_user to the returned payload
      return { data, type, current_user, messages };
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const saveCart = createAsyncThunk("carts/saveCart", async (cart, { dispatch, rejectWithValue }) => {
  try {
    if (!cart._id) {
      const { data } = await axios.post("/api/carts", cart);
      dispatch(showSuccess({ message: `Cart Created` }));
      return { data };
    } else {
      const { data } = await axios.put(`/api/carts/${cart._id}`, cart);
      dispatch(showSuccess({ message: `Cart Saved` }));
      return { data };
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const updateQuantity = createAsyncThunk(
  "carts/updateQuantity",
  async (cart, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        users: {
          userPage: { current_user },
        },
        carts: {
          cartPage: { my_cart },
        },
      } = getState();
      if (my_cart._id) {
        await axios.put(`/api/carts/${cart._id}`, cart);
        return { data: cart, current_user };
      } else {
        return { data: cart, current_user };
      }
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const detailsCart = createAsyncThunk("carts/detailsCart", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/carts/${id}`);
    dispatch(showSuccess({ message: `Cart Found` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const getCurrentUserCart = createAsyncThunk(
  "carts/getCurrentUserCart",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/carts/${id}/user`);
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const emptyCart = createAsyncThunk("carts/emptyCart", async (id, { dispatch, rejectWithValue }) => {
  try {
    if (id) {
      const { data } = await axios.post(`/api/carts/${id}/empty_cart`);
      return data;
    } else {
      return "Success";
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const deleteCart = createAsyncThunk("carts/deleteCart", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/carts/${id}`);
    dispatch(showSuccess({ message: `Cart Deleted` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const deleteCartItem = createAsyncThunk(
  "carts/deleteCartItem",
  async ({ item_index, type }, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        users: {
          userPage: { current_user },
        },
        carts: {
          cartPage: { my_cart },
        },
      } = getState();
      const { data } = await axios.put(`/api/carts/${my_cart._id}/cart_item/${item_index}`, { current_user, my_cart });
      dispatch(showSuccess({ message: `Cart Item Deleted` }));
      return { data, type };
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
