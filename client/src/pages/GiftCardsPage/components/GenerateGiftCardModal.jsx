import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_generate_gift_card_modal, set_gift_card } from "../../../slices/giftCardSlice2";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";

const generateGiftCardFormFields = () => ({
  initialBalance: {
    type: "number",
    label: "Initial Balance",
    required: true,
    min: 0,
    step: "0.01",
  },
});

const GenerateGiftCardModal = () => {
  const dispatch = useDispatch();
  const giftCards = useSelector(state => state.giftCards.giftCardPage);
  const { generate_gift_card_modal, loading, gift_card } = giftCards;

  const formFields = generateGiftCardFormFields();

  return (
    <div>
      <GLActionModal
        isOpen={generate_gift_card_modal}
        onConfirm={() => {
          dispatch(API.generateGiftCard(gift_card));
        }}
        onCancel={() => {
          dispatch(set_generate_gift_card_modal(false));
        }}
        title="Generate Gift Card"
        confirmLabel="Generate"
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

export default GenerateGiftCardModal;
