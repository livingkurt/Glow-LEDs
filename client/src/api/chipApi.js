/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getChips = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/chips/table`, {
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

export const getChipFilters = async () => {
  const { data } = await axios.get(`/api/chips/filters`);
  return data;
};

export const listChips = createAsyncThunk("chips/listChips", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/chips?${create_query(query)}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveChip = createAsyncThunk("chips/saveChip", async (chip, { dispatch, rejectWithValue }) => {
  try {
    if (!chip._id) {
      const { data } = await axios.post("/api/chips", chip);
      dispatch(showSuccess({ message: `Chip Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/chips/${chip._id}`, chip);
      dispatch(showSuccess({ message: `Chip Updated` }));
      return data;
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const detailsChip = createAsyncThunk("chips/detailsChip", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/chips/${id}`);
    dispatch(showSuccess({ message: `Chip Found` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const getChipsByLink = createAsyncThunk("chips/getChipsByLink", async (link, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.put(`/api/chips/link`, { link });
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const deleteChip = createAsyncThunk("chips/deleteChip", async (pathname, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete("/api/chips/" + pathname);
    dispatch(showSuccess({ message: `Chip Deleted` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});
