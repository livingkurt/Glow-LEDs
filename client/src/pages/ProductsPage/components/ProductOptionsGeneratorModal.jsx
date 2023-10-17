import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem, Typography, Grid } from "@mui/material";
import { closeProductOptionsGeneratorModal, previewProductOptions } from "../productsPageSlice";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";

const ProductOptionsGeneratorModal = () => {
  const dispatch = useDispatch();
  const productsPage = useSelector(state => state.products.productsPage);
  const { productOptionsGeneratorModal, product, selectedOptionType } = productsPage;

  return (
    <GLActionModal
      isOpen={productOptionsGeneratorModal}
      onConfirm={() => {
        // dispatch(API.generateProductOptions(previewOptions));
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
          <Typography variant="h6" gutterBottom textAlign={"center"}>
            {product.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Product Option Type</InputLabel>
            <Select
              value={selectedOptionType}
              // onChange={e => dispatch(previewProductOptions({ optionType: e.target.value, productId: product.id }))}
              label="Type"
            >
              <MenuItem value={"Color"}>Color</MenuItem>
              <MenuItem value={"Secondary Color"}>Secondary Color</MenuItem>
              <MenuItem value={"Option"}>Option</MenuItem>
              <MenuItem value={"Secondary"}>Secondary</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Color Product Type</InputLabel>
            <Select
              value={selectedOptionType}
              // onChange={e => dispatch(previewProductOptions({ optionType: e.target.value, productId: product.id }))}
              label="Type"
            >
              <MenuItem value={"CLOZD Glowskinz Colors"}>CLOZD Glowskinz Colors</MenuItem>
              <MenuItem value={"OPYN Glowskinz Colors"}>OPYN Glowskinz Colors</MenuItem>
              <MenuItem value={"Sledz Colors"}>Sledz Colors</MenuItem>
              <MenuItem value={"EXO Diffusers Skeleton Colors"}>EXO Diffusers Skeleton Colors</MenuItem>
              <MenuItem value={"EXO Diffusers Plug Colors"}>EXO Diffusers Plug Colors</MenuItem>
              <MenuItem value={"Diffusers Colors"}>Diffusers Colors</MenuItem>
              <MenuItem value={"Diffuser Caps Colors"}>Diffuser Caps Colors</MenuItem>
              <MenuItem value={"Diffuser Adapters Colors"}>Diffuser Adapters Colors</MenuItem>
              <MenuItem value={"Framez Colors"}>Framez Colors</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* Preview options based on selectedType */}
      {/* Use your UI components here to display `previewOptions` */}
    </GLActionModal>
  );
};

export default ProductOptionsGeneratorModal;
