/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";

export const listFilaments = createAsyncThunk("filaments/listFilaments", async (query: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.get("/api/filaments?" + create_query(query), {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const updateFilament = createAsyncThunk("filaments/updateFilament", async (filament: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/filaments/" + filament.pathname, filament, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const createFilament = createAsyncThunk("filaments/createFilament", async (filament: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/filaments", filament, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const detailsFilament = createAsyncThunk("filaments/detailsFilament", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/filaments/${id}`, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const deleteFilament = createAsyncThunk("filaments/deleteFilament", async (pathname, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/filaments/" + pathname, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});
