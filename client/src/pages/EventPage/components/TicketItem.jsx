import React from "react";
import { Box, Typography, Button, useMediaQuery, useTheme, lighten } from "@mui/material";

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
        <Box
          sx={{
            width: 80,
            height: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            marginRight: "16px",
            color: "white",
            fontWeight: "bold",
            boxShadow: `0 0 15px ${ticket.color || "#999999"}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.25rem",
              lineHeight: 1,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              paddingTop: "5px",
              paddingBottom: "2px",
              textAlign: "center",
            }}
          >
            {new Date(event.start_date).toLocaleString("default", { month: "short" }).toUpperCase()}
          </Typography>
          <Typography variant="h5" sx={{ fontSize: "3rem", lineHeight: 1 }}>
            {new Date(event.start_date).getDate()}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: "1.25rem", lineHeight: 1 }}>
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][new Date(event.start_date).getDay()]}
          </Typography>
        </Box>
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
        <Typography variant="caption" color="white" sx={{ mt: 1 }}>
          at {event.venue}
        </Typography>
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
