import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { EditContentModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import { format_date } from "../../utils/helper_functions";
import { open_create_content_modal, open_edit_content_modal } from "../../slices/contentSlice";
import { determineContentColors } from "./contentsPageHelpers";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContentCopy } from "@mui/icons-material";

const ContentsPage = () => {
  const contentPage = useSelector(state => state.contents.contentPage);
  const { loading, remoteVersionRequirement } = contentPage;
  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      { title: "createdAt", display: content => content.createdAt && format_date(content.createdAt) },
      {
        title: "Active",
        display: content => (
          <IconButton
            onClick={() => {
              dispatch(
                API.saveContent({
                  ...content,
                  active: content.active ? false : true,
                })
              );
            }}
            aria-label={content.active ? "deactivate" : "activate"}
          >
            {content.active ? <CheckCircleIcon color="white" /> : <CancelIcon color="white" />}
          </IconButton>
        ),
      },
      {
        title: "Home Page",
        display: content => content?.home_page?.h1,
      },
      {
        title: "Banner",
        display: content => content.banner.label,
      },

      {
        title: "Actions",
        display: content => (
          <div className="jc-b">
            <IconButton aria-label="Edit" onClick={() => dispatch(open_edit_content_modal(content))}>
              <EditIcon color="white" />
            </IconButton>
            <IconButton
              aria-label="Edit"
              onClick={() =>
                dispatch(
                  API.saveContent({
                    ...content,
                    _id: null,
                    home_page: { ...content.home_page, h1: `${content.home_page.h1} Copy` },
                    createdAt: null,
                    updatedAt: null,
                  })
                )
              }
            >
              <ContentCopy color="white" />
            </IconButton>

            <IconButton onClick={() => dispatch(API.deleteContent(content._id))} aria-label="Delete">
              <DeleteIcon color="white" />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  const remoteApi = useCallback(options => API.getContents(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Contents | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determine_color={determineContentColors}
        tableName={"Contents"}
        namespaceScope="contents"
        namespace="contentTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_content_modal())}>
            Create Content
          </Button>
        }
      />
      <EditContentModal />
    </div>
  );
};
export default ContentsPage;
