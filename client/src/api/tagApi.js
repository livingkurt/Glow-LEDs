/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError } from "../slices/snackbarSlice";
import store from "../store";

export const getTags = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/tags/table`, {
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

export const listTags = createAsyncThunk("tags/listTags", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/tags?${create_query(query)}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveTag = createAsyncThunk("tags/saveTag", async (tag, { dispatch, rejectWithValue }) => {
  try {
    if (!tag._id) {
      const { data } = await axios.post("/api/tags", tag);
      return data;
    } else {
      const { data } = await axios.put(`/api/tags/${tag._id}`, tag);
      return data;
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const detailsTag = createAsyncThunk(
  "tags/detailsTag",
  async ({ pathname, id }, { dispatch, rejectWithValue }) => {
    try {
      let response = {};
      if (id) {
        response = await axios.get(`/api/tags/${id}`);
      } else if (pathname) {
        response = await axios.get(`/api/tags/${pathname}/pathname`);
      }
      return response.data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteTag = createAsyncThunk("tags/deleteTag", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/tags/${id}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});
