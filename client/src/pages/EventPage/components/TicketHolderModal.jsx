import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, darken, Paper, Typography } from "@mui/material";
import * as API from "../../../api";
import GLTableV2 from "../../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

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
    { title: "Quantity", display: "quantity", sortable: true },
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
      <Box sx={{ maxWidth: "500px", mb: 2, margin: "auto" }}>
        <Typography variant="h6" gutterBottom sx={{ m: 2 }}>
          {"Ticket Sales Summary"}
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{"Ticket Type"}</TableCell>
                <TableCell>{"Sold"}</TableCell>
                <TableCell>{"Remaining"}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allTickets.map(ticket => (
                <TableRow key={ticket._id}>
                  <TableCell>{ticket.ticket_type}</TableCell>
                  <TableCell>
                    {ticketHolders
                      .filter(holder => holder.ticketType === ticket.ticket_type)
                      .reduce((acc, curr) => acc + curr.quantity, 0)}
                  </TableCell>
                  <TableCell>{ticket.count_in_stock}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <strong>{"Total"}</strong>
                </TableCell>
                <TableCell>
                  <strong>{ticketHolders.reduce((acc, curr) => acc + curr.quantity, 0)}</strong>
                </TableCell>
                <TableCell>
                  <strong>{allTickets.reduce((acc, ticket) => acc + ticket.count_in_stock, 0)}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <GLTableV2
          rows={ticketHolders || []}
          columnDefs={columnDefs}
          availableFiltersProp={{ ticketType: ["Competitor", "Spectator", "Backup Competitor"] }}
          nonTagFilters={["ticketType"]}
          filters={["ticketType"]}
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
