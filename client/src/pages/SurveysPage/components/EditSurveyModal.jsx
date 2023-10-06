import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_survey_modal, set_survey } from "../../../slices/surveySlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { surveyFormFields } from "./surveyFormFields";

const EditSurveyModal = () => {
  const dispatch = useDispatch();
  const surveyPage = useSelector(state => state.surveys.surveyPage);
  const { edit_survey_modal, survey, loading } = surveyPage;

  const formFields = surveyFormFields({
    survey,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_survey_modal}
        onConfirm={() => {
          dispatch(API.saveSurvey(survey));
        }}
        onCancel={() => {
          dispatch(set_edit_survey_modal(false));
        }}
        title={"Edit Survey"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={survey}
          onChange={value => {
            dispatch(set_survey(value));
          }}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditSurveyModal;
