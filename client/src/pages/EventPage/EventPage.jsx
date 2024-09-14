import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import { Typography, Box, CircularProgress, Button, Paper, Link } from "@mui/material";
import TicketItem from "./components/TicketItem";
import TicketModal from "./components/TicketModal";
import EventContainer from "./components/EventContainer";
import TicketPrice from "./components/TicketPrice";
import EventTitle from "./components/EventTitle";
import TicketScanner from "./components/TicketScanner";
import { EditEventModal } from "../EventsPage/components";
import { open_edit_event_modal } from "../../slices/eventSlice";

const EventPage = () => {
  const { pathname } = useParams();
  const dispatch = useDispatch();
  const { event, loading } = useSelector(state => state.events.eventPage);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openScannerModal, setOpenScannerModal] = useState(false);

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  useEffect(() => {
    if (pathname) {
      dispatch(API.detailsEvent(pathname));
    }
  }, [dispatch, pathname]);

  const handleOpenModal = ticket => {
    setSelectedTicket(ticket);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTicket(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    dispatch(
      API.addToCart({
        cart: my_cart,
        cartItem: {
          itemType: "ticket",
          ticket: selectedTicket._id,
          quantity: quantity,
          max_display_quantity: selectedTicket.max_display_quantity,
          max_quantity: selectedTicket.max_quantity,
          price: selectedTicket.price,
          name: selectedTicket.title,
          color: selectedTicket.color,
          finite_stock: true,
          ticket_type: selectedTicket.ticket_type,
          display_image_object: selectedTicket.image,
          count_in_stock: selectedTicket.count_in_stock,
        },
        type: "add_to_cart",
      })
    );
    handleCloseModal();
  };

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
    <EventContainer event={event}>
      {current_user?.isAdmin && (
        <Box mt={2} mb={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="primary" onClick={() => dispatch(open_edit_event_modal(event))}>
            Edit Event
          </Button>
          <Button variant="contained" color="primary" onClick={() => setOpenScannerModal(true)}>
            Scan Tickets
          </Button>
        </Box>
      )}
      <Box>
        <EventTitle event={event} />

        <Box
          display="flex"
          justifyContent="center"
          gap={2}
          flexWrap="wrap"
          sx={{
            borderRadius: "10px",
          }}
        >
          {event.tickets?.map(ticket => (
            <TicketPrice key={ticket._id} ticket={ticket} />
          ))}
        </Box>
        <Paper sx={{ backgroundColor: "transparent", padding: "10px", borderRadius: "10px" }}>
          <Typography variant="subtitle1" textAlign="center" gutterBottom sx={{ mt: 2, color: "white" }}>
            Follow us at{" "}
            <Link href={event.social_media_url} target="_blank" rel="noopener noreferrer" sx={{ color: "white" }}>
              {event.social_media_handle}
            </Link>{" "}
            on {event.social_media_type} to get the latest updates
          </Typography>
          <Box my={4}>
            {event.tickets && event.tickets.length > 0 ? (
              event.tickets.map(ticket => (
                <TicketItem
                  key={ticket._id}
                  ticket={ticket}
                  event={event}
                  onSelectTicket={ticket => handleOpenModal(ticket)}
                  ticketColors={event.tickets.map(ticket => ticket.color)}
                />
              ))
            ) : (
              <Typography variant="body1" align="center" color="white">
                No tickets available for this event.
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
      <TicketModal
        open={openModal}
        onClose={handleCloseModal}
        selectedTicket={selectedTicket}
        event={event}
        quantity={quantity}
        setQuantity={setQuantity}
        onAddToCart={handleAddToCart}
      />

      <TicketScanner openScannerModal={openScannerModal} setOpenScannerModal={setOpenScannerModal} event={event} />
      <EditEventModal />
    </EventContainer>
  );
};

export default EventPage;
