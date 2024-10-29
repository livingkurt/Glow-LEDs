import React, { useState, useEffect, useRef } from "react";
import { Box, lighten, Typography } from "@mui/material";

const TicketPrice = ({ ticket, tickets }) => {
  const [maxWidth, setMaxWidth] = useState(0);
  const textRef = useRef(null);

  useEffect(() => {
    const updateMaxWidth = () => {
      const elements = document.querySelectorAll(".ticket-type-text");
      const widths = Array.from(elements).map(el => el.offsetWidth);
      const newMaxWidth = Math.max(...widths);
      setMaxWidth(newMaxWidth);
    };

    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);

    return () => window.removeEventListener("resize", updateMaxWidth);
  }, [tickets]);

  return (
    <Box
      sx={{
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: maxWidth > 0 ? `${maxWidth + 40}px` : "auto", // Add some padding
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
          transition: "width 0.3s ease", // Smooth transition for width changes
        }}
      >
        <Typography variant="h5" className="ticket-type-text" ref={textRef}>
          {ticket?.ticket_type}
        </Typography>
      </Box>
      <Typography variant="h4" color="white" fontWeight="bold" align="center">
        {"$"}
        {ticket?.price}
      </Typography>
    </Box>
  );
};

export default TicketPrice;
