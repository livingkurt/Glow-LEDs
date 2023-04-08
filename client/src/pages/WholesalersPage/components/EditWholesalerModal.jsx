import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_wholesaler_modal, set_wholesaler } from "../../../slices/wholesalerSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { snake_case } from "../../../utils/helper_functions";

const EditWholesalerModal = () => {
  const dispatch = useDispatch();
  const wholesalersSlice = useSelector(state => state.wholesalerSlice.wholesalerPage);
  const { edit_wholesaler_modal, wholesaler, loading } = wholesalersSlice;
  const { user, title } = wholesaler;

  const userSlice = useSelector(state => state.userSlice.userPage);
  const { users, loading: loading_users } = userSlice;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listUsers());
    }
    return () => {
      clean = false;
    };
  }, [dispatch, wholesaler._id]);

  const formFields = {
    user: {
      type: "autocomplete",
      label: "Users",
      options: users,
      labelProp: "user",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`
    },
    company: {
      type: "text",
      label: "Company"
    },
    minimum_order_amount: {
      type: "number",
      label: "Minimum Order Amount"
    },
    active: {
      type: "checkbox",
      label: "Active"
    }
  };

  return (
    <div>
      <GLModal
        isOpen={edit_wholesaler_modal}
        onConfirm={() => {
          dispatch(API.saveWholesaler({ ...wholesaler, user: user._id }));
          dispatch(API.listAffiliates({ active: true }));
        }}
        onCancel={() => {
          dispatch(set_edit_wholesaler_modal(false));
        }}
        title={"Edit Wholesaler"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={wholesaler}
          onChange={value => dispatch(set_wholesaler(value))}
          loading={loading && loading_users}
        />
      </GLModal>
    </div>
  );
};

export default EditWholesalerModal;
