import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_wholesaler_modal, set_wholesaler } from "../../../slices/wholesalerSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { userField } from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";
import { useUsersQuery } from "../../../api/allRecordsApi";

const EditWholesalerModal = () => {
  const dispatch = useDispatch();
  const wholesalerPage = useSelector(state => state.wholesalers.wholesalerPage);
  const { edit_wholesaler_modal, wholesaler, loading } = wholesalerPage;

  const { data: users, isLoading: loadingUsers } = useUsersQuery();

  const { current_user, user } = useSelector(state => state.users.userPage);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (current_user?.isAdmin) {
        dispatch(API.listUsers());
      }
    }
    return () => {
      clean = false;
    };
  }, [current_user?.isAdmin, dispatch]);

  const formFields = {
    user: userField({ users: !loadingUsers ? users : [] }),
    company: {
      type: "text",
      label: "Company",
    },
    minimum_order_amount: {
      type: "number",
      label: "Minimum Order Amount",
      permissions: ["admin"],
    },
    active: {
      type: "checkbox",
      label: "Active",
      permissions: ["admin"],
    },
  };

  return (
    <div>
      <GLActionModal
        isOpen={edit_wholesaler_modal}
        onConfirm={() => {
          dispatch(
            API.saveWholesaler({ ...wholesaler, user: user?._id || wholesaler?.user?._id || current_user?._id })
          );
          if (current_user?.isAdmin) {
            dispatch(API.listUsers());
          }
        }}
        onCancel={() => {
          dispatch(set_edit_wholesaler_modal(false));
        }}
        title="Edit Wholesaler"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={wholesaler}
          onChange={value => dispatch(set_wholesaler(value))}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditWholesalerModal;
