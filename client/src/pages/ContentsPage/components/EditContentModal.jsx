import { useDispatch, useSelector } from "react-redux";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_content_modal, set_content } from "../../../slices/contentSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { contentFormFields } from "./contentFormFields";

const EditContentModal = () => {
  const dispatch = useDispatch();
  const contentPage = useSelector(state => state.contents.contentPage);
  const { edit_content_modal, content, loading } = contentPage;

  const formFields = contentFormFields({
    content,
    dispatch,
  });

  return (
    <div>
      <GLActiionModal
        isOpen={edit_content_modal}
        onConfirm={() => {
          dispatch(API.saveContent(content));
        }}
        onCancel={() => {
          dispatch(set_edit_content_modal(false));
        }}
        title={"Edit Content"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={content}
          onChange={value => {
            dispatch(set_content(value));
          }}
          loading={loading}
        />
      </GLActiionModal>
    </div>
  );
};

export default EditContentModal;
