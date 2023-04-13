/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listParcels = createAsyncThunk("parcels/listParcels", async (query: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/parcels?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveParcel = createAsyncThunk("parcels/saveParcel", async (parcel: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();

    if (!parcel._id) {
      const { data } = await axios.post("/api/parcels", parcel, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/parcels/${parcel._id}`, parcel, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsParcel = createAsyncThunk("parcels/detailsParcel", async (id: string, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/parcels/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteParcel = createAsyncThunk("parcels/deleteParcel", async (pathname, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/parcels/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
