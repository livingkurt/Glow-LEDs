/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";

import { create_query } from "../utils/helper_functions";

export const getImages = async ({
  search,
  sorting,
  filters,
  page,
  pageSize
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
        filters
      }
    });
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
};

export const listImages = createAsyncThunk("images/listImages", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/images?${create_query(query)}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const saveImage = createAsyncThunk("images/saveImage", async (image: any, thunkApi: any) => {
  try {
    if (!image._id) {
      const { data } = await axios.post("/api/images", image);
      return data;
    } else {
      const { data } = await axios.put(`/api/images/${image._id}`, image);
      return data;
    }
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const detailsImage = createAsyncThunk("images/detailsImage", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/images/${id}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const getImagesByLink = createAsyncThunk("images/getImagesByLink", async (link: string, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/images/link`, { link });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const deleteImage = createAsyncThunk("images/deleteImage", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/images/" + pathname);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});
