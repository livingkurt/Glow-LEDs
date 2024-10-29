import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_chip_modal, set_chip } from "../../../slices/chipSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { chipFormFields } from "./chipFormFields";

const EditChipModal = () => {
  const dispatch = useDispatch();
  const chipPage = useSelector(state => state.chips.chipPage);
  const { edit_chip_modal, chip, loading } = chipPage;

  const formFields = chipFormFields({
    chip,
    dispatch,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_chip_modal}
        onConfirm={() => {
          dispatch(API.saveChip(chip));
        }}
        onCancel={() => {
          dispatch(set_edit_chip_modal(false));
        }}
        title="Edit Chip"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm formData={formFields} state={chip} onChange={value => dispatch(set_chip(value))} loading={loading} />
      </GLActionModal>
    </div>
  );
};

export default EditChipModal;
