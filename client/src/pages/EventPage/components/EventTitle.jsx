import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const EventTitle = ({ event }) => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
      <img
        src="/images/optimized_images/logo_images/glow_leds_text_logo.png"
        alt="Space City Logo"
        style={{
          width: "50px",
          height: "auto",
        }}
      />
      <Typography
        fontFamily={theme.typography.fontFamily}
        align="center"
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "#ffffff",
          textShadow: "0 0 10px #fff",
          fontSize: {
            xs: "50px",
            sm: "72px",
            md: "96px",
          },
        }}
      >
        {event.name.split(" ")[0]} {event.name.split(" ")[1]}
      </Typography>
      <Typography
        fontFamily={theme.typography.fontFamily}
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#ffffff",
          textTransform: "uppercase",
          textShadow: "0 0 10px #fff",
          fontSize: {
            xs: "25px",
            sm: "35px",
            md: "50px",
          },
        }}
      >
        {event.name.split(" ")[2]} {event.name.split(" ")[3]}
      </Typography>
      <Typography
        fontFamily={theme.typography.fontFamily}
        align="center"
        sx={{
          color: "#ffffff",
          textTransform: "uppercase",
          fontWeight: "bold",
          textShadow: "0 0 10px #fff",
          fontSize: {
            xs: "20px",
            sm: "30px",
            md: "40px",
          },
        }}
      >
        {event.address.city}, {event.address.state}
      </Typography>
      <Typography
        fontFamily={theme.typography.fontFamily}
        align="center"
        sx={{
          color: "#ffffff",
          textTransform: "uppercase",
          fontWeight: "bold",
          textShadow: "0 0 10px #fff",
          fontSize: {
            xs: "20px",
            sm: "30px",
            md: "40px",
          },
        }}
      >
        {new Date(event.start_date).getFullYear()}
      </Typography>
    </Box>
  );
};

export default EventTitle;
