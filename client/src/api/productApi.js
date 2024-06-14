/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCustomizedProduct } from "../pages/ProductPage/productPageSlice";

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
export const createOptionProduct = createAsyncThunk(
  "products/createOptionProduct",
  async ({ productId, seedOptionProductId, newOptionProductData, optionId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/products/${productId}/option/${optionId}/option_product/${seedOptionProductId}`,
        {
          newOptionProductData,
        }
      );
      dispatch(showSuccess({ message: `Option Product Created and Linked To Main Product` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

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

export const detailsProductPage = createAsyncThunk(
  "products/productPage/detailsProductPage",
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

export const getOurPicksProducts = createAsyncThunk(
  "products/deleteProduct",
  async (_param, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/products/our_picks");
      console.log({ data });
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: builder => ({
    product: builder.query({
      query: pathname => ({ url: `/products/${pathname}`, method: "get" }),
      transformResponse: response => {
        console.log({ response });
        // Run actions here
        store.dispatch(
          setCustomizedProduct({
            name: response.name,
            description: response.description,
            facts: response.facts,
            included_items: response.included_items,
            images: response.images_object,
            price: response.price,
            wholesale_price: response.wholesale_price,
            previous_price: response.previous_price,
            sale_price: response.sale_price,
            size: response.size,
            quantity: response.quantity,
            count_in_stock: response.count_in_stock,
            image: response.image,
            secondary_image: response.secondary_image,
            secondary_images: response.secondary_images,
            dimensions: response.dimensions,
            show_add_on: response.show_add_on,
            add_on_price: response.add_on_price,
            has_add_on: response.has_add_on,
            tabIndex: response.tabIndex,
            review_modal: response.review_modal,
            rating: response.rating,
            comment: response.comment,
            selectedOptions: response.options.map(option => option.values.find(value => value.isDefault)),
          })
        );
        return response;
      },
    }),
  }),
});

// export const productApi = createApi({
//   reducerPath: "productApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
//   endpoints: builder => ({
//     getProductQuantitiesOrders: builder.query({
//       query: () => "/orders/get_product_quantities_orders"
//     }),
//   })
// });

export const { useProductQuery } = productApi;
