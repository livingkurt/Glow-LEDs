/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getFeatures = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/features/table`, {
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

export const listFeatures = createAsyncThunk("features/listFeatures", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/features?${create_query(query)}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveFeature = createAsyncThunk("features/saveFeature", async (feature, { dispatch, rejectWithValue }) => {
  try {
    if (!feature._id) {
      const { data } = await axios.post("/api/features", feature);
      dispatch(showSuccess({ message: `Feature Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/features/${feature._id}`, feature);
      dispatch(showSuccess({ message: `Feature Updated` }));
      return data;
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const detailsFeature = createAsyncThunk("features/detailsFeature", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/features/${id}`);
    dispatch(showSuccess({ message: `Feature Found` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const deleteFeature = createAsyncThunk(
  "features/deleteFeature",
  async (pathname, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/features/" + pathname);
      dispatch(showSuccess({ message: `Feature Deleted` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
