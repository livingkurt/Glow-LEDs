/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError } from "../slices/snackbarSlice";
import store from "../store";

export const getFilaments = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/filaments/table`, {
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
export const reorderFilaments = async ({ reorderedItems }) => {
  try {
    return axios.put(`/api/filaments/reorder`, { reorderedItems });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const listFilaments = createAsyncThunk(
  "filaments/listFilaments",
  async (query, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/filaments?${create_query(query)}`);
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const saveFilament = createAsyncThunk(
  "filaments/saveFilament",
  async (filament, { dispatch, rejectWithValue }) => {
    try {
      if (!filament._id) {
        const { data } = await axios.post("/api/filaments", filament);
        return data;
      } else {
        const { data } = await axios.put(`/api/filaments/${filament._id}`, filament);
        return data;
      }
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const detailsFilament = createAsyncThunk(
  "filaments/detailsFilament",
  async ({ pathname, id }, { dispatch, rejectWithValue }) => {
    try {
      let response = {};
      if (id) {
        response = await axios.get(`/api/filaments/${id}`);
      } else if (pathname) {
        response = await axios.get(`/api/filaments/${pathname}/pathname`);
      }
      return response.data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteFilament = createAsyncThunk(
  "filaments/deleteFilament",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/filaments/${id}`);
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
