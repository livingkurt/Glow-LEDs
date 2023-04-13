/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
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
  } catch (error) {}
};

export const listImages = createAsyncThunk("images/listImages", async (query: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/images?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveImage = createAsyncThunk("images/saveImage", async (image: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();

    if (!image._id) {
      const { data } = await axios.post("/api/images", image, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/images/${image._id}`, image, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsImage = createAsyncThunk("images/detailsImage", async (id: string, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/images/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteImage = createAsyncThunk("images/deleteImage", async (pathname, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/images/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
