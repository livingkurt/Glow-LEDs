/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";

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
    return axios.get(`/api/images`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters,
      },
    });
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
  }
};

export const listImages = createAsyncThunk("images/listImages", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/images?${create_query(query)}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveImage = createAsyncThunk("images/saveImage", async (image: any, thunkApi: any) => {
  try {
    if (!image._id) {
      const { data } = await axios.post("/api/images", image);
      Covy().showSnackbar({
        message: `Image Created`,
        severity: "success",
      });
      return data;
    } else {
      const { data } = await axios.put(`/api/images/${image._id}`, image);
      Covy().showSnackbar({
        message: `Image Saved`,
        severity: "success",
      });
      return data;
    }
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsImage = createAsyncThunk("images/detailsImage", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/images/${id}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const getImagesByLink = createAsyncThunk("images/getImagesByLink", async (link: string, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/images/link`, { link });
    Covy().showSnackbar({
      message: `Image Found`,
      severity: "success",
    });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteImage = createAsyncThunk("images/deleteImage", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/images/" + pathname);
    Covy().showSnackbar({
      message: `Image Deleted`,
      severity: "success",
    });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
