/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const getProducts = async ({
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
    return axios.get(`/api/products`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters: filters
      }
    });
  } catch (error) {}
};
export const reorderProducts = async ({ reorderedItems }: { reorderedItems: any }) => {
  try {
    return axios.put(`/api/products/reorder`, { reorderedItems });
  } catch (error) {}
};

export const listProducts = createAsyncThunk("products/listProducts", async (query: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/products?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveProduct = createAsyncThunk("products/saveProduct", async (product: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();

    if (!product._id) {
      const { data } = await axios.post("/api/products", product, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/products/${product._id}`, product, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsProduct = createAsyncThunk("products/detailsProduct", async (pathname: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/products/${pathname}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id: string, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.delete(`/api/products/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveProductReview = createAsyncThunk(
  "products/deleteProduct",
  async (
    { product_pathname, review }: { product_pathname: string; review: { name: string; rating: number; comment: string } },
    thunkApi: any
  ) => {
    try {
      const {
        users: {
          userPage: { current_user }
        }
      } = thunkApi.getState();
      const { data } = await axios.post(`/api/products/reviews/${product_pathname}`, { review, current_user }, headers(current_user));
      return data;
    } catch (error) {}
  }
);

export const deleteProductReview = createAsyncThunk(
  "products/deleteProduct",
  async ({ product_pathname, review_id }: { product_pathname: string; review_id: string }, thunkApi: any) => {
    try {
      const {
        users: {
          userPage: { current_user }
        }
      } = thunkApi.getState();
      const { data } = await axios.delete(`/api/products/reviews/${product_pathname}/delete_one/${review_id}`, headers(current_user));
      return data;
    } catch (error) {}
  }
);
