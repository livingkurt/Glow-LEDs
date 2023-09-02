/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getWholesalers = async ({
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
    return await axios.get(`/api/wholesalers`, {
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

export const listWholesalers = createAsyncThunk("wholesalers/listWholesalers", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/wholesalers?${create_query(query)}`);

    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveWholesaler = createAsyncThunk("wholesalers/saveWholesaler", async (wholesaler: any, thunkApi: any) => {
  try {
    if (!wholesaler._id) {
      const { data } = await axios.post("/api/wholesalers", wholesaler);
      thunkApi.dispatch(showSuccess({ message: `Wholesaler Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/wholesalers/${wholesaler._id}`, wholesaler);
      thunkApi.dispatch(showSuccess({ message: `Wholesaler Updated` }));
      return data;
    }
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsWholesaler = createAsyncThunk(
  "wholesalers/detailsWholesaler",
  async ({ id }: any, thunkApi: any) => {
    try {
      const { data } = await axios.get(`/api/wholesalers/${id}`);
      thunkApi.dispatch(showSuccess({ message: `Wholesaler Found` }));
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
    }
  }
);

export const deleteWholesaler = createAsyncThunk("wholesalers/deleteWholesaler", async (id, thunkApi: any) => {
  try {
    const { data } = await axios.delete(`/api/wholesalers/${id}`);
    thunkApi.dispatch(showSuccess({ message: `Wholesaler Deleted` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
