import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_filament_modal, set_filament } from "../../../slices/filamentSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { filamentFormFields } from "../filamentHelpers";

const EditFilamentModal = () => {
  const dispatch = useDispatch();
  const filamentPage = useSelector(state => state.filaments.filamentPage);
  const { edit_filament_modal, filament, loading } = filamentPage;
  const categoryPage = useSelector(state => state.categorys.categoryPage);
  const { categorys } = categoryPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ active: true }));
      dispatch(API.listCategorys({ type: "filament_tags" }));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, filament._id]);

  const formFields = filamentFormFields({ categorys });

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
