/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listEmails = createAsyncThunk("emails/listEmails", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/emails?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveEmail = createAsyncThunk("emails/saveEmail", async (email: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();

    if (!email._id) {
      const { data } = await axios.post("/api/emails", email, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/emails/${email._id}`, email, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsEmail = createAsyncThunk("emails/detailsEmail", async (id: string, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/emails/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteEmail = createAsyncThunk("emails/deleteEmail", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/emails/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});

export const sendContactEmail = createAsyncThunk(
  "emails/sendContactEmail",
  async (
    contact_info: {
      first_name: string;
      last_name: string;
      email: string;
      order_number: string;
      reason_for_contact: string;
      message: string;
      inspirational_pictures: string;
      artist_name: string;
      instagram_handle: string;
      facebook_name: string;
      song_id: string;
      quote: string;
    },
    thunkApi: any
  ) => {
    try {
      const { data } = await axios.post("/api/emails/contact", contact_info);
      axios.post("/api/emails/contact_confirmation", contact_info);
      return data;
    } catch (error) {}
  }
);
