import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";

import { getUrlParameter, months, update_products_url } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";
import CSVReader from "react-csv-reader";
import GLTable from "../../shared/GlowLEDsComponents/GLTable/GLTable";
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
  const history = useHistory();
  const category = props.match.params.category ? props.match.params.category : "";

  const tutorialsSlice = useSelector(state => state.tutorialSlice);
  const { tutorials, message, totalPages, page, limit, sort, colors, search, sort_options, success } = tutorialsSlice;

  const dispatch = useDispatch();

  const determine_color = tutorial => {
    if (tutorial.active) {
      return colors[0].color;
    }
    if (tutorial.diffculty === "beginner") {
      return colors[1].color;
    }
    if (tutorial.diffculty === "intermediate") {
      return colors[2].color;
    }
    if (tutorial.diffculty === "advanced") {
      return colors[3].color;
    }
    if (!tutorial.active) {
      return colors[4].color;
    }
    return "";
  };

  const update_page = (e, new_page) => {
    let search = "";
    let sort = "";
    let filter = "";
    let limit = 10;
    let option = false;

    e.preventDefault();
    const page = parseInt(new_page);
    dispatch(set_page(page));
    update_products_url(history, search, "", "", page, limit);

    dispatch(API.listTutorials({ active: true, limit, page, sort }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      determine_tutorials();
    }
    return () => (clean = false);
  }, [success]);

  const determine_tutorials = () => {
    const query = getUrlParameter(props.location);
    let search = "";
    let sort = "";
    let filter = "";
    let limit = "";
    let page = "";

    // prnt({ query });
    if (Object.keys(query).length > 0) {
      if (query.search) {
        dispatch(set_search(query.search.split("%20").join(" ")));
        search = query.search.split("%20").join(" ");
      }
      if (query.sort) {
        dispatch(set_sort(query.sort));
        sort = query.sort;
      }
      // if (query.filter) {
      // 	//
      // 	filter = waitForElement(query.filter, chips_list);
      // }
      if (query.page) {
        dispatch(set_page(query.page));
        page = query.page;
      }
      if (query.limit) {
        dispatch(set_limit(query.limit));
        limit = query.limit;
      }
      dispatch(
        API.listTutorials({
          active: true,
          filter,
          search,
          sort,
          page,
          limit
        })
      );
    }
  };

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
    { title: "Categorys", display: "categorys" }
  ];

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Tutorials | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <div className="wrap jc-b">
        <GLButton variant="primary" onClick={() => dispatch(open_create_tutorial_modal())}>
          Create Tutorial
        </GLButton>
      </div>
      <EditTutorialModal />
      <Notification message={message} />
      <GLTable
        title="Tutorials"
        rows={tutorials}
        column_defs={column_defs}
        determine_color={determine_color}
        colors={colors}
        search={search}
        set_search={e => {
          dispatch(set_search(e.target.value));
        }}
        submitHandler={e => {
          e.preventDefault();
          dispatch(API.listTutorials({ active: true, category, search, sort, limit, page: 1 }));
        }}
        sortHandler={e => {
          dispatch(set_sort(e.target.value));
          dispatch(API.listTutorials({ active: true, category, search, sort: e.target.value, limit, page: 1 }));
        }}
        sort_options={sort_options}
        totalPages={totalPages}
        page={page}
        limit={limit}
        update_page={update_page}
        action_row={tutorial => (
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
        )}
      />
    </div>
  );
};
export default TutorialsPage;
