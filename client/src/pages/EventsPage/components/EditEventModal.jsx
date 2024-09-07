import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_event_modal, set_event } from "../../../slices/eventSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { eventFormFields } from "./eventFormFields";

const EditEventModal = () => {
  const dispatch = useDispatch();
  const eventPage = useSelector(state => state.events.eventPage);
  const { edit_event_modal, event, loading } = eventPage;

  const formFields = eventFormFields();

  return (
    <div>
      <GLActionModal
        isOpen={edit_event_modal}
        onConfirm={() => {
          dispatch(API.saveEvent(event));
        }}
        onCancel={() => {
          dispatch(set_edit_event_modal(false));
        }}
        title={"Edit Event"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm formData={formFields} state={event} onChange={value => dispatch(set_event(value))} loading={loading} />
      </GLActionModal>
    </div>
  );
};

export default EditEventModal;
