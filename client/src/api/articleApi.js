/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getArticles = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/articles/table`, {
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
export const reorderArticles = async ({ reorderedItems }) => {
  try {
    return axios.put(`/api/articles/reorder`, { reorderedItems });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const listArticles = createAsyncThunk("articles/listArticles", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/articles?${create_query(query)}`);

    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveArticle = createAsyncThunk("articles/saveArticle", async (article, { dispatch, rejectWithValue }) => {
  try {
    if (!article._id) {
      const { data } = await axios.post("/api/articles", article);
      dispatch(showSuccess({ message: `Article Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/articles/${article._id}`, article);
      dispatch(showSuccess({ message: `Articles Updated` }));
      return data;
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});
export const detailsArticle = createAsyncThunk(
  "articles/detailsArticle",
  async (pathname, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/articles/${pathname}`);
      dispatch(showSuccess({ message: `Article Found` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteArticle = createAsyncThunk("articles/deleteArticle", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/articles/${id}`);
    dispatch(showSuccess({ message: `Article Deleted` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});
