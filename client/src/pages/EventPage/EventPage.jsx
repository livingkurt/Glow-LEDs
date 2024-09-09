import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import { Typography, Box, CircularProgress } from "@mui/material";
import TicketItem from "./components/TicketItem";
import TicketModal from "./components/TicketModal";
import EventContainer from "./components/EventContainer";
import TicketPrice from "./components/TicketPrice";
import EventTitle from "./components/EventTitle";

const EventPage = () => {
  const { pathname } = useParams();
  const dispatch = useDispatch();
  const { event, loading, tickets } = useSelector(state => state.events.eventPage);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;

  useEffect(() => {
    if (pathname) {
      dispatch(API.detailsEvent(pathname));
      dispatch(API.getEventTickets(pathname));
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
          price: selectedTicket.price,
          name: selectedTicket.title,
          color: selectedTicket.color,
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
          {tickets?.map(ticket => (
            <TicketPrice key={ticket._id} ticket={ticket} />
          ))}
        </Box>
        <Box my={4}>
          {tickets && tickets.length > 0 ? (
            tickets.map(ticket => (
              <TicketItem
                key={ticket._id}
                ticket={ticket}
                event={event}
                onSelectTicket={ticket => handleOpenModal(ticket)}
                ticketColors={tickets.map(ticket => ticket.color)}
              />
            ))
          ) : (
            <Typography variant="body1" align="center" color="white">
              No tickets available for this event.
            </Typography>
          )}
        </Box>
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
    </EventContainer>
  );
};

export default EventPage;
