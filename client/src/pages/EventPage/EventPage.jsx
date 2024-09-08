import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";

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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        {event.name}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Event Details
              </Typography>
              <Typography variant="body1" paragraph>
                {event.short_description}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Date:</strong> {new Date(event.start_date).toLocaleDateString()} -{" "}
                {new Date(event.end_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Location:</strong> {event.location}
              </Typography>
              <Typography variant="body1">
                <strong>Fun Fact:</strong> {event.fact}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Ticket Options
          </Typography>
          {tickets && tickets.length > 0 ? (
            tickets.map(ticket => (
              <Card key={ticket._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {ticket.ticket_type}
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
                    ${ticket.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {ticket.short_description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="primary">
                    Purchase Ticket
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No tickets available for this event.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventPage;
