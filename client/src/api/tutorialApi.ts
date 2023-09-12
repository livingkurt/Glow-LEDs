/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getTutorials = async ({
  search,
  sorting,
  filters,
  page,
  pageSize,
}: {
  search: string;
  sorting: any;
  filters: any;
  page: number;
  pageSize: number;
}) => {
  try {
    return await axios.get(`/api/tutorials`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters: JSON.stringify(filters),
      },
    });
  } catch (error: any) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};
export const reorderTutorials = async ({ reorderedItems }: { reorderedItems: any }) => {
  try {
    return axios.put(`/api/tutorials/reorder`, { reorderedItems });
  } catch (error: any) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const listTutorials = createAsyncThunk("tutorials/listTutorials", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/tutorials?${create_query(query)}`);

    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveTutorial = createAsyncThunk("tutorials/saveTutorial", async (tutorial: any, thunkApi: any) => {
  try {
    if (!tutorial._id) {
      const { data } = await axios.post("/api/tutorials", tutorial);
      thunkApi.dispatch(showSuccess({ message: `Tutorial Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/tutorials/${tutorial._id}`, tutorial);
      thunkApi.dispatch(showSuccess({ message: `Tutorials Updated` }));
      return data;
    }
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsTutorial = createAsyncThunk(
  "tutorials/detailsTutorial",
  async ({ pathname, id }: any, thunkApi: any) => {
    try {
      let response: any = {};
      if (id) {
        response = await axios.get(`/api/tutorials/${id}`);
      } else if (pathname) {
        response = await axios.get(`/api/tutorials/${pathname}/pathname`);
      }
      thunkApi.dispatch(showSuccess({ message: `Tutorial Found` }));
      return response.data;
    } catch (error: any) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
    }
  }
);

export const deleteTutorial = createAsyncThunk("tutorials/deleteTutorial", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.delete(`/api/tutorials/${id}`);
    thunkApi.dispatch(showSuccess({ message: `Tutorial Deleted` }));
    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
