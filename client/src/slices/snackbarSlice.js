import { createSlice } from "@reduxjs/toolkit";

const snackbarPage = createSlice({
  name: "snackbarPage",
  initialState: {
    open: false,
    confirmModal: false,
    message: "",
    severity: "success",
    horizontal: "center",
    vertical: "top",
    duration: 4000,
    loading: false,
    error: "",
    confirmMessage: "",
    confirmTitle: "",
    onConfirm: () => {},
    onClose: () => {},
    input: false,
  },
  reducers: {
    showSuccess: (state, { payload }) => {
      state.open = true;
      state.message = payload.message;
      state.duration = payload.duration;
      state.loading = false;
      state.severity = "success";
    },
    showInfo: (state, { payload }) => {
      state.open = true;
      state.message = payload.message;
      state.duration = payload.duration;
      state.loading = false;
      state.severity = "info";
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
    showConfirm: (state, { payload }) => {
      state.confirmModal = true;
      state.confirmMessage = payload?.message;
      state.confirmTitle = payload?.title;
      state.confirmInputLabel = payload?.inputLabel;
      state.onConfirm = payload?.onConfirm;
      state.onClose = payload?.onClose;
      state.loading = false;
    },
    closeConfirm: (state, { payload }) => {
      state.confirmModal = false;
      state.message = "";
      state.loading = false;
    },
  },
});

export const {
  closeConfirm,
  setConfirmAction,
  hideSnackbar,
  showSuccess,
  showInfo,
  showError,
  startLoading,
  stopLoading,
  showConfirm,
} = snackbarPage.actions;
export default snackbarPage.reducer;
