import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_tutorial_modal, open_edit_tutorial_modal } from "../../slices/tutorialSlice";
import { EditTutorialModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";

const TutorialsPage = () => {
  const tutorialPage = useSelector(state => state.tutorials.tutorialPage);
  const { message, loading, remoteVersionRequirement } = tutorialPage;

  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      {
        title: "Active",
        display: tutorial => (
          <GLButton
            variant="icon"
            onClick={() => {
              dispatch(
                API.saveTutorial({
                  ...tutorial,
                  active: tutorial.active ? false : true
                })
              );
            }}
            aria-label={tutorial.active ? "deactivate" : "activate"}
          >
            {tutorial.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
          </GLButton>
        )
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
            <GLButton
              variant="icon"
              aria-label="Edit"
              onClick={() => {
                dispatch(open_edit_tutorial_modal(tutorial));
              }}
            >
              <i className="fas fa-edit" />
            </GLButton>
            <GLButton variant="icon" onClick={() => dispatch(API.deleteTutorial(tutorial.pathname))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        )
      }
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
      <Notification message={message} />
      <GLTableV2
        remoteApi={remoteApi}
        remoteReorderApi={remoteReorderApi}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType={"tutorials/setRemoteVersionRequirement"}
        tableName={"Tutorials"}
        namespaceScope="tutorials"
        namespace="tutorialTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
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
