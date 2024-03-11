import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeConfirm } from "../../../slices/snackbarSlice";

const GLConfirmModal = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(state => state.snackbar);
  const { confirmModal, confirmTitle, confirmMessage, onConfirm, onClose, confirmInputLabel } = snackbar;
  const [inputText, setInputText] = useState("");

  const handleConfirm = () => {
    dispatch(closeConfirm(false));
    onConfirm(inputText);
  };

  const handleClose = () => {
    dispatch(closeConfirm(false));
    if (onClose) {
      onClose(inputText);
    }
  };

  return (
    <Dialog open={confirmModal} onClose={() => handleClose()} maxWidth="md">
      <DialogTitle>{confirmTitle}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {confirmMessage && (
            <Grid item xs={12}>
              <DialogContentText>{confirmMessage}</DialogContentText>
            </Grid>
          )}

          {confirmInputLabel && (
            <Grid item xs={12} mt={2}>
              <TextField
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                label={confirmInputLabel}
                fullWidth
                multiline
                style={{ width: 800 }}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          No
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GLConfirmModal;
