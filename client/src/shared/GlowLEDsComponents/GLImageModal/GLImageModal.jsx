import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import GLLazyImage from "../GLLazyImage/GLLazyImage";

const GLImageModal = ({ open, onClose, selected_image }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <GLLazyImage src={selected_image} alt="Selected" style={{ width: 800, height: 1100 }} />
      </DialogContent>
    </Dialog>
  );
};

export default GLImageModal;
