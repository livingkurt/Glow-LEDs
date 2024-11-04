import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useCreateGiftCardMutation, useUpdateGiftCardMutation } from "../../../api/giftCardApi";
import { close_edit_gift_card_modal, close_create_gift_card_modal, set_giftCard } from "../../../slices/giftCardSlice";
import { showError, showSuccess } from "../../../slices/snackbarSlice";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import GLForm from "../../../shared/GlowLEDsComponents/GLForm/GLForm";

const EditGiftCardModal = () => {
  const dispatch = useDispatch();
  const giftCardPage = useSelector(state => state.giftCards.giftCardPage);
  const { edit_gift_card_modal, create_gift_card_modal, giftCard, loading } = giftCardPage;

  const [createGiftCard] = useCreateGiftCardMutation();
  const [updateGiftCard] = useUpdateGiftCardMutation();

  const isOpen = edit_gift_card_modal || create_gift_card_modal;
  const isEdit = edit_gift_card_modal;

  useEffect(() => {
    if (!isOpen) {
      dispatch(set_giftCard(null));
    }
  }, [isOpen, dispatch]);

  const handleClose = () => {
    if (isEdit) {
      dispatch(close_edit_gift_card_modal());
    } else {
      dispatch(close_create_gift_card_modal());
    }
  };

  const handleSubmit = async values => {
    try {
      if (isEdit) {
        await updateGiftCard({ id: giftCard._id, ...values }).unwrap();
        dispatch(showSuccess({ message: "Gift card updated successfully" }));
      } else {
        await createGiftCard(values).unwrap();
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
          values={giftCard}
          onChange={value => dispatch(set_giftCard(value))}
        />
      </Box>
    </GLActionModal>
  );
};

export default EditGiftCardModal;
