/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getCategorys = async ({
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
    return await axios.get(`/api/categorys`, {
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
export const reorderCategorys = async ({ reorderedItems }: { reorderedItems: any }) => {
  try {
    return axios.put(`/api/categorys/reorder`, { reorderedItems });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const listCategorys = createAsyncThunk("categorys/listCategorys", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/categorys?${create_query(query)}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveCategory = createAsyncThunk("categorys/saveCategory", async (category: any, thunkApi: any) => {
  try {
    if (!category._id) {
      const { data } = await axios.post("/api/categorys", category);
      return data;
    } else {
      const { data } = await axios.put(`/api/categorys/${category._id}`, category);
      return data;
    }
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsCategory = createAsyncThunk(
  "categorys/detailsCategory",
  async ({ pathname, id }: any, thunkApi: any) => {
    try {
      let response: any = {};
      if (id) {
        response = await axios.get(`/api/categorys/${id}`);
      } else if (pathname) {
        response = await axios.get(`/api/categorys/${pathname}/pathname`);
      }
      return response.data;
    } catch (error) {
      thunkApi.dispatch(showSuccess({ message: errorMessage(error) }));
    }
  }
);

export const deleteCategory = createAsyncThunk("categorys/deleteCategory", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.delete(`/api/categorys/${id}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
