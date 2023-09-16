import { createSlice } from "@reduxjs/toolkit";

const snackbarPage = createSlice({
  name: "snackbarPage",
  initialState: {
    open: false,
    message: "",
    severity: "success",
    horizontal: "center",
    vertical: "top",
    duration: 4000,
    loading: false,
    error: "",
  },
  reducers: {
    showSuccess: (state, { payload }) => {
      state.open = true;
      state.message = payload.message;
      state.duration = payload.duration;
      state.loading = false;
      state.severity = "success";
    },
    showError: (state, { payload }) => {
      state.open = true;
      state.message = payload.message;
      state.duration = payload.duration;
      state.loading = false;
      state.severity = "error";
    },
    hideSnackbar: state => {
      state.open = false;
      state.message = "";
      state.severity = "";
    },
    startLoading: state => {
      state.loading = true;
    },
    stopLoading: state => {
      state.loading = false;
    },
  },
});

export const { hideSnackbar, showSuccess, showError, startLoading, stopLoading } = snackbarPage.actions;
export default snackbarPage.reducer;
