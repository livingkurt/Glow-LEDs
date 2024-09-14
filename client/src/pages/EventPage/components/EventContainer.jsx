import React from "react";
import { Box, Container } from "@mui/material";

const EventContainer = ({ children, event }) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #0f0c29, #0f0c29, #24243e)",
        backgroundImage: `url(${event?.background_image?.link})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <Container maxWidth="md" sx={{ mt: 2, position: "relative", zIndex: 1 }}>
        {children}
      </Container>
    </Box>
  );
};

export default EventContainer;
