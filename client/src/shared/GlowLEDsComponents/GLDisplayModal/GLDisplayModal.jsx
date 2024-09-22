import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GLIconButton from "../GLIconButton/GLIconButton";

const GLDisplayModal = ({ children, onClose, open, title, ...modalProps }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="tutorial-modal"
      aria-describedby="tutorial-modal-description"
      {...modalProps}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100vw",
          height: "800px",
          maxWidth: "1200px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          color: "#333333",
        }}
      >
        <GLIconButton
          tooltip="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "text.primary",
          }}
        >
          <CloseIcon color="white" />
        </GLIconButton>
        <Typography variant="h4" component="h2" align="center" mb={2} color="inherit">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default GLDisplayModal;
