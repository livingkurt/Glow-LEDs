import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   TextField,
//   Button,
//   Autocomplete,
//   Typography,
//   Grid,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { goBackInEditProductHistory, set_edit_product_modal, set_product } from "../productsPageSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { productFormFields } from "./productFormFields";
import { showConfirm } from "../../../slices/snackbarSlice";
import { useProductsQuery } from "../../../api/allRecordsApi";
// import { toCapitalize } from "../../../utils/helper_functions";

const EditProductModal = () => {
  const dispatch = useDispatch();
  const productsPage = useSelector(state => state.products.productsPage);
  const { edit_product_modal, product, loading, products, editProductHistory } = productsPage;
  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;
  const categoryPage = useSelector(state => state.categorys.categoryPage);
  const { categorys, loading: loading_categorys } = categoryPage;
  const chipPage = useSelector(state => state.chips.chipPage);
  const { chips } = chipPage;
  const filamentPage = useSelector(state => state.filaments.filamentPage);
  const { filaments } = filamentPage;
  const productsQuery = useProductsQuery({ option: false, hidden: false });

  // const [optionName, setOptionName] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [optionType, setOptionType] = useState(null);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listProducts({ option: true }));
      dispatch(API.listUsers({}));
      dispatch(API.listCategorys({}));
      dispatch(API.listFilaments({}));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, product._id]);

  const formFields = productFormFields({
    products,
    users,
    tags: categorys,
    chips,
    product,
    filaments,
    dispatch,
    productsQuery,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_product_modal}
        onConfirm={() => {
          dispatch(API.saveProduct({ ...product }));
        }}
        onCancel={() => {
          if (editProductHistory.length > 0) {
            dispatch(goBackInEditProductHistory());
          } else if (editProductHistory.length === 0) {
            dispatch(set_edit_product_modal(false));
          }
        }}
        onAction={() => {
          dispatch(
            showConfirm({
              title: "Do you want to save before going back?",
              message: "Click Yes to save changes before going back. Click No to go back without saving.",
              onConfirm: () => {
                dispatch(API.saveProduct({ ...product }));
              },
              onClose: () => {
                dispatch(goBackInEditProductHistory());
              },
            })
          );
        }}
        title={"Edit Product"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        actionLabel={
          editProductHistory.length > 0 ? `Back to ${editProductHistory[editProductHistory.length - 1].name}` : null
        }
        actionColor="secondary"
        disableEscapeKeyDown
      >
        {/* <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Generate Product Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  label="Option Name"
                  value={optionName}
                  onChange={e => setOptionName(e.target.value)}
                  fullWidth
                  size="small"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={["colors", "dropdown", "buttons"]}
                  getOptionLabel={option => {
                    if (typeof option === "string") {
                      return toCapitalize(option);
                    }
                  }}
                  value={optionType}
                  onChange={(event, newValue) => {
                    setOptionType(newValue);
                  }}
                  renderInput={params => (
                    <TextField {...params} label="Option Type" fullWidth margin="normal" size="small" />
                  )}
                />
              </Grid>
              {optionType === "colors" && (
                <Grid item xs={12}>
                  <Autocomplete
                    options={categorys.filter(category => category.type === "filament_tags")}
                    getOptionLabel={option => option.name}
                    value={selectedCategory}
                    onChange={(event, newValue) => {
                      setSelectedCategory(newValue);
                    }}
                    renderInput={params => (
                      <TextField {...params} label="Category" fullWidth margin="normal" size="small" />
                    )}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    dispatch(
                      API.generateProductOptions({
                        productId: product._id,
                        optionName,
                        optionType,
                        filamentTag: selectedCategory._id,
                      })
                    )
                  }
                  fullWidth
                >
                  Generate
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion> */}

        <GLForm
          formData={formFields}
          state={product}
          onChange={value => {
            dispatch(set_product(value));
          }}
          loading={loading && loading_users && loading_categorys}
        />
      </GLActionModal>
    </div>
  );
};

export default EditProductModal;
