import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
  Tooltip,
  useTheme,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { closeProductOptionsGeneratorModal, setTemplateProduct, setUseTemplate } from "../productsPageSlice";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { useProductsQuery } from "../../../api/allRecordsApi";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";
const ProductOptionsGeneratorModal = () => {
  const dispatch = useDispatch();
  const productsPage = useSelector(state => state.products.productsPage);
  const { productOptionsGeneratorModal } = productsPage;
  const productsQuery = useProductsQuery({ option: false, hidden: false });
  const theme = useTheme();

  const { isOpen, templateProduct, selectedProducts, useTemplate } = productOptionsGeneratorModal;

  const [localSelectedOptions, setLocalSelectedOptions] = useState([]);

  useEffect(() => {
    if (templateProduct && templateProduct.options) {
      setLocalSelectedOptions(
        templateProduct.options.map((option, index) => ({
          ...option,
          isSelected: true,
          order: index + 1,
        }))
      );
    }
  }, [templateProduct]);

  const handleOptionChange = (index, field, value) => {
    setLocalSelectedOptions(prevOptions =>
      prevOptions.map((option, i) => (i === index ? { ...option, [field]: value } : option))
    );
  };
  const renderOptionValues = values => {
    return values.map((value, index) => (
      <ListItem
        key={index}
        sx={{
          backgroundColor: value.isDefault ? theme.palette.primary.main : "white",
          borderRadius: 10,
          color: value.isDefault ? "white" : "black",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="subtitle2">{value.name}</Typography>
          </Grid>
          {value?.colorCode && (
            <Grid item xs={3} display="flex" gap={2}>
              <Tooltip title={value?.colorCode}>
                <Box
                  sx={{
                    width: "36px",
                    height: "14px",
                    borderRadius: "4px",
                    bgcolor: value?.colorCode,
                    boxShadow: "0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24)",
                  }}
                />
              </Tooltip>
              <Typography variant="subtitle2">
                {value?.filament ? value?.filament.color_code : value?.colorCode}
              </Typography>
              <Typography variant="subtitle2">{value?.filament?.active ? "Active" : ""}</Typography>
            </Grid>
          )}
          <Grid item xs={3}>
            <Typography variant="subtitle2">{value.isDefault && " (Default)"}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle2">
              {value.additionalCost > 0 && `Additional Cost: $${value.additionalCost}`}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    ));
  };

  const renderTemplateOptions = () => {
    if (!templateProduct || !templateProduct.options) return null;

    return localSelectedOptions.map((option, index) => (
      <Grid item xs={12} key={index}>
        <Paper style={{ margin: "10px 0", padding: "10px" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
              <Checkbox
                checked={option.isSelected}
                onChange={e => handleOptionChange(index, "isSelected", e.target.checked)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                type="number"
                value={option.order}
                onChange={e => handleOptionChange(index, "order", parseInt(e.target.value) || 0)}
                disabled={!option.isSelected}
                fullWidth
              />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6">{option.name}</Typography>
              <Typography variant="subtitle2">Type: {option.optionType}</Typography>
              {option.replacePrice && <Typography variant="subtitle2">Replaces Price</Typography>}
              {option.isAddOn && <Typography variant="subtitle2">Add-On Option</Typography>}
              <List dense>{renderOptionValues(option.values)}</List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    ));
  };

  const handleConfirm = () => {
    const sortedSelectedOptions = localSelectedOptions
      .filter(option => option.isSelected)
      .sort((a, b) => a.order - b.order);

    dispatch(
      API.generateProductOptions({
        selectedProductIds: selectedProducts.map(product => product._id),
        templateProductId: templateProduct ? templateProduct._id : null,
        selectedOptions: sortedSelectedOptions,
      })
    );
  };

  return (
    <GLActionModal
      isOpen={isOpen}
      onConfirm={handleConfirm}
      onCancel={() => {
        dispatch(closeProductOptionsGeneratorModal());
      }}
      title={"Product Options Generator"}
      confirmLabel={"Generate"}
      confirmDisabled={useTemplate && !templateProduct}
      confirmColor="primary"
      cancelLabel={"Cancel"}
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Selected Products</Typography>
          <List>
            {selectedProducts?.map((product, index) => (
              <ListItem key={product._id} component={Paper} style={{ marginBottom: "10px" }}>
                <ListItemText primary={product.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={useTemplate}
                onChange={e => dispatch(setUseTemplate(e.target.checked))}
                name="useTemplate"
                color="primary"
              />
            }
            label="Use Template Product"
          />
        </Grid>
        {useTemplate && (
          <Grid item xs={12}>
            <GLAutocomplete
              options={!productsQuery?.isLoading ? productsQuery?.data : []}
              getOptionLabel={option => option.name}
              value={templateProduct}
              onChange={(event, newValue) => {
                dispatch(setTemplateProduct(newValue));
              }}
              label="Template Product"
              fullWidth
            />
          </Grid>
        )}
        {useTemplate && templateProduct && (
          <Grid item xs={12}>
            <Typography variant="h6">Template Product Options</Typography>
            {renderTemplateOptions()}
          </Grid>
        )}
      </Grid>
    </GLActionModal>
  );
};

export default ProductOptionsGeneratorModal;
