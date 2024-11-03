import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useCreateGiftcardMutation, useUpdateGiftcardMutation } from "../../../api/giftcardApi";
import { close_edit_giftcard_modal, close_create_giftcard_modal, set_giftcard } from "../../../slices/giftcardSlice";
import { showError, showSuccess } from "../../../slices/snackbarSlice";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import GLForm from "../../../shared/GlowLEDsComponents/GLForm/GLForm";

const EditGiftcardModal = () => {
  const dispatch = useDispatch();
  const giftcardPage = useSelector(state => state.giftcards.giftcardPage);
  const { edit_giftcard_modal, create_giftcard_modal, giftcard, loading } = giftcardPage;

  const [createGiftcard] = useCreateGiftcardMutation();
  const [updateGiftcard] = useUpdateGiftcardMutation();

  const isOpen = edit_giftcard_modal || create_giftcard_modal;
  const isEdit = edit_giftcard_modal;

  useEffect(() => {
    if (!isOpen) {
      dispatch(set_giftcard(null));
    }
  }, [isOpen, dispatch]);

  const handleClose = () => {
    if (isEdit) {
      dispatch(close_edit_giftcard_modal());
    } else {
      dispatch(close_create_giftcard_modal());
    }
  };

  const handleSubmit = async values => {
    try {
      if (isEdit) {
        await updateGiftcard({ id: giftcard._id, ...values }).unwrap();
        dispatch(showSuccess({ message: "Gift card updated successfully" }));
      } else {
        await createGiftcard(values).unwrap();
        dispatch(showSuccess({ message: "Gift card created successfully" }));
      }
      handleClose();
    } catch (error) {
      dispatch(showError({ message: error.message }));
    }
  };

  const formFields = {
    type: {
      type: "select",
      label: "Type",
      options: [
        { value: "general", label: "General" },
        { value: "supplies", label: "Supplies" },
      ],
      required: true,
    },
    initialBalance: {
      type: "number",
      label: "Initial Balance",
      required: true,
      min: 0,
      step: "0.01",
    },
    source: {
      type: "select",
      label: "Source",
      options: [
        { value: "purchase", label: "Purchase" },
        { value: "sponsor_benefit", label: "Sponsor Benefit" },
        { value: "promotion", label: "Promotion" },
        { value: "compensation", label: "Compensation" },
      ],
      required: true,
    },
    expirationDate: {
      type: "date",
      label: "Expiration Date",
    },
    isActive: {
      type: "checkbox",
      label: "Active",
    },
  };

  return (
    <GLActionModal
      open={isOpen}
      onClose={handleClose}
      title={isEdit ? "Edit Gift Card" : "Create Gift Card"}
      maxWidth="sm"
    >
      <Box p={2}>
        <GLForm
          formFields={formFields}
          onSubmit={handleSubmit}
          loading={loading}
          submitText={isEdit ? "Update" : "Create"}
          values={giftcard}
          onChange={value => dispatch(set_giftcard(value))}
        />
      </Box>
    </GLActionModal>
  );
};

export default EditGiftcardModal;
