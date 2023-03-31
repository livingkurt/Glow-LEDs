import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";

import { getUrlParameter, months, update_products_url } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";
import CSVReader from "react-csv-reader";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import {
  open_create_tutorial_modal,
  open_edit_tutorial_modal,
  set_edit_tutorial_modal,
  set_limit,
  set_loading,
  set_page,
  set_search,
  set_sort,
  set_tutorial
} from "../../slices/tutorialSlice";
import { API_Promos } from "../../utils";
import { EditTutorialModal } from "./components";
import * as API from "../../api";

const TutorialsPage = props => {
  const tutorialsSlice = useSelector(state => state.tutorialSlice);
  const { tutorials, message, totalPages, page, limit, sort, colors, search, sort_options, success, loading } = tutorialsSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listTutorials({ active: true }));
    }
    return () => (clean = false);
  }, [success]);

  const column_defs = [
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
            dispatch(API.listTutorials({ active: true, limit, page, sort }));
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
  ];

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Tutorials | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <GLTableV2
        tableName={"Tutorials"}
        namespace="tutorialTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        rows={tutorials}
      />
      <EditTutorialModal />
    </div>
  );
};
export default TutorialsPage;
