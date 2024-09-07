import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_event_modal, set_event } from "../../../slices/eventSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { snake_case } from "../../../utils/helper_functions";
import { eventFormFields } from "./eventFormFields";

const EditEventModal = () => {
  const dispatch = useDispatch();
  const eventPage = useSelector(state => state.events.eventPage);
  const { edit_event_modal, event, loading } = eventPage;
  const { affiliate, title } = event;

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
  }, [dispatch, event._id]);

  const generate_pathname = () => {
    return affiliate ? snake_case(`${title} by ${affiliate.artist_name}`) : "";
  };

  const formFields = eventFormFields({ affiliates });

  return (
    <div>
      <GLActionModal
        isOpen={edit_event_modal}
        onConfirm={() => {
          dispatch(API.saveEvent({ ...event, affiliate: affiliate._id, pathname: generate_pathname() }));
          dispatch(API.listAffiliates({ active: true }));
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
        <GLForm
          formData={formFields}
          state={event}
          onChange={value => dispatch(set_event(value))}
          loading={loading && loading_affiliates}
        />
      </GLActionModal>
    </div>
  );
};

export default EditEventModal;
