import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_ticket_modal, set_ticket } from "../../../slices/ticketSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { ticketFormFields } from "./ticketFormFields";
import { useEventsQuery, useTicketsQuery } from "../../../api/allRecordsApi";

const EditTicketModal = () => {
  const dispatch = useDispatch();
  const ticketPage = useSelector(state => state.tickets.ticketPage);
  const { edit_ticket_modal, ticket, loading } = ticketPage;

  const eventsQuery = useEventsQuery();
  const ticketsQuery = useTicketsQuery();

  const formFields = ticketFormFields({ eventsQuery, ticket, ticketsQuery });

  return (
    <div>
      <GLActionModal
        isOpen={edit_ticket_modal}
        onConfirm={() => {
          dispatch(API.saveTicket(ticket));
        }}
        onCancel={() => {
          dispatch(set_edit_ticket_modal(false));
        }}
        title={"Edit Ticket"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={ticket}
          onChange={value => dispatch(set_ticket(value))}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditTicketModal;
