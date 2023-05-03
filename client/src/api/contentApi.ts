/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { create_query } from "../utils/helper_functions";

export const listContents = createAsyncThunk("contents/listContents", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/contents?${create_query(query)}`);
    return data;
  } catch (error) {}
});

export const saveContent = createAsyncThunk("contents/saveContent", async (content: any, thunkApi: any) => {
  try {
    if (!content._id) {
      const { data } = await axios.post("/api/contents", content);
      return data;
    } else {
      const { data } = await axios.put(`/api/contents/${content._id}`, content);
      return data;
    }
  } catch (error) {}
});

export const detailsContent = createAsyncThunk("contents/detailsContent", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/contents/${id}`);
    return data;
  } catch (error) {}
});

export const deleteContent = createAsyncThunk("contents/deleteContent", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/contents/" + pathname);
    return data;
  } catch (error) {}
});
