import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, darken, Typography } from "@mui/material";
import * as API from "../../../api";
import GLTableV2 from "../../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";

const TicketHoldersModal = ({ open, onClose, event, allTickets }) => {
  const dispatch = useDispatch();
  const { ticketHolders, loading } = useSelector(state => state.events.eventPage);

  useEffect(() => {
    if (open && event && (!ticketHolders || ticketHolders.length === 0)) {
      dispatch(API.getTicketHolders(event._id));
    }
  }, [dispatch, event, open, ticketHolders]);

  const columnDefs = [
    {
      title: "Order Date",
      display: row => new Date(row.orderDate).toLocaleDateString(),
      sortable: true,
    },
    {
      title: "Purchaser Name",
      display: row => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    { title: "Ticket Type", display: "ticketType", sortable: true },
  ];

  const determineTicketHolderColors = row => {
    console.log({ row });
    const ticket = allTickets.find(ticket => ticket.ticket_type === row.ticketType);

    return darken(ticket.color, 0.2);
  };

  return (
    <GLActionModal
      isOpen={open}
      onCancel={onClose}
      title={`Ticket Holders for ${event?.name}`}
      confirmLabel={null}
      confirmColor="secondary"
      cancelLabel="Close"
      cancelColor="secondary"
      maxWidth="lg"
    >
      {allTickets.map(ticket => (
        <Typography variant="h6" gutterBottom>
          {ticket.ticket_type} - {ticket.count_in_stock} left
        </Typography>
      ))}
      {loading ? (
        <CircularProgress />
      ) : (
        <GLTableV2
          rows={ticketHolders || []}
          columnDefs={columnDefs}
          tableName="Ticket Holders"
          namespace="ticketHolders"
          determineColor={determineTicketHolderColors}
          namespaceScope="events"
          loading={loading}
          defaultSorting={[0, "asc"]} // Sort by Order Date ascending by default
        />
      )}
    </GLActionModal>
  );
};

export default TicketHoldersModal;
