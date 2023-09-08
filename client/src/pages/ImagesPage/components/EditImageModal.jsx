import { useDispatch, useSelector } from "react-redux";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_image_modal, set_image } from "../../../slices/imageSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";

const EditImageModal = () => {
  const dispatch = useDispatch();
  const imagePage = useSelector(state => state.images.imagePage);
  const { edit_image_modal, image, loading } = imagePage;

  const formFields = {
    link: {
      type: "text",
      label: "link",
    },
    album: {
      type: "text",
      label: "Album",
    },
  };

  return (
    <div>
      <GLActiionModal
        isOpen={edit_image_modal}
        onConfirm={() => {
          dispatch(API.saveImage(image));
          dispatch(API.listAffiliates({ active: true }));
        }}
        onCancel={() => {
          dispatch(set_edit_image_modal(false));
        }}
        title={"Edit Image"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm formData={formFields} state={image} onChange={value => dispatch(set_image(value))} loading={loading} />
      </GLActiionModal>
    </div>
  );
};

export default EditImageModal;
