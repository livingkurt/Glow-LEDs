import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { EditContentModal } from "./components";
import * as API from "../../api";
import { Box, Button, Container } from "@mui/material";
import { format_date } from "../../utils/helper_functions";
import { open_create_content_modal, open_edit_content_modal } from "../../slices/contentSlice";
import { determineContentColors } from "./contentsPageHelpers";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContentCopy, Edit, Flag, Help, Home, Info } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

const ContentsPage = () => {
  const contentPage = useSelector(state => state.contents.contentPage);
  const { loading, remoteVersionRequirement } = contentPage;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columnDefs = useMemo(
    () => [
      { title: "createdAt", display: content => content.createdAt && format_date(content.createdAt) },
      {
        title: "Active",
        display: content => (
          <GLIconButton
            onClick={() => {
              dispatch(
                API.saveContent({
                  ...content,
                  active: content.active ? false : true,
                })
              );
            }}
            tooltip={content.active ? "deactivate" : "activate"}
          >
            <GLBoolean boolean={content.active} />
          </GLIconButton>
        ),
      },
      {
        title: "Name",
        display: content => content?.name,
      },
      {
        title: "Banner",
        display: content => content?.banner?.label,
      },

      {
        title: "",
        nonSelectable: true,
        display: content => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton
              tooltip="Edit"
              onClick={() => dispatch(open_edit_content_modal({ content, contentType: "" }))}
            >
              <Edit color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Edit Home Page"
              onClick={() => dispatch(open_edit_content_modal({ content, contentType: "home_page" }))}
            >
              <Home color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Edit Banner"
              onClick={() => dispatch(open_edit_content_modal({ content, contentType: "banner" }))}
            >
              <Flag color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Edit About Page"
              onClick={() => dispatch(open_edit_content_modal({ content, contentType: "about_page" }))}
            >
              <Info color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Edit FAQ Page"
              onClick={() => dispatch(open_edit_content_modal({ content, contentType: "faq_page" }))}
            >
              <Help color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Duplicate"
              onClick={() =>
                dispatch(
                  API.saveContent({
                    ...content,
                    _id: null,
                    name: content.name + " Copy",
                    createdAt: null,
                    updatedAt: null,
                  })
                )
              }
            >
              <ContentCopy color="white" />
            </GLIconButton>
            {/* <GLIconButton
              tooltip="Create Email"
              onClick={() => {
                dispatch(
                  API.saveEmail({
                    h1: content.home_page.h1,
                    images: content.home_page.images,
                    h2: content.home_page.h2,
                    p: content.home_page.p,
                    button: content.home_page.button,
                    link: content.home_page.link,
                  })
                );
                navigate("/secure/glow/emails");
              }}
            >
              <EmailIcon color="white" />
            </GLIconButton> */}

            <GLIconButton onClick={() => dispatch(API.deleteContent(content._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    []
  );

  const remoteApi = useCallback(options => API.getContents(options), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>Admin Contents | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineContentColors}
        tableName={"Contents"}
        namespaceScope="contents"
        namespace="contentTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_content_modal())}>
            Create Content
          </Button>
        }
      />
      <EditContentModal />
    </Container>
  );
};
export default ContentsPage;
