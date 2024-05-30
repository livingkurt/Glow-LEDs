import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { EditSurveyModal } from "./components";
import * as API from "../../api";
import { Box, Button, Rating } from "@mui/material";
import { format_date } from "../../utils/helper_functions";
import { open_create_survey_modal, open_edit_survey_modal } from "../../slices/surveySlice";
import { determineSurveyColors } from "./surveysPageHelpers";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContentCopy } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

const SurveysPage = () => {
  const surveyPage = useSelector(state => state.surveys.surveyPage);
  const { loading, remoteVersionRequirement } = surveyPage;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columnDefs = useMemo(
    () => [
      { title: "createdAt", display: survey => survey.createdAt && format_date(survey.createdAt) },
      {
        title: "Rating",
        display: survey => <Rating name="read-only" value={survey.rating} readOnly />,
      },
      {
        title: "Is Survey?",
        display: survey => <GLBoolean boolean={survey.is_survey} />,
      },
      {
        title: "Questions and Answers",
        display: survey => (
          <div>
            {survey.question_answer.map((qa, index) => (
              <div key={index}>
                {survey.is_survey ? (
                  <>
                    <span>{`Q${index + 1}: ${qa.question}`}</span>
                    <br />
                    <span>{`A${index + 1}: ${qa.answer}`}</span>
                  </>
                ) : (
                  <span>
                    Q{index + 1}. {qa.answer}
                  </span>
                )}
              </div>
            ))}
          </div>
        ),
      },

      {
        title: "Actions",
        display: survey => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_survey_modal(survey))}>
              <EditIcon color="white" />
            </GLIconButton>

            <GLIconButton onClick={() => dispatch(API.deleteSurvey(survey._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
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
        determineColor={determineSurveyColors}
        tableName={"Surveys"}
        namespaceScope="surveys"
        namespace="surveyTable"
        columnDefs={columnDefs}
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
