/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const getEmails = async ({
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
    return await axios.get(`/api/emails/table`, {
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

export const getEmailFilters = async () => {
  const { data } = await axios.get(`/api/emails/filters`);
  return data;
};

export const listEmails = createAsyncThunk("emails/listEmails", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/emails?${create_query(query)}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveEmail = createAsyncThunk("emails/saveEmail", async (email: any, thunkApi: any) => {
  try {
    if (!email._id) {
      const { data } = await axios.post("/api/emails", email);
      thunkApi.dispatch(showSuccess({ message: `Email Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/emails/${email._id}`, email);
      thunkApi.dispatch(showSuccess({ message: `Email Updated` }));
      return data;
    }
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsEmail = createAsyncThunk("emails/detailsEmail", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/emails/${id}`);
    thunkApi.dispatch(showSuccess({ message: `Email Found` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteEmail = createAsyncThunk("emails/deleteEmail", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/emails/" + pathname);
    thunkApi.dispatch(showSuccess({ message: `Email Deleted` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
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
      thunkApi.dispatch(showSuccess({ message: `Contact Email Sent` }));
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
    }
  }
);
export const viewAnnouncement = createAsyncThunk(
  "emails/viewAnnouncement",
  async ({ template }: any, thunkApi: any) => {
    try {
      const { data } = await axios.post("/api/emails/view_announcement", { template });
      thunkApi.dispatch(showSuccess({ message: `Preview Updated` }));
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
    }
  }
);

// export const emailApi = createApi({
//   reducerPath: "emailApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api/emails" }),
//   endpoints: builder => ({
//     viewAnnouncement: builder.query({
//       query: () => "/view_announcement",
//     }),
//   }),
// });

// export const { useViewAnnouncementQuery } = emailApi;
