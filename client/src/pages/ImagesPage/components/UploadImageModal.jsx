import { useDispatch, useSelector } from "react-redux";
import { close_image_modal, image_uploaded } from "../../../slices/imageSlice";
import ImageUploader from "../../../shared/SharedComponents/ImageUploader";
import GLDisplayModal from "../../../shared/GlowLEDsComponents/GLDisplayModal/GLDisplayModal";

const UploadImageModal = () => {
  const dispatch = useDispatch();
  const imagesSlice = useSelector(state => state.imageSlice.imagePage);
  const { upload_image_modal } = imagesSlice;
  return (
    <div>
      <GLDisplayModal onClose={() => dispatch(close_image_modal())} open={upload_image_modal} title={"Image Uploader"}>
        <ImageUploader onUpload={() => dispatch(image_uploaded())} />
      </GLDisplayModal>
    </div>
  );
};

export default UploadImageModal;
