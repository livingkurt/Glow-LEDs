import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_tag_modal, set_tag } from "../../../slices/tagSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { tagFormFields } from "./tagFormFields";

const EditTagModal = () => {
  const dispatch = useDispatch();
  const tagPage = useSelector(state => state.tags.tagPage);
  const { edit_tag_modal, tag, loading } = tagPage;

  const formFields = tagFormFields();

  return (
    <div>
      <GLActionModal
        isOpen={edit_tag_modal}
        onConfirm={() => {
          dispatch(API.saveTag({ ...tag, volume: tag.length * tag.width * tag.height }));
        }}
        onCancel={() => {
          dispatch(set_edit_tag_modal(false));
        }}
        title="Edit Tag"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={tag}
          onChange={value => {
            dispatch(set_tag(value));
          }}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditTagModal;
