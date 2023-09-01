/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getImages = async ({
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
    return await axios.get(`/api/images`, {
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

export const listImages = createAsyncThunk("images/listImages", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/images?${create_query(query)}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveImage = createAsyncThunk("images/saveImage", async (image: any, thunkApi: any) => {
  try {
    if (!image._id) {
      const { data } = await axios.post("/api/images", image);
      thunkApi.dispatch(showSuccess({ message: `Image Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/images/${image._id}`, image);
      thunkApi.dispatch(showSuccess({ message: `Image Saved` }));
      return data;
    }
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsImage = createAsyncThunk("images/detailsImage", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/images/${id}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const getImagesByLink = createAsyncThunk("images/getImagesByLink", async (link: string, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/images/link`, { link });
    thunkApi.dispatch(showSuccess({ message: `Image Found` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteImage = createAsyncThunk("images/deleteImage", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/images/" + pathname);
    thunkApi.dispatch(showSuccess({ message: `Image Deleted` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
