import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_tutorial_modal, set_tutorial } from "../../../slices/tutorialSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { snake_case } from "../../../utils/helper_functions";
import { tutorialFormFields } from "./tutorialFormFields";

const EditTutorialModal = () => {
  const dispatch = useDispatch();
  const tutorialPage = useSelector(state => state.tutorials.tutorialPage);
  const { edit_tutorial_modal, tutorial, loading } = tutorialPage;
  const { affiliate, title } = tutorial;

  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliates, loading: loading_affiliates } = affiliatePage;
  console.log({ affiliates });

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ active: true }));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, tutorial._id]);

  const generate_pathname = () => {
    return affiliate ? snake_case(`${title} by ${affiliate.artist_name}`) : "";
  };

  const formFields = tutorialFormFields({ affiliates });

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
        title={"Edit Tutorial"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={tutorial}
          onChange={value => dispatch(set_tutorial(value))}
          loading={loading && loading_affiliates}
        />
      </GLActionModal>
    </div>
  );
};

export default EditTutorialModal;
