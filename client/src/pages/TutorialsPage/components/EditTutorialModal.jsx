import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_tutorial_modal, set_tutorial } from "../../../slices/tutorialSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { snake_case } from "../../../utils/helper_functions";
import { tutorialFormFields } from "./tutorialFormFields";
import { useAffiliatesQuery, useCategorysQuery } from "../../../api/allRecordsApi";

const EditTutorialModal = () => {
  const dispatch = useDispatch();
  const tutorialPage = useSelector(state => state.tutorials.tutorialPage);
  const { edit_tutorial_modal, tutorial, loading } = tutorialPage;
  const { affiliate, title } = tutorial;

  const generate_pathname = () => {
    return affiliate ? snake_case(`${title} by ${affiliate.artist_name}`) : "";
  };

  const tagsQuery = useCategorysQuery();
  const affiliatesQuery = useAffiliatesQuery();

  const formFields = tutorialFormFields({ tagsQuery, affiliatesQuery });

  return (
    <div>
      <GLActionModal
        isOpen={edit_tutorial_modal}
        onConfirm={() => {
          dispatch(API.saveTutorial({ ...tutorial, affiliate: affiliate._id, pathname: generate_pathname() }));
          dispatch(API.listAffiliates({ active: true }));
        }}
        onCancel={() => {
          dispatch(set_edit_tutorial_modal(false));
        }}
        title="Edit Tutorial"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={tutorial}
          onChange={value => dispatch(set_tutorial(value))}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditTutorialModal;
