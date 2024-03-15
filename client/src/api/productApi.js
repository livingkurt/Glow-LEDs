/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getProducts = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    const response = await axios.get(`/api/products/table`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters: JSON.stringify(filters),
      },
    });
    return response;
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const getProductFilters = async () => {
  const { data } = await axios.get(`/api/products/filters`);
  return data;
};
export const reorderProducts = async ({ reorderedItems }) => {
  try {
    return axios.put(`/api/products/reorder`, { reorderedItems });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const listProducts = createAsyncThunk("products/listProducts", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/products?${create_query(query)}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveProduct = createAsyncThunk("products/saveProduct", async (product, { dispatch, rejectWithValue }) => {
  try {
    if (!product._id) {
      const { data } = await axios.post("/api/products", product);
      dispatch(showSuccess({ message: `Product Created` }));
      return { data, created: true };
    } else {
      const { data } = await axios.put(`/api/products/${product._id}`, product);
      dispatch(showSuccess({ message: `Product Updated` }));
      return { data, edited: true };
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const detailsProduct = createAsyncThunk(
  "products/detailsProduct",
  async ({ pathname, openEditModal }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${pathname}`);
      dispatch(showSuccess({ message: `Product Found` }));
      return { data, openEditModal };
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/products/${id}`);
    dispatch(showSuccess({ message: `Product Deleted` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const deleteMultipleProducts = createAsyncThunk(
  "products/deleteMultipleProducts",
  async (ids, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/products/delete_multiple`, { ids });
      dispatch(showSuccess({ message: `Products Deleted` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const saveProductReview = createAsyncThunk(
  "products/deleteProduct",
  async ({ product_pathname, review }, { dispatch, rejectWithValue, getState }) => {
    const {
      users: {
        userPage: { current_user },
      },
    } = getState();
    try {
      const { data } = await axios.post(`/api/products/reviews/${product_pathname}`, { review, current_user });
      dispatch(showSuccess({ message: `Product Review Saved` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProductReview = createAsyncThunk(
  "products/deleteProduct",
  async ({ product_pathname, review_id }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/products/reviews/${product_pathname}/delete_one/${review_id}`);
      dispatch(showSuccess({ message: `Product Review Deleted` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

// export const productApi = createApi({
//   reducerPath: "productApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
//   endpoints: builder => ({
//     getProductQuantitiesOrders: builder.query({
//       query: () => "/orders/get_product_quantities_orders"
//     }),
//   })
// });

// export const {

// } = productApi;
