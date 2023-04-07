import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_paycheck_modal, set_paycheck } from "../../../slices/paycheckSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { snake_case } from "../../../utils/helper_functions";

const EditPaycheckModal = () => {
  const dispatch = useDispatch();
  const paychecksSlice = useSelector(state => state.paycheckSlice.paycheckPage);
  const { edit_paycheck_modal, paycheck, loading } = paychecksSlice;
  const { affiliate, title } = paycheck;

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
  }, [dispatch, paycheck._id]);

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
        isOpen={edit_paycheck_modal}
        onConfirm={() => {
          dispatch(API.savePaycheck({ ...paycheck, affiliate: affiliate._id, pathname: generate_pathname() }));
          dispatch(API.listAffiliates({ active: true }));
        }}
        onCancel={() => {
          dispatch(set_edit_paycheck_modal(false));
        }}
        title={"Edit Paycheck"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={paycheck}
          onChange={value => dispatch(set_paycheck(value))}
          loading={loading && loading_affiliates}
        />
      </GLModal>
    </div>
  );
};

export default EditPaycheckModal;
