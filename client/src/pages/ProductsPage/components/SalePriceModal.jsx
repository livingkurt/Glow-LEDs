import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";
import * as API from "../../../api";
import { closeSalePriceModal, setSalePriceModalData } from "../productsPageSlice";
import { useTagsQuery } from "../../../api/allRecordsApi";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { salePriceFormFields } from "./salePriceFormFields";

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
            startDate: new Date(salePriceModal.startDate),
            endDate: new Date(salePriceModal.endDate),
          })
        )
      }
      onAction={() => dispatch(API.applySale({ clear: true }))}
      confirmLabel="Apply Sale"
      cancelLabel="Cancel"
      actionLabel="Clear"
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
