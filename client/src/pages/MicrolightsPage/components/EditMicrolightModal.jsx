import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_microlight_modal, set_microlight } from "../../../slices/microlightSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { microlightFormFields } from "./microlightFormFields";
import { useTagsQuery } from "../../../api/allRecordsApi";

const EditMicrolightModal = () => {
  const dispatch = useDispatch();
  const microlightPage = useSelector(state => state.microlights.microlightPage);
  const { edit_microlight_modal, microlight, loading } = microlightPage;
  const { data: tags, isLoading: tagsLoading } = useTagsQuery();

  const formFields = microlightFormFields({
    microlight,
    tags: tagsLoading ? [] : tags,
    dispatch,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_microlight_modal}
        onConfirm={() => {
          dispatch(API.saveMicrolight(microlight));
        }}
        onCancel={() => {
          dispatch(set_edit_microlight_modal(false));
        }}
        title="Edit Microlight"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={microlight}
          onChange={value => dispatch(set_microlight(value))}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditMicrolightModal;
