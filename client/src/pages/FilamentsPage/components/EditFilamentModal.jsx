import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_filament_modal, set_filament } from "../../../slices/filamentSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { filamentFormFields } from "../filamentHelpers";
import { useTagsQuery } from "../../../api/allRecordsApi";

const EditFilamentModal = () => {
  const dispatch = useDispatch();
  const filamentPage = useSelector(state => state.filaments.filamentPage);
  const { edit_filament_modal, filament, loading } = filamentPage;

  const { data: tags, isLoading: tagsLoading } = useTagsQuery();

  const formFields = filamentFormFields({ tags: tagsLoading ? [] : tags });

  return (
    <div>
      <GLActionModal
        isOpen={edit_filament_modal}
        onConfirm={() => {
          dispatch(API.saveFilament({ ...filament }));
        }}
        onCancel={() => {
          dispatch(set_edit_filament_modal(false));
        }}
        title="Edit Filament"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={filament}
          onChange={value => dispatch(set_filament(value))}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditFilamentModal;
