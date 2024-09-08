import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import { Typography, Button, Container, Box, CircularProgress } from "@mui/material";

const EventPage = () => {
  const { pathname } = useParams();
  const dispatch = useDispatch();
  const { event, loading, tickets } = useSelector(state => state.events.eventPage);

  useEffect(() => {
    if (pathname) {
      dispatch(API.detailsEvent(pathname));
      dispatch(API.getEventTickets(pathname));
    }
  }, [dispatch, pathname]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!event.name) {
    return <Typography variant="h4">Event not found</Typography>;
  }

  const ticketColors = {
    "Competitor": "#ff6b6b",
    "Spectator": "#4ecdc4",
    "VIP": "#feca57",
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
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
        <Box sx={{ padding: "32px" }}>
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
              {event.name.toUpperCase()}
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
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            mb={4}
            sx={{
              borderRadius: "10px",
            }}
          >
            {tickets.map(ticket => (
              <Box
                key={ticket._id}
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
                    backgroundColor: ticketColors[ticket.ticket_type] || "#999999",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                    color: "white",
                    fontWeight: "1000",
                    boxShadow: `0 0 15px ${ticketColors[ticket.ticket_type] || "#999999"}`,
                    marginBottom: "8px",
                  }}
                >
                  <Typography variant="h5">{ticket.ticket_type}</Typography>
                </Box>
                <Typography variant="h4" color="white" fontWeight="bold" align="center">
                  ${ticket.price}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box my={4}>
            {tickets && tickets.length > 0 ? (
              tickets.map(ticket => (
                <Box
                  key={ticket._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
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
                      width: 90,
                      height: 80,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      marginRight: "16px",
                      color: "white",
                      fontWeight: "bold",
                      boxShadow: `0 0 15px ${ticketColors[ticket.ticket_type] || "#999999"}`,
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
                    <Typography variant="h5" sx={{ fontSize: "3rem", lineHeight: 1, margin: "2px 0" }}>
                      {new Date(event.start_date).getDate()}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: "1.25rem", lineHeight: 1 }}>
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][new Date(event.start_date).getDay()]}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 120,
                      height: 80,
                      backgroundColor: ticketColors[ticket.ticket_type] || "#999999",
                      display: "flex",
                      alignItems: "center",
                      // padding: "10px",
                      fontSize: "5rem",
                      justifyContent: "center",
                      borderRadius: "10px",
                      marginRight: "16px",
                      color: "white",
                      fontWeight: "1000",
                      boxShadow: `0 0 15px ${ticketColors[ticket.ticket_type] || "#999999"}`,
                    }}
                  >
                    {ticket.ticket_type.slice(0, 2).toUpperCase()}
                  </Box>
                  <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
                    <Typography variant="subtitle1" color="white">
                      {ticket.short_description}
                    </Typography>
                    <Typography variant="caption" color="white" sx={{ mt: 1 }}>
                      at {event.venue}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      sx={{
                        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "5px",
                        minHeight: "60px",
                        width: 150,
                        fontSize: "1.5rem",
                      }}
                    >
                      <span>Select</span>
                      <span>Tickets</span>
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body1" align="center" color="white">
                No tickets available for this event.
              </Typography>
            )}
          </Box>
          <Box mt={4}>
            <Typography variant="body2" align="center" color="white">
              Visit Glow-LEDs.com for more information
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EventPage;
