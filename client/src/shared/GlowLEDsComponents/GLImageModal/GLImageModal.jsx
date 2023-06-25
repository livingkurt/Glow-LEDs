import { Dialog, DialogContent } from "@mui/material";
import React from "react";

const GLImageModal = ({ open, onClose, selected_image }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <img src={selected_image} alt="Selected" style={{ width: 800, height: 1100 }} />
      </DialogContent>
    </Dialog>
  );
};

export default GLImageModal;
