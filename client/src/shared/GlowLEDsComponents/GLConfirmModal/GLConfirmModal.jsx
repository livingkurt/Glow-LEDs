import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeConfirm } from "../../../slices/snackbarSlice";

const GLConfirmModal = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(state => state.snackbar);
  const { confirmModal, confirmTitle, confirmMessage, onConfirm } = snackbar;

  return (
    <Dialog open={confirmModal} onClose={() => dispatch(closeConfirm(false))}>
      <DialogTitle>{confirmTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{confirmMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeConfirm(false))} color="primary">
          No
        </Button>
        <Button
          onClick={() => {
            dispatch(closeConfirm(false));
            onConfirm();
          }}
          color="primary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GLConfirmModal;
