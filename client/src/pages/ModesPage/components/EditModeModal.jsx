import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_mode_modal, set_mode } from "../../../slices/modeSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { modeFormFields } from "./modeFormFields";
import { useAffiliatesQuery, useMicrolightsQuery, useUsersQuery } from "../../../api/allRecordsApi";

const EditModeModal = () => {
  const dispatch = useDispatch();
  const modePage = useSelector(state => state.modes.modePage);
  const { edit_mode_modal, mode, loading } = modePage;
  const { data: microlights, isLoading: microlightsLoading } = useMicrolightsQuery();
  const { data: users, isLoading: usersLoading } = useUsersQuery();
  const { data: affiliates, isLoading: affiliatesLoading } = useAffiliatesQuery();

  const formFields = modeFormFields({
    mode,
    microlights: microlightsLoading ? [] : microlights,
    dispatch,
    users: usersLoading ? [] : users,
    affiliates: affiliatesLoading ? [] : affiliates,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_mode_modal}
        onConfirm={() => {
          console.log({ mode });
          dispatch(API.saveMode(mode));
        }}
        onCancel={() => {
          dispatch(set_edit_mode_modal(false));
        }}
        title="Edit Mode"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm formData={formFields} state={mode} onChange={value => dispatch(set_mode(value))} loading={loading} />
      </GLActionModal>
    </div>
  );
};

export default EditModeModal;
