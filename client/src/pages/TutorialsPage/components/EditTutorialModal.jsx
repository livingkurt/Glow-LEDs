import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_tutorial_modal, set_tutorial } from "../../../slices/tutorialSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { snake_case } from "../../../utils/helper_functions";

const EditTutorialModal = () => {
  const dispatch = useDispatch();
  const tutorialsSlice = useSelector(state => state.tutorialSlice.tutorialPage);
  const { edit_tutorial_modal, tutorial, loading } = tutorialsSlice;
  const { affiliate, title } = tutorial;

  const affiliateSlice = useSelector(state => state.affiliateSlice);
  const { affiliates, loading: loading_affiliates } = affiliateSlice;

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

  const formFields = {
    affiliate: {
      type: "autocomplete",
      label: "Affiliate",
      options: affiliates,
      labelProp: "artist_name"
    },
    title: {
      type: "text",
      label: "Title"
    },
    video: {
      type: "text",
      label: "Video"
    },
    description: {
      type: "text",
      label: "Description"
    },
    level: {
      type: "select",
      label: "Difficulty",
      options: ["beginner", "intermediate", "advanced"]
    },
    order: {
      type: "text",
      label: "Order"
    },
    active: {
      type: "checkbox",
      label: "Active"
    }
  };

  return (
    <div>
      <GLModal
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
      </GLModal>
    </div>
  );
};

export default EditTutorialModal;
