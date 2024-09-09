import React from "react";
import { Box, Typography } from "@mui/material";

const EventTitle = ({ event }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
      <img
        src="/images/optimized_images/logo_images/glow_leds_text_logo.png"
        alt="Space City Logo"
        style={{
          width: "50px",
          height: "auto",
          marginBottom: "20px",
        }}
      />
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#ffffff",
          textShadow: "0 0 10px #fff",
          marginBottom: "10px",
        }}
      >
        {event.name.toUpperCase().split(" ")[0]} {event.name.toUpperCase().split(" ")[1]}
      </Typography>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#ffffff",
          textShadow: "0 0 10px #fff",
          marginBottom: "10px",
        }}
      >
        {event.name.toUpperCase().split(" ")[2]} {event.name.toUpperCase().split(" ")[3]}
      </Typography>
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: "#ffffff",
          textShadow: "0 0 10px #fff",
          marginBottom: "10px",
        }}
      >
        {event.address.city}, {event.address.state}
      </Typography>
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: "#ffffff",
          textShadow: "0 0 10px #fff",
        }}
      >
        {new Date(event.start_date).getFullYear()}
      </Typography>
    </Box>
  );
};

export default EventTitle;
