import React from "react";
import { Box, Typography, Button, useMediaQuery, useTheme, lighten, IconButton } from "@mui/material";
import DateBox from "./DateBox";
import { open_edit_ticket_modal } from "../../../slices/ticketSlice";
import { useDispatch, useSelector } from "react-redux";
import { Edit } from "@mui/icons-material";

const TicketItem = ({ ticket, event, onSelectTicket, ticketColors }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const isSoldOut = ticket.count_in_stock === 0;

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
          backgroundColor: isSoldOut ? "none" : "rgba(255, 255, 255, 0.2)",
          transform: isSoldOut ? "none" : "translateY(-5px)",
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
          {ticket.title} {isSoldOut && `- Sold Out`}
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
        {!isSoldOut ? (
          <Button
            variant="contained"
            onClick={() => onSelectTicket(ticket)}
            disabled={isSoldOut}
            sx={{
              background: isSoldOut ? "grey" : `linear-gradient(90deg, ${ticketColors?.join(", ")})`,
              boxShadow: isSoldOut ? "none" : "0 3px 5px 2px rgba(255, 105, 135, .3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              width: isSmallScreen ? "100%" : 150,
              fontSize: "1.5rem",
            }}
          >
            {isSoldOut ? "Sold Out" : "Select Ticket"}
          </Button>
        ) : (
          <Typography
            variant="h6"
            sx={{ color: "white", fontWeight: "bold", width: isSmallScreen ? "100%" : 150, textAlign: "center" }}
          >
            SOLD OUT{" "}
          </Typography>
        )}
      </Box>
      {current_user?.isAdmin && (
        <Box mt={2} mb={2} display="flex" justifyContent="flex-end" gap={2}>
          <IconButton variant="contained" color="primary" onClick={() => dispatch(open_edit_ticket_modal(ticket))}>
            <Edit color="white" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default TicketItem;
