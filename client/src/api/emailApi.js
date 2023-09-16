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

export const listEmails = createAsyncThunk("emails/listEmails", async (query, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/emails?${create_query(query)}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveEmail = createAsyncThunk("emails/saveEmail", async (email, thunkApi) => {
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

export const detailsEmail = createAsyncThunk("emails/detailsEmail", async (id, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/emails/${id}`);
    thunkApi.dispatch(showSuccess({ message: `Email Found` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteEmail = createAsyncThunk("emails/deleteEmail", async (pathname, thunkApi) => {
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
      first_name;
      last_name;
      email;
      order_number;
      reason_for_contact;
      message;
      inspirational_pictures;
      artist_name;
      instagram_handle;
      facebook_name;
      song_id;
      quote;
    },
    thunkApi
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
  async ({ template }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/view_announcement", { template });
      thunkApi.dispatch(showSuccess({ message: `Preview Updated` }));
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
    }
  }
);
export const sendAnnouncement = createAsyncThunk(
  "emails/sendAnnouncement",
  async ({ template, subject, test, time }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/announcement", {
        template,
        subject,
        test,
        time,
      });
      thunkApi.dispatch(showSuccess({ message: `${test && "Test "}Emails Sent` }));
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
    }
  }
);

export const sendEmailSubscription = createAsyncThunk(
  "emails/sendEmailSubscription",
  async ({ email, promo_code }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/email_subscription", { email, promo_code });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// Similarly for other routes
export const sendOrderEmail = createAsyncThunk(
  "emails/sendOrderEmail",
  async ({ order, subject, email }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/order", { order, subject, email });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const sendRefundEmail = createAsyncThunk(
  "emails/sendRefundEmail",
  async ({ order, subject, email }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/refund", { order, subject, email });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// send_order_status_email
export const sendOrderStatusEmail = createAsyncThunk(
  "emails/sendOrderStatusEmail",
  async ({ order, subject, email, status, message_to_user }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/order_status", {
        order,
        subject,
        email,
        status,
        message_to_user,
      });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const sendAffiliateEmail = createAsyncThunk(
  "emails/sendAffiliateEmail",
  async ({ affiliate, subject, email }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/affiliate", { affiliate, subject, email });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// send_code_used_emails_a
export const sendCodeUsedEmailsA = createAsyncThunk("emails/sendCodeUsedEmailsA", async (promo_code, thunkApi) => {
  try {
    const { data } = await axios.post("/api/emails/code_used/" + promo_code);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

// send_feature_email
export const sendFeatureEmail = createAsyncThunk(
  "emails/sendFeatureEmail",
  async ({ feature, subject, email }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/feature", { feature, subject, email });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// send_contact
export const sendContact = createAsyncThunk("emails/sendContact", async ({ email, promo_code }, thunkApi) => {
  try {
    const { data } = await axios.post("/api/emails/contact", { email, promo_code });
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

// send_custom_contact_email
export const sendCustomContactEmail = createAsyncThunk(
  "emails/sendCustomContactEmail",
  async ({ order, email }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/custom_contact", { order, email });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// send_contact_confirmation
export const sendContactConfirmation = createAsyncThunk(
  "emails/sendContactConfirmation",
  async ({ email, promo_code }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/contact_confirmation", { email, promo_code });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// send_verify_email_password_reset
export const sendPasswordReset = createAsyncThunk(
  "emails/sendPasswordReset",
  async ({ email, promo_code }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/reset_password", { email, promo_code });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// send_successful_password_reset
export const sendResetPassword = createAsyncThunk(
  "emails/sendResetPassword",
  async ({ email, promo_code }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/reset_password", { email, promo_code });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// send_verified
export const resendVerification = createAsyncThunk("emails/resendVerification", async ({ email }, thunkApi) => {
  try {
    const { data } = await axios.post("/api/emails/verify", { email });
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

// send_announcement_email
export const sendAnnouncementEmail = createAsyncThunk(
  "emails/sendAnnouncementEmail",
  async ({ template, subject, test, time }, thunkApi) => {
    try {
      const { data } = await axios.post("/api/emails/announcement", {
        template,
        subject,
        test,
        time,
      });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const sendEmail = createAsyncThunk("emails/sendEmail", async ({ template, subject, email }, thunkApi) => {
  try {
    const { data } = await axios.post("/api/emails/send_email", { template, subject, email });
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

// save_html
export const saveHtml = createAsyncThunk(
  "emails/saveHtml",
  async ({ template, email, access_token }, thunkApi) => {
    try {
      email = { ...email, html: template };
      const { data } = await axios.put(`/api/emails/${email._id}`, email, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return data;
    } catch (error) {
      thunkApi.dispatch(showError({ message: errorMessage(error) }));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// print_invoice
export const printInvoice = createAsyncThunk("emails/printInvoice", async (order, thunkApi) => {
  try {
    const { data } = await axios.post("/api/emails/invoice", order);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

// get_email
export const getEmail = createAsyncThunk("emails/getEmail", async (email_id, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/emails/${email_id}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

// get_last_active_email
export const getLastActiveEmail = createAsyncThunk("emails/getLastActiveEmail", async (_, thunkApi) => {
  try {
    const query = create_query({ active: true, sort: "newest", limit: 1 });
    const { data } = await axios.get(`/api/emails/?${query}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

// get_content
export const getContent = createAsyncThunk("emails/getContent", async (content_id, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/contents/${content_id}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
