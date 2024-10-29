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
  Chip,
  IconButton,
  Popper,
  ClickAwayListener,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { closeProductOptionsGeneratorModal, setTemplateProduct, setUseTemplate } from "../productsPageSlice";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { useProductsQuery } from "../../../api/allRecordsApi";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";
import GLBoolean from "../../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

const ProductOptionsGeneratorModal = () => {
  const dispatch = useDispatch();
  const productsPage = useSelector(state => state.products.productsPage);
  const { productOptionsGeneratorModal } = productsPage;
  const productsQuery = useProductsQuery({ option: false, hidden: false });
  const theme = useTheme();

  const { isOpen, templateProduct, selectedProducts, useTemplate } = productOptionsGeneratorModal;

  const [localSelectedOptions, setLocalSelectedOptions] = useState([]);
  const [updateNamesOnly, setUpdateNamesOnly] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProductId, setOpenProductId] = useState(null);

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
        key={value._id}
        sx={{
          backgroundColor: value.isDefault ? theme.palette.primary.main : "",
          borderRadius: 10,
          color: value.isDefault ? "white" : "black",
        }}
      >
        <ListItemText
          primary={
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {(value?.filament || value?.colorCode?.length > 0) && (
                  <Box display="flex" gap={1}>
                    <Tooltip title={value?.filament ? value?.filament.color_code : value?.colorCode}>
                      <Box
                        sx={{
                          width: "36px",
                          height: "14px",
                          borderRadius: "4px",
                          bgcolor: value?.filament ? value?.filament.color_code : value?.colorCode,
                          boxShadow: "0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24)",
                        }}
                      />
                    </Tooltip>
                  </Box>
                )}
                <Typography variant="body2">{value.name}</Typography>
                {value?.filament && !value?.filament?.active ? (
                  <Chip label="Inactive" size="small" color="error" />
                ) : (
                  ""
                )}
              </Box>

              <Box display="flex" justifyContent="flex-end">
                {value.additionalCost > 0 && (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                    <Typography variant="body2">
                      {"+$"}
                      {value.additionalCost.toFixed(2)}
                    </Typography>
                  </Box>
                )}
                {value.replacePrice && (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                    <GLBoolean tooltip="Replace Price" boolean={Boolean(value.replacePrice)} />
                    <Typography variant="body2">
                      {"$"}
                      {value.product.price}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          }
        />
      </ListItem>
    ));
  };

  const renderProductOptions = options => {
    return options.map((option, index) => (
      <Grid item xs={12} key={index}>
        <Paper style={{ margin: "10px 0", padding: "10px" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h6">{option.name}</Typography>
              <Typography variant="subtitle2">
                {"Type: "}
                {option.optionType}
              </Typography>
              {option.replacePrice && <Typography variant="subtitle2">{"Replaces Price"}</Typography>}
              {option.isAddOn && <Typography variant="subtitle2">{"Add-On Option"}</Typography>}
              <List dense>{renderOptionValues(option.values)}</List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
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
              <Typography variant="subtitle2">
                {"Type: "}
                {option.optionType}
              </Typography>
              {option.replacePrice && <Typography variant="subtitle2">{"Replaces Price"}</Typography>}
              {option.isAddOn && <Typography variant="subtitle2">{"Add-On Option"}</Typography>}
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
        updateNamesOnly: updateNamesOnly,
      })
    );
  };

  const handleInfoClick = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setOpenProductId(productId);
  };

  const handleInfoClose = () => {
    setAnchorEl(null);
    setOpenProductId(null);
  };

  return (
    <GLActionModal
      isOpen={isOpen}
      onConfirm={handleConfirm}
      onCancel={() => {
        dispatch(closeProductOptionsGeneratorModal());
      }}
      title="Product Options Generator"
      confirmLabel="Generate"
      confirmDisabled={useTemplate && !templateProduct}
      confirmColor="primary"
      cancelLabel="Cancel"
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">{"Selected Products"}</Typography>
          <List>
            {selectedProducts?.map((product, index) => (
              <ListItem key={product._id} component={Paper} style={{ marginBottom: "10px" }}>
                <ListItemText primary={product.name} />
                <IconButton onClick={e => handleInfoClick(e, product._id)}>
                  <InfoIcon />
                </IconButton>
                <Popper
                  open={openProductId === product._id}
                  anchorEl={anchorEl}
                  placement="right"
                  style={{ zIndex: 1300 }}
                >
                  <ClickAwayListener onClickAway={handleInfoClose}>
                    <Paper style={{ padding: "20px", maxWidth: "500px", maxHeight: "80vh", overflow: "auto" }}>
                      <Typography variant="h6">{"Original Options"}</Typography>
                      {renderProductOptions(product.options)}
                    </Paper>
                  </ClickAwayListener>
                </Popper>
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
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={updateNamesOnly}
                onChange={e => setUpdateNamesOnly(e.target.checked)}
                name="updateNamesOnly"
                color="primary"
              />
            }
            label="Update Option Product Names Only"
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
            <Typography variant="h6">{"Template Product Options"}</Typography>
            {renderTemplateOptions()}
          </Grid>
        )}
      </Grid>
    </GLActionModal>
  );
};

export default ProductOptionsGeneratorModal;
