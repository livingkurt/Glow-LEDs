/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getContents = async ({
  search,
  sorting,
  filters,
  page,
  pageSize,
}: {
  search;
  sorting;
  filters;
  page;
  pageSize;
}) => {
  try {
    return await axios.get(`/api/contents/table`, {
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

export const getContentFilters = async () => {
  const { data } = await axios.get(`/api/contents/filters`);
  return data;
};

export const listContents = createAsyncThunk("contents/listContents", async (query, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/contents?${create_query(query)}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveContent = createAsyncThunk("contents/saveContent", async (content, thunkApi) => {
  try {
    if (!content._id) {
      const { data } = await axios.post("/api/contents", content);
      thunkApi.dispatch(showSuccess({ message: `Content Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/contents/${content._id}`, content);
      thunkApi.dispatch(showSuccess({ message: `Content Updated` }));
      return data;
    }
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsContent = createAsyncThunk("contents/detailsContent", async (id, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/contents/${id}`);
    thunkApi.dispatch(showSuccess({ message: `Content Found` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const getContentsByLink = createAsyncThunk("contents/getContentsByLink", async (link, thunkApi) => {
  try {
    const { data } = await axios.put(`/api/contents/link`, { link });
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteContent = createAsyncThunk("contents/deleteContent", async (pathname, thunkApi) => {
  try {
    const { data } = await axios.delete("/api/contents/" + pathname);
    thunkApi.dispatch(showSuccess({ message: `Content Deleted` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
