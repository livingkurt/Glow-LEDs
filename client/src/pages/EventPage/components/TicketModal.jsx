import React from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  lighten,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import { CalendarToday, LocationOn } from "@mui/icons-material";

const TicketModal = ({ open, onClose, selectedTicket, event, quantity, setQuantity, onAddToCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const formatEventDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formatOptions = {
      weekday: "short",
      month: "short",
      year: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    let formattedStart = start.toLocaleString("en-US", formatOptions);
    let formattedEnd = end.toLocaleString("en-US", formatOptions);

    // If the event is on the same day, don't repeat the date
    if (start.toDateString() === end.toDateString()) {
      formattedEnd = end.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
      return `${formattedStart} - ${formattedEnd}`;
    }

    return `${formattedStart} - ${formattedEnd}`;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="ticket-modal-title"
      aria-describedby="ticket-modal-description"
      style={{
        margin: "20px",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "#ffffff",
          color: "black",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
          p: 3,
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: "-10px", mb: 2, color: "black", fontSize: "2rem" }}>
          {"Event Details"}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {selectedTicket && (
          <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between">
            {selectedTicket.image?.link ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  maxWidth: 300,
                  height: 300,
                  margin: isMobile ? "0 auto" : "0 20px 0 0",
                }}
              >
                <img
                  src={selectedTicket.image?.link}
                  alt={selectedTicket.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 300,
                  height: 300,
                  background: `linear-gradient(180deg, ${lighten(selectedTicket.color || "#999999", 0.3)} 30%, ${selectedTicket.color || "#999999"} 90%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  mb: isMobile ? 2 : 0,
                  mr: isMobile ? 0 : 2,
                  margin: isMobile ? "0 auto" : "initial",
                }}
              >
                <Typography variant="h6" sx={{ color: "white", fontSize: "15rem" }}>
                  {selectedTicket.ticket_type.slice(0, 2).toUpperCase()}
                </Typography>
              </Box>
            )}
            <Box sx={{ flex: 1, mb: isMobile ? 2 : 0, mt: isMobile ? 2 : 0 }}>
              <Typography variant="subtitle1">{selectedTicket.title}</Typography>
              <Typography variant="body1" mb={1}>
                {"Ages "}
                {event.age_group} {"Only"}
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOn sx={{ marginRight: 1, color: "black" }} />
                <Typography variant="body1">
                  {"at "}
                  {event.venue}
                </Typography>
              </Box>
              <Typography variant="body2" ml={4}>
                {event.address.address_1} {event.address.address_2}
                {", "}
                {event.address.city}
                {", "}
                {event.address.state} {event.address.postalCode}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <CalendarToday sx={{ marginRight: 1, color: "black" }} />
                <Typography variant="body1">{formatEventDates(event.start_date, event.end_date)}</Typography>
              </Box>
            </Box>
            <Box sx={{ width: isMobile ? "100%" : "30%" }}>
              <Typography variant="subtitle1" sx={{ mb: 2, textAlign: isMobile ? "left" : "right" }}>
                {"Ticket Price: $"}
                {selectedTicket.price}
                <Typography variant="caption" sx={{ display: "block" }}>
                  {"+ service fees"}
                </Typography>
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="quantity-select-label">{"Quantity"}</InputLabel>
                <Select
                  labelId="quantity-select-label"
                  id="quantity-select"
                  value={quantity}
                  label="Quantity"
                  onChange={e => setQuantity(e.target.value)}
                >
                  {[...Array(selectedTicket.max_display_quantity).keys()].map(num => (
                    <MenuItem key={num} value={num + 1}>
                      {num + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                onClick={onAddToCart}
                variant="contained"
                fullWidth
                sx={{
                  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  py: 1.5,
                  fontSize: "1.5rem",
                }}
              >
                {"Add to Cart"}
              </Button>
            </Box>
          </Box>
        )}
        <Typography variant="body1" sx={{ mt: 2 }}>
          {selectedTicket?.short_description}
        </Typography>
      </Container>
    </Modal>
  );
};

export default TicketModal;
