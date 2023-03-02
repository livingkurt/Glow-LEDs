/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";

export const listParcels = createAsyncThunk("parcels/listParcels", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get("/api/parcels?" + create_query(query), {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const updateParcel = createAsyncThunk("parcels/updateParcel", async (parcel: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/parcels/" + parcel.pathname, parcel, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const createParcel = createAsyncThunk("parcels/createParcel", async (parcel: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/parcels", parcel, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const detailsParcel = createAsyncThunk("parcels/detailsParcel", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/parcels/${id}`, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const deleteParcel = createAsyncThunk("parcels/deleteParcel", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/parcels/" + pathname, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});
