import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import {
  close_image_display_modal,
  open_create_image_modal,
  open_edit_image_modal,
  open_image_display_modal,
} from "../../slices/imageSlice";
import { EditImageModal } from "./components";
import * as API from "../../api";

import { getImages } from "../../api";
import { format_date } from "../../utils/helper_functions";
import UploadImageModal from "./components/UploadImageModal";
import GLImageModal from "../../shared/GlowLEDsComponents/GLImageModal/GLImageModal";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import GLLazyImage from "../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const ImagesPage = () => {
  const imagePage = useSelector(state => state.images.imagePage);
  const { loading, remoteVersionRequirement, image_display_modal, selected_image } = imagePage;
  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      { title: "ID", display: "_id" },
      { title: "Date Added", display: image => image.createdAt && format_date(image.createdAt) },
      {
        title: "Album",
        display: "album",
      },
      {
        title: "Image",
        display: image => (
          <div className="jc-c">
            <GLLazyImage
              src={image.link}
              alt={image.name}
              style={{ width: "50px", height: "50px" }}
              onClick={() => dispatch(open_image_display_modal(image.link))}
            />
          </div>
        ),
      },
      {
        title: "Link",
        display: "link",
      },

      {
        title: "",
        nonSelectable: true,
        display: image => (
          <Box display="flex" justifyContent="flex-end">
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_image_modal(image))}>
              <Edit color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteImage(image._id))} tooltip="Delete">
              <Delete color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],

    []
  );

  const remoteApi = useCallback(options => getImages(options), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Images | Glow LEDs"}</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        tableName="Images"
        namespaceScope="images"
        namespace="imageTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_image_modal())}>
            {"Create Image"}
          </Button>
        }
      />

      <GLImageModal
        open={image_display_modal}
        onClose={() => dispatch(close_image_display_modal(false))}
        selected_image={selected_image}
      />

      <UploadImageModal />
      <EditImageModal />
    </Container>
  );
};
export default ImagesPage;
