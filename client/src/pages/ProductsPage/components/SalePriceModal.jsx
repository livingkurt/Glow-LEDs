import { useDispatch, useSelector } from "react-redux";
import * as API from "../../../api";
import { closeSalePriceModal, setSalePriceModalData } from "../productsPageSlice";
import { useTagsQuery } from "../../../api/allRecordsApi";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { salePriceFormFields } from "./salePriceFormFields";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const SalePriceModal = () => {
  const dispatch = useDispatch();
  const { salePriceModal } = useSelector(state => state.products.productsPage);
  const { isOpen } = salePriceModal;
  const { data: tags } = useTagsQuery();

  const formFields = salePriceFormFields({ tags });

  const isValid = salePriceModal.discountValue && salePriceModal.startDate && salePriceModal.endDate;

  return (
    <GLActionModal
      isOpen={isOpen}
      title="Apply Product Discount"
      onCancel={() => dispatch(closeSalePriceModal())}
      onConfirm={() =>
        dispatch(
          API.applySale({
            ...salePriceModal,
            startDate: dayjs(salePriceModal.startDate).utc().toDate(),
            endDate: dayjs(salePriceModal.endDate).utc().toDate(),
          })
        )
      }
      onAction={() => dispatch(API.applySale({ clear: true }))}
      actionColor="secondary"
      cancelColor="secondary"
      confirmLabel="Apply Sale"
      cancelLabel="Cancel"
      actionLabel="Clear Sale"
      confirmDisabled={!isValid}
    >
      <GLForm
        formData={formFields}
        state={salePriceModal}
        onChange={value => {
          dispatch(setSalePriceModalData(value));
        }}
      />
    </GLActionModal>
  );
};

export default SalePriceModal;
