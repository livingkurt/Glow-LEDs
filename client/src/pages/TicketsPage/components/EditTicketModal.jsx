import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_ticket_modal, set_ticket } from "../../../slices/ticketSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { snake_case } from "../../../utils/helper_functions";
import { ticketFormFields } from "./ticketFormFields";

const EditTicketModal = () => {
  const dispatch = useDispatch();
  const ticketPage = useSelector(state => state.tickets.ticketPage);
  const { edit_ticket_modal, ticket, loading } = ticketPage;
  const { affiliate, title } = ticket;

  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliates, loading: loading_affiliates } = affiliatePage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ active: true }));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, ticket._id]);

  const generate_pathname = () => {
    return affiliate ? snake_case(`${title} by ${affiliate.artist_name}`) : "";
  };

  const formFields = ticketFormFields({ affiliates });

  return (
    <div>
      <GLActionModal
        isOpen={edit_ticket_modal}
        onConfirm={() => {
          dispatch(API.saveTicket({ ...ticket, affiliate: affiliate._id, pathname: generate_pathname() }));
          dispatch(API.listAffiliates({ active: true }));
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
          loading={loading && loading_affiliates}
        />
      </GLActionModal>
    </div>
  );
};

export default EditTicketModal;
