import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_gift_card_modal, set_gift_card } from "../../../slices/giftCardSlice2";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { giftCardFormFields } from "./giftCardFormFields";

const EditGiftCardModal2 = () => {
  const dispatch = useDispatch();
  const giftCardPage = useSelector(state => state.giftCards.giftCardPage);
  const { edit_gift_card_modal, gift_card, loading } = giftCardPage;

  console.log({ gift_card });

  const formFields = giftCardFormFields();

  return (
    <div>
      <GLActionModal
        isOpen={edit_gift_card_modal}
        onConfirm={() => {
          dispatch(API.saveGiftCard(gift_card));
        }}
        onCancel={() => {
          dispatch(set_edit_gift_card_modal(false));
        }}
        title="Edit GiftCard"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={gift_card}
          onChange={value => {
            dispatch(set_gift_card(value));
          }}
          loading={loading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditGiftCardModal2;
