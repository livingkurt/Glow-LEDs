import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_image_modal, open_edit_image_modal } from "../../slices/imageSlice";
import { EditImageModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import { getImages } from "../../api";
import { format_date } from "../../utils/helper_functions";
import UploadImageModal from "./components/UploadImageModal";

const ImagesPage = () => {
  const imageSlice = useSelector(state => state.imageSlice.imagePage);
  const { message, loading, remoteVersionRequirement } = imageSlice;
  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      { title: "Date Added", display: image => image.createdAt && format_date(image.createdAt) },
      {
        title: "Album",
        display: "album"
      },
      {
        title: "Image",
        display: image => (
          <div className="jc-c">
            <img src={image.link} alt={image.name} style={{ width: "50px", height: "50px" }} />
          </div>
        )
      },
      {
        title: "Link",
        display: "link"
      },

      {
        title: "Actions",
        display: image => (
          <div className="jc-b">
            <GLButton variant="icon" aria-label="Edit" onClick={() => dispatch(open_edit_image_modal(image))}>
              <i className="fas fa-edit" />
            </GLButton>
            <GLButton variant="icon" onClick={() => dispatch(API.deleteImage(image._id))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        )
      }
    ],
    []
  );

  const remoteApi = useCallback(options => getImages(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Images | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        tableName={"Images"}
        namespaceScope="imageSlice"
        namespace="imageTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="primary" onClick={() => dispatch(open_create_image_modal())}>
            Create Image
          </Button>
        }
      />
      <UploadImageModal />
      <EditImageModal />
    </div>
  );
};
export default ImagesPage;
