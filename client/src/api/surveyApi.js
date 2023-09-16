/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getSurveys = async ({
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
    return await axios.get(`/api/surveys/table`, {
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

export const getSurveyFilters = async () => {
  const { data } = await axios.get(`/api/surveys/filters`);
  return data;
};

export const listSurveys = createAsyncThunk(
  "surveys/listSurveys",
  async ({ search, sorting, filters, page, pageSize }, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/surveys`, {
        params: {
          limit: pageSize,
          page: page,
          search: search,
          sort: sorting,
          filters: JSON.stringify(filters),
        },
      });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const saveSurvey = createAsyncThunk("surveys/saveSurvey", async (survey, thunkApi) => {
  try {
    if (!survey._id) {
      const { data } = await axios.post("/api/surveys", survey);
      thunkApi.dispatch(showSuccess({ message: `Survey Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/surveys/${survey._id}`, survey);
      thunkApi.dispatch(showSuccess({ message: `Survey Updated` }));
      return data;
    }
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsSurvey = createAsyncThunk("surveys/detailsSurvey", async (id, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/surveys/${id}`);
    thunkApi.dispatch(showSuccess({ message: `Survey Found` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const getSurveysByLink = createAsyncThunk("surveys/getSurveysByLink", async (link, thunkApi) => {
  try {
    const { data } = await axios.put(`/api/surveys/link`, { link });
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteSurvey = createAsyncThunk("surveys/deleteSurvey", async (pathname, thunkApi) => {
  try {
    const { data } = await axios.delete("/api/surveys/" + pathname);
    thunkApi.dispatch(showSuccess({ message: `Survey Deleted` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
