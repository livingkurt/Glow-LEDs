import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_palette_modal, set_palette } from "../../../slices/paletteSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { paletteFormFields } from "./paletteFormFields";

const EditPaletteModal = () => {
  const dispatch = useDispatch();
  const palettePage = useSelector(state => state.palettes.palettePage);
  const { edit_palette_modal, palette, loading } = palettePage;
  const chipPage = useSelector(state => state.chips.chipPage);
  const { chips } = chipPage;
  const userPage = useSelector(state => state.users.userPage);
  const { users } = userPage;

  const formFields = paletteFormFields({
    chips,
    users,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_palette_modal}
        onConfirm={() => {
          dispatch(API.savePalette(palette));
        }}
        onCancel={() => {
          dispatch(set_edit_palette_modal(false));
        }}
        title="Edit Palette"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={palette}
          onChange={value => {
            dispatch(set_palette(value));
          }}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditPaletteModal;
