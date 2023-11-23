/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const updateVersion = async () => {
  try {
    const { data } = await axios.put(`/api/versions/increment`);
    store.dispatch(
      showSuccess({
        message: `Version updated to ${data.version}`,
      })
    );
    return data;
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const getEnvironment = createAsyncThunk("glowLeds/getEnvironment", async () => {
  try {
    const { data } = await axios.get(`/api/versions/environment`);
    console.log({ data });
    return data;
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
});
