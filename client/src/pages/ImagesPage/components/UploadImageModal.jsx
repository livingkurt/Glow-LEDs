import { useDispatch, useSelector } from "react-redux";
import { close_image_modal, image_uploaded } from "../../../slices/imageSlice";
import ImageWizard from "../../../shared/SharedComponents/ImageWizard";
import GLDisplayModal from "../../../shared/GlowLEDsComponents/GLDisplayModal/GLDisplayModal";

const UploadImageModal = () => {
  const dispatch = useDispatch();
  const imagePage = useSelector(state => state.images.imagePage);
  const { upload_image_modal } = imagePage;

  const handleChange = newImages => {
    // After successful upload, dispatch image_uploaded action
    dispatch(image_uploaded());
  };

  const fieldData = {
    label: "Upload Images",
    album: "general", // or whatever default album you want to use
  };

  return (
    <div>
      <GLDisplayModal onClose={() => dispatch(close_image_modal())} open={upload_image_modal} title="Image Uploader">
        <ImageWizard
          fieldData={fieldData}
          fieldState={[]}
          onChange={handleChange}
          fieldName="images"
          isMultiple={true}
        />
      </GLDisplayModal>
    </div>
  );
};

export default UploadImageModal;
