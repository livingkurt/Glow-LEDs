import React from "react";
import { Box, lighten, Typography } from "@mui/material";

const TicketPrice = ({ ticket }) => {
  return (
    <Box
      key={ticket?._id}
      sx={{
        borderRadius: "8px",
        minWidth: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 175,
          height: 50,
          background: `linear-gradient(180deg, ${lighten(ticket.color || "#999999", 0.3)} 30%, ${ticket.color || "#999999"} 90%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          color: "white",
          fontWeight: "1000",
          boxShadow: `0 0 15px ${ticket?.color || "#999999"}`,
          marginBottom: "8px",
        }}
      >
        <Typography variant="h5">{ticket?.ticket_type}</Typography>
      </Box>
      <Typography variant="h4" color="white" fontWeight="bold" align="center">
        ${ticket?.price}
      </Typography>
    </Box>
  );
};

export default TicketPrice;
