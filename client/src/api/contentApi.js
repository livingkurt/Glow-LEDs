/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getContents = async ({ search, sorting, filters, page, pageSize }) => {
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

export const listContents = createAsyncThunk("contents/listContents", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/contents?${create_query(query)}`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const saveContent = createAsyncThunk("contents/saveContent", async (content, { dispatch, rejectWithValue }) => {
  try {
    if (!content._id) {
      const { data } = await axios.post("/api/contents", content);
      dispatch(showSuccess({ message: `Content Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/contents/${content._id}`, content);
      dispatch(showSuccess({ message: `Content Updated` }));
      return data;
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const detailsContent = createAsyncThunk("contents/detailsContent", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/contents/${id}`);
    dispatch(showSuccess({ message: `Content Found` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const getContentsByLink = createAsyncThunk(
  "contents/getContentsByLink",
  async (link, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/contents/link`, { link });
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getActiveContent = createAsyncThunk("contents/getActiveContent", async () => {
  try {
    const { data } = await axios.get("/api/contents/current");
    return data;
  } catch (error) {
    console.error("Error fetching active content:", error);
  }
});

export const getSlideshowImages = createAsyncThunk(
  "contents/getSlideshowImages",
  async (_data, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/contents/slideshow`);
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteContent = createAsyncThunk(
  "contents/deleteContent",
  async (pathname, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/contents/" + pathname);
      dispatch(showSuccess({ message: `Content Deleted` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: builder => ({
    currentContent: builder.query({
      query: () => `/contents/current`,
    }),
  }),
});

export const { useCurrentContentQuery } = contentApi;
