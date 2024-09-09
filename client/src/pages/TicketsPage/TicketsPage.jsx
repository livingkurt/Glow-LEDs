import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_ticket_modal, open_edit_ticket_modal } from "../../slices/ticketSlice";
import { EditTicketModal } from "./components";
import * as API from "../../api";
import { Box, Button, Container } from "@mui/material";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

const TicketsPage = () => {
  const ticketPage = useSelector(state => state.tickets.ticketPage);
  const { loading, remoteVersionRequirement } = ticketPage;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Active",
        display: ticket => (
          <GLIconButton
            onClick={() => {
              dispatch(
                API.saveTicket({
                  ...ticket,
                  active: ticket.active ? false : true,
                })
              );
            }}
            tooltip={ticket.active ? "deactivate" : "activate"}
          >
            <GLBoolean boolean={ticket.active} />
          </GLIconButton>
        ),
      },
      { title: "Ticket Type", display: "ticket_type" },
      { title: "Price", display: ticket => `$${ticket.price}` },
      { title: "Event", display: ticket => ticket.event.name },
      {
        title: "",
        nonSelectable: true,
        display: ticket => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton
              tooltip="Edit"
              onClick={() => {
                dispatch(open_edit_ticket_modal(ticket));
              }}
            >
              <Edit color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteTicket(ticket.pathname))} tooltip="Delete">
              <Delete color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getTickets(options), []);
  const remoteReorderApi = useCallback(options => API.reorderTickets(options), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>Admin Tickets | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteReorderApi={remoteReorderApi}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType={"tickets/setRemoteVersionRequirement"}
        tableName={"Tickets"}
        namespaceScope="tickets"
        namespace="ticketTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect
        enableDragDrop
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_ticket_modal())}>
            Create Ticket
          </Button>
        }
      />
      <EditTicketModal />
    </Container>
  );
};
export default TicketsPage;
