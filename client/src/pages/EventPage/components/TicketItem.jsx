import React from "react";
import { Box, Typography, Button, useMediaQuery, useTheme, lighten } from "@mui/material";
import DateBox from "./DateBox";

const TicketItem = ({ ticket, event, onSelectTicket, ticketColors }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      key={ticket._id}
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "stretch" : "center",
        marginBottom: "16px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "4px",
        padding: "16px",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          transform: "translateY(-5px)",
        },
      }}
      gap={2}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: isSmallScreen ? "center" : "flex-start",
          width: isSmallScreen ? "100%" : "auto",
          marginBottom: isSmallScreen ? 2 : 0,
        }}
      >
        <DateBox startDate={event.start_date} endDate={event.end_date} color={ticket.color} />
        {ticket.image?.link ? (
          <Box sx={{ display: "flex", alignItems: "center", height: 80 }}>
            <img src={ticket.image?.link} alt={ticket.title} style={{ width: 80, height: 80, borderRadius: "10px" }} />
          </Box>
        ) : (
          <Box
            sx={{
              width: 120,
              height: 80,
              background: `linear-gradient(180deg, ${lighten(ticket.color || "#999999", 0.3)} 30%, ${ticket.color || "#999999"} 90%)`,
              display: "flex",
              alignItems: "center",
              fontSize: "5rem",
              justifyContent: "center",
              borderRadius: "10px",
              marginRight: isSmallScreen ? 0 : "16px",
              color: "white",
              fontWeight: "1000",
              boxShadow: `0 0 15px ${ticket.color || "#999999"}`,
            }}
          >
            {ticket.ticket_type.slice(0, 2).toUpperCase()}
          </Box>
        )}
      </Box>
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{ marginBottom: isSmallScreen ? 2 : 0 }}
      >
        <Typography variant="subtitle1" color="white">
          {ticket.title}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption" color="white" sx={{ mt: 1 }}>
            at {event.venue}
          </Typography>
          <Typography variant="caption" color="white" sx={{ mt: 1 }}>
            Ages {event.age_group} Only
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: isSmallScreen ? "100%" : "auto" }}>
        <Button
          variant="contained"
          onClick={() => onSelectTicket(ticket)}
          sx={{
            background: `linear-gradient(90deg, ${ticketColors?.join(", ")})`,
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: isSmallScreen ? "100%" : 150,
            fontSize: "1.5rem",
          }}
        >
          Select Ticket
        </Button>
      </Box>
    </Box>
  );
};

export default TicketItem;
