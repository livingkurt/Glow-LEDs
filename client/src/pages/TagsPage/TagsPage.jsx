import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_tag_modal, open_edit_tag_modal } from "../../slices/tagSlice";
import * as API from "../../api";
import { Box, Button, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { determineTagColors } from "./tagHelpers";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import { ContentCopy } from "@mui/icons-material";
import EditTagModal from "./components/EditTagModal";

const TagsPage = () => {
  const tagPage = useSelector(state => state.tags.tagPage);
  const { loading, remoteVersionRequirement } = tagPage;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      { title: "Name", display: "name" },
      { title: "Pathname", display: "pathname" },
      { title: "Active", display: row => (row.active ? "Yes" : "No") },
      {
        title: "",
        nonSelectable: true,
        display: tag => (
          <Box display="flex" justifyContent="flex-end">
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_tag_modal(tag))}>
              <EditIcon color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Duplicate"
              onClick={() => {
                dispatch(
                  API.saveTag({
                    ...tag,
                    _id: null,
                    name: tag.name + " Copy",
                  })
                );
              }}
            >
              <ContentCopy color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteTag(tag._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getTags(options), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Tags | Glow LEDs"}</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType="tags/setRemoteVersionRequirement"
        determineColor={determineTagColors}
        tableName="Tags"
        namespaceScope="tags"
        namespace="tagTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_tag_modal())}>
            {"Create Tag"}
          </Button>
        }
      />
      <EditTagModal />
    </Container>
  );
};
export default TagsPage;
