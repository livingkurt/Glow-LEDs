import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_tutorial_modal, open_edit_tutorial_modal } from "../../slices/tutorialSlice";
import { EditTutorialModal } from "./components";
import * as API from "../../api";
import { Box, Button, Container } from "@mui/material";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

const TutorialsPage = () => {
  const tutorialPage = useSelector(state => state.tutorials.tutorialPage);
  const { message, loading, remoteVersionRequirement } = tutorialPage;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Active",
        display: tutorial => (
          <GLIconButton
            onClick={() => {
              dispatch(
                API.saveTutorial({
                  ...tutorial,
                  active: tutorial.active ? false : true,
                })
              );
            }}
            tooltip={tutorial.active ? "deactivate" : "activate"}
          >
            <GLBoolean boolean={tutorial.active} />
          </GLIconButton>
        ),
      },
      { title: "Title", display: "title" },
      { title: "Video", display: "video" },
      { title: "Level", display: "level" },
      { title: "Order", display: "order" },
      { title: "Categorys", display: "categorys" },
      {
        title: "",
        display: tutorial => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton
              tooltip="Edit"
              onClick={() => {
                dispatch(open_edit_tutorial_modal(tutorial));
              }}
            >
              <Edit color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteTutorial(tutorial.pathname))} tooltip="Delete">
              <Delete color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getTutorials(options), []);
  const remoteReorderApi = useCallback(options => API.reorderTutorials(options), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>Admin Tutorials | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteReorderApi={remoteReorderApi}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType={"tutorials/setRemoteVersionRequirement"}
        tableName={"Tutorials"}
        namespaceScope="tutorials"
        namespace="tutorialTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect
        enableDragDrop
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_tutorial_modal())}>
            Create Tutorial
          </Button>
        }
      />
      <EditTutorialModal />
    </Container>
  );
};
export default TutorialsPage;
