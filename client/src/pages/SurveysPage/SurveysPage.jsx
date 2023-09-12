import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { EditSurveyModal } from "./components";
import * as API from "../../api";
import { Button, Rating } from "@mui/material";
import { format_date } from "../../utils/helper_functions";
import { open_create_survey_modal, open_edit_survey_modal } from "../../slices/surveySlice";
import { determineSurveyColors } from "./surveysPageHelpers";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContentCopy } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";

const SurveysPage = () => {
  const surveyPage = useSelector(state => state.surveys.surveyPage);
  const { loading, remoteVersionRequirement } = surveyPage;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const column_defs = useMemo(
    () => [
      { title: "createdAt", display: survey => survey.createdAt && format_date(survey.createdAt) },
      {
        title: "Rating",
        display: survey => <Rating name="read-only" value={survey.rating} readOnly />,
      },
      {
        title: "Is Survey?",
        display: survey => (survey.is_survey ? <CheckCircleIcon color="white" /> : <CancelIcon color="white" />),
      },
      {
        title: "Answer 1",
        display: survey => (survey.is_survey ? survey.question_1 : survey.answer_1),
      },
      {
        title: "Answer 2",
        display: survey => (survey.is_survey ? survey.question_2 : survey.answer_2),
      },
      {
        title: "Answer 3",
        display: survey => (survey.is_survey ? survey.question_3 : survey.answer_3),
      },
      {
        title: "Answer 4",
        display: survey => (survey.is_survey ? survey.question_4 : survey.answer_4),
      },
      {
        title: "Answer 5",
        display: survey => (survey.is_survey ? survey.question_5 : survey.answer_5),
      },

      {
        title: "Actions",
        display: survey => (
          <div className="jc-b">
            <IconButton aria-label="Edit" onClick={() => dispatch(open_edit_survey_modal(survey))}>
              <EditIcon color="white" />
            </IconButton>
            <IconButton
              aria-label="Edit"
              onClick={() =>
                dispatch(
                  API.saveSurvey({
                    ...survey,
                    _id: null,
                    home_page: { ...survey.home_page, h1: `${survey.home_page.h1} Copy` },
                    createdAt: null,
                    updatedAt: null,
                  })
                )
              }
            >
              <ContentCopy color="white" />
            </IconButton>
            <IconButton
              aria-label="Edit"
              onClick={() => {
                dispatch(
                  API.saveEmail({
                    h1: survey.home_page.h1,
                    images: survey.home_page.images,
                    h2: survey.home_page.h2,
                    p: survey.home_page.p,
                    button: survey.home_page.button,
                    link: survey.home_page.link,
                  })
                );
                navigate("/secure/glow/emails");
              }}
            >
              <EmailIcon color="white" />
            </IconButton>

            <IconButton onClick={() => dispatch(API.deleteSurvey(survey._id))} aria-label="Delete">
              <DeleteIcon color="white" />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  const remoteApi = useCallback(options => API.getSurveys(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Surveys | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determine_color={determineSurveyColors}
        tableName={"Surveys"}
        namespaceScope="surveys"
        namespace="surveyTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_survey_modal())}>
            Create Survey
          </Button>
        }
      />
      <EditSurveyModal />
    </div>
  );
};
export default SurveysPage;
