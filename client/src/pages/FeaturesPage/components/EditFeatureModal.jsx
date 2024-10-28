import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_feature_modal, set_feature } from "../../../slices/featureSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { featureFormFields } from "./featureFormFields";

const EditFeatureModal = () => {
  const dispatch = useDispatch();
  const featurePage = useSelector(state => state.features.featurePage);
  const { edit_feature_modal, feature, loading } = featurePage;
  const userPage = useSelector(state => state.users.userPage);
  const { users } = userPage;

  const formFields = featureFormFields({
    users,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_feature_modal}
        onConfirm={() => {
          dispatch(API.saveFeature(feature));
        }}
        onCancel={() => {
          dispatch(set_edit_feature_modal(false));
        }}
        title="Edit Feature"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={feature}
          onChange={value => {
            dispatch(set_feature(value));
          }}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditFeatureModal;
