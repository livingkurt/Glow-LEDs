import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_tutorial_modal, open_edit_tutorial_modal } from "../../slices/tutorialSlice";
import { EditTutorialModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

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
        title: "Actions",
        display: tutorial => (
          <div className="jc-b">
            <GLIconButton
              tooltip="Edit"
              onClick={() => {
                dispatch(open_edit_tutorial_modal(tutorial));
              }}
            >
              <i className="fas fa-edit" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteTutorial(tutorial.pathname))} tooltip="Delete">
              <i className="fas fa-trash-alt" />
            </GLIconButton>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getTutorials(options), []);
  const remoteReorderApi = useCallback(options => API.reorderTutorials(options), []);

  return (
    <div className="main_container p-20px">
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
    </div>
  );
};
export default TutorialsPage;
