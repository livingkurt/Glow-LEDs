import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_parcel_modal, set_parcel } from "../../../slices/parcelSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { parcelFormFields } from "./parcelFormFields";

const EditParcelModal = () => {
  const dispatch = useDispatch();
  const parcelPage = useSelector(state => state.parcels.parcelPage);
  const { edit_parcel_modal, parcel, loading } = parcelPage;

  const formFields = parcelFormFields();

  return (
    <div>
      <GLActionModal
        isOpen={edit_parcel_modal}
        onConfirm={() => {
          dispatch(API.saveParcel({ ...parcel, volume: parcel.length * parcel.width * parcel.height }));
        }}
        onCancel={() => {
          dispatch(set_edit_parcel_modal(false));
        }}
        title={"Edit Parcel"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={parcel}
          onChange={value => {
            dispatch(set_parcel(value));
          }}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditParcelModal;
