/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";

export const getProducts = async ({
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
    return axios.get(`/api/products`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters,
      },
    });
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
};

export const getProductFilters = async () => {
  const { data } = await axios.get(`/api/products/filters`);
  return data;
};
export const reorderProducts = async ({ reorderedItems }: { reorderedItems: any }) => {
  try {
    return axios.put(`/api/products/reorder`, { reorderedItems });
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
};

export const listProducts = createAsyncThunk("products/listProducts", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/products/grid?${create_query(query)}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveProduct = createAsyncThunk("products/saveProduct", async (product: any, thunkApi: any) => {
  try {
    if (!product._id) {
      const { data } = await axios.post("/api/products", product);
      return data;
    } else {
      const { data } = await axios.put(`/api/products/${product._id}`, product);
      return data;
    }
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsProduct = createAsyncThunk("products/detailsProduct", async (pathname: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/products/${pathname}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.delete(`/api/products/${id}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteMultipleProducts = createAsyncThunk(
  "products/deleteMultipleProducts",
  async (ids: string, thunkApi: any) => {
    try {
      const { data } = await axios.put(`/api/products/delete_multiple`, { ids });
      return data;
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);

export const saveProductReview = createAsyncThunk(
  "products/deleteProduct",
  async (
    {
      product_pathname,
      review,
    }: { product_pathname: string; review: { name: string; rating: number; comment: string } },
    thunkApi: any
  ) => {
    const {
      users: {
        userPage: { current_user },
      },
    } = thunkApi.getState();
    try {
      const { data } = await axios.post(`/api/products/reviews/${product_pathname}`, { review, current_user });
      return data;
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);

export const deleteProductReview = createAsyncThunk(
  "products/deleteProduct",
  async ({ product_pathname, review_id }: { product_pathname: string; review_id: string }, thunkApi: any) => {
    try {
      const { data } = await axios.delete(`/api/products/reviews/${product_pathname}/delete_one/${review_id}`);
      return data;
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
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
