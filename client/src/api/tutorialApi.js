/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getTutorials = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/tutorials/table`, {
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
export const reorderTutorials = async ({ reorderedItems }) => {
  try {
    return axios.put(`/api/tutorials/reorder`, { reorderedItems });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const listTutorials = createAsyncThunk(
  "tutorials/listTutorials",
  async (query, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/tutorials?${create_query(query)}`);

      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const saveTutorial = createAsyncThunk(
  "tutorials/saveTutorial",
  async (tutorial, { dispatch, rejectWithValue }) => {
    try {
      if (!tutorial._id) {
        const { data } = await axios.post("/api/tutorials", tutorial);
        dispatch(showSuccess({ message: `Tutorial Created` }));
        return data;
      } else {
        const { data } = await axios.put(`/api/tutorials/${tutorial._id}`, tutorial);
        dispatch(showSuccess({ message: `Tutorials Updated` }));
        return data;
      }
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const detailsTutorial = createAsyncThunk(
  "tutorials/detailsTutorial",
  async ({ pathname, id }, { dispatch, rejectWithValue }) => {
    try {
      let response = {};
      if (id) {
        response = await axios.get(`/api/tutorials/${id}`);
      } else if (pathname) {
        response = await axios.get(`/api/tutorials/${pathname}/pathname`);
      }
      dispatch(showSuccess({ message: `Tutorial Found` }));
      return response.data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteTutorial = createAsyncThunk(
  "tutorials/deleteTutorial",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/tutorials/${id}`);
      dispatch(showSuccess({ message: `Tutorial Deleted` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
