/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getMicrolights = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/microlights/table`, {
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

export const getMicrolightFilters = async () => {
  const { data } = await axios.get(`/api/microlights/filters`);
  return data;
};

export const listMicrolights = createAsyncThunk(
  "microlights/listMicrolights",
  async (query, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/microlights?${create_query(query)}`);
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const saveMicrolight = createAsyncThunk(
  "microlights/saveMicrolight",
  async (microlight, { dispatch, rejectWithValue }) => {
    try {
      if (!microlight._id) {
        const { data } = await axios.post("/api/microlights", microlight);
        dispatch(showSuccess({ message: `Microlight Created` }));
        return data;
      } else {
        const { data } = await axios.put(`/api/microlights/${microlight._id}`, microlight);
        dispatch(showSuccess({ message: `Microlight Updated` }));
        return data;
      }
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const detailsMicrolight = createAsyncThunk(
  "microlights/detailsMicrolight",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/microlights/${id}`);
      dispatch(showSuccess({ message: `Microlight Found` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getMicrolightsByLink = createAsyncThunk(
  "microlights/getMicrolightsByLink",
  async (link, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/microlights/link`, { link });
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteMicrolight = createAsyncThunk(
  "microlights/deleteMicrolight",
  async (pathname, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/microlights/" + pathname);
      dispatch(showSuccess({ message: `Microlight Deleted` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
