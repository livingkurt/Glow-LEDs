import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, List, ListItem, ListItemText, Paper, Typography, Divider, Box, Tooltip } from "@mui/material";
import { closeProductOptionsGeneratorModal, setTemplateProduct } from "../productsPageSlice";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { useProductsQuery } from "../../../api/allRecordsApi";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";

const ProductOptionsGeneratorModal = () => {
  const dispatch = useDispatch();
  const productsPage = useSelector(state => state.products.productsPage);
  const { productOptionsGeneratorModal } = productsPage;
  const productsQuery = useProductsQuery({ option: false, hidden: false });

  const { isOpen, templateProduct, selectedProducts } = productOptionsGeneratorModal;

  const renderOptionValues = values => {
    return values.map((value, index) => (
      <ListItem key={index}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="subtitle2">{value.name}</Typography>
          </Grid>
          {value.colorCode && (
            <Grid item xs={4}>
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
            </Grid>
          )}
          <Grid item xs={4}>
            <Typography variant="subtitle2">
              {value.additionalCost > 0 && ` | Additional Cost: $${value.additionalCost}`}
              {value.isDefault && " (Default)"}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    ));
  };

  const renderTemplateOptions = () => {
    if (!templateProduct || !templateProduct.options) return null;

    return templateProduct.options.map((option, index) => (
      <Grid item xs={6}>
        <Paper key={index} style={{ margin: "10px 0", padding: "10px" }}>
          <Typography variant="h6">{option.name}</Typography>
          <Typography variant="subtitle2">Type: {option.optionType}</Typography>
          {option.replacePrice && <Typography variant="subtitle2">Replaces Price</Typography>}
          {option.isAddOn && <Typography variant="subtitle2">Add-On Option</Typography>}
          <List dense>{renderOptionValues(option.values)}</List>
        </Paper>
      </Grid>
    ));
  };

  return (
    <GLActionModal
      isOpen={isOpen}
      onConfirm={() => {
        dispatch(
          API.generateProductOptions({
            selectedProductIds: selectedProducts.map(product => product._id),
            templateProductId: templateProduct._id,
          })
        );
      }}
      onCancel={() => {
        dispatch(closeProductOptionsGeneratorModal());
      }}
      title={"Product Options Generator"}
      confirmLabel={"Generate"}
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
        <Grid item xs={12}>
          {templateProduct && (
            <>
              <Typography variant="h6">Template Product Options</Typography>
              <Grid container spacing={2}>
                {renderTemplateOptions()}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </GLActionModal>
  );
};

export default ProductOptionsGeneratorModal;
