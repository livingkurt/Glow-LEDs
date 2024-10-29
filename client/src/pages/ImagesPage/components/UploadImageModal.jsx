import { useDispatch, useSelector } from "react-redux";
import { close_image_modal, image_uploaded } from "../../../slices/imageSlice";
import ImageUploader from "../../../shared/SharedComponents/ImageUploader";
import GLDisplayModal from "../../../shared/GlowLEDsComponents/GLDisplayModal/GLDisplayModal";

const UploadImageModal = () => {
  const dispatch = useDispatch();
  const imagePage = useSelector(state => state.images.imagePage);
  const { upload_image_modal } = imagePage;
  return (
    <div>
      <GLDisplayModal onClose={() => dispatch(close_image_modal())} open={upload_image_modal} title="Image Uploader">
        <ImageUploader onUpload={() => dispatch(image_uploaded())} type="image" />
      </GLDisplayModal>
    </div>
  );
};

export default UploadImageModal;
