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
import { closeSalePriceModal } from "../productsPageSlice";
import { useTagsQuery } from "../../../api/allRecordsApi";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";

const SalePriceModal = () => {
  const dispatch = useDispatch();
  const productsPage = useSelector(state => state.products.productsPage);
  const { salePriceModalOpen } = productsPage;

  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [applyToOptions, setApplyToOptions] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [applyToAll, setApplyToAll] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: tags = [] } = useTagsQuery();

  const handleClose = () => {
    dispatch(closeSalePriceModal());
  };

  const handleApplySale = async () => {
    try {
      setLoading(true);
      await dispatch(
        API.applySale({
          discountType,
          discountValue,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          applyToOptions,
          selectedTags,
          applyToAll,
        })
      ).unwrap();
      handleClose();
    } catch (error) {
      // Error is handled by the API thunk
    } finally {
      setLoading(false);
    }
  };

  const isValid = discountValue && startDate && endDate;

  return (
    <GLActionModal
      isOpen={salePriceModalOpen}
      title="Apply Product Discount"
      onCancel={handleClose}
      onConfirm={handleApplySale}
      confirmLabel="Apply Sale"
      cancelLabel="Cancel"
      confirmDisabled={!isValid || loading}
      confirmLoading={loading}
      maxWidth="sm"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>{"Discount Type"}</InputLabel>
          <Select value={discountType} onChange={e => setDiscountType(e.target.value)} label="Discount Type">
            <MenuItem value="percentage">{"Percentage Off"}</MenuItem>
            <MenuItem value="fixed">{"Fixed Amount Off"}</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label={discountType === "percentage" ? "Percentage Off" : "Amount Off"}
          type="number"
          value={discountValue}
          onChange={e => setDiscountValue(e.target.value)}
          InputProps={{
            startAdornment: discountType === "percentage" ? "%" : "$",
          }}
        />

        <TextField
          label="Sale Start Date"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Sale End Date"
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControlLabel
          control={<Checkbox checked={applyToOptions} onChange={e => setApplyToOptions(e.target.checked)} />}
          label="Apply discount to product options"
        />

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          {"Apply To:"}
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={applyToAll}
              onChange={e => {
                setApplyToAll(e.target.checked);
                if (e.target.checked) {
                  setSelectedTags([]);
                }
              }}
            />
          }
          label="All Products"
        />

        {!applyToAll && (
          <GLAutocomplete
            multiple
            fullWidth
            value={selectedTags}
            onChange={(e, value) => setSelectedTags(value)}
            options={tags}
            getOptionLabel={option => option.name}
            disabled={applyToAll}
            label="Products with Tags"
            renderInput={params => <TextField {...params} label="Products with Tags" />}
            size="medium"
          />
        )}

        {!applyToAll && selectedTags.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            {"No tags selected - discount will apply to selected products only"}
          </Typography>
        )}
      </Box>
    </GLActionModal>
  );
};

export default SalePriceModal;
