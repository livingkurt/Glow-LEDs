import React from "react";
import { Box, Container } from "@mui/material";

const EventContainer = ({ children }) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #0f0c29, #0f0c29, #24243e)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 25% 60%, rgba(255, 100, 100, 0.3) 0%, rgba(255, 100, 100, 0) 40%), radial-gradient(circle at 75% 30%, rgba(100, 200, 255, 0.3) 0%, rgba(100, 200, 255, 0) 40%)",
          animation: "nebula 20s infinite alternate",
          mixBlendMode: "screen",
        },
        "@keyframes nebula": {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "100%": { transform: "scale(1.2) rotate(5deg)" },
        },
      }}
    >
      <Container maxWidth="lg">
        <Box>{children}</Box>
      </Container>
    </Box>
  );
};

export default EventContainer;
