import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const GLDisplayModal = ({ children, onClose, open, title }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="tutorial-modal" aria-describedby="tutorial-modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          maxWidth: "800px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          color: "#333333"
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "text.primary"
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" component="h2" align="center" mb={2} color="inherit">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default GLDisplayModal;
