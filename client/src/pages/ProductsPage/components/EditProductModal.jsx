import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { goBackInEditProductHistory, set_edit_product_modal, set_product } from "../productsPageSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { productFormFields } from "./productFormFields";
import { showConfirm } from "../../../slices/snackbarSlice";
import {
  useCategorysQuery,
  useChipsQuery,
  useFilamentsQuery,
  useProductsQuery,
  useUsersQuery,
} from "../../../api/allRecordsApi";

const EditProductModal = () => {
  const dispatch = useDispatch();
  const productsPage = useSelector(state => state.products.productsPage);
  const { edit_product_modal, product, loading, editProductHistory } = productsPage;
  const { data: products, isLoading: productsLoading } = useProductsQuery({
    option: false,
    hidden: false,
    isVariation: false,
  });
  const { data: tags, isLoading: tagsLoading } = useCategorysQuery();
  const { data: users, isLoading: usersLoading } = useUsersQuery();
  const { data: chips, isLoading: chipsLoading } = useChipsQuery();
  const { data: filaments, isLoading: filamentsLoading } = useFilamentsQuery();

  const formFields = productFormFields({
    products: !productsLoading ? products : [],
    users: !usersLoading ? users : [],
    tags: !tagsLoading ? tags : [],
    chips: !chipsLoading ? chips : [],
    filaments: !filamentsLoading ? filaments : [],
    product,
    dispatch,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_product_modal}
        onConfirm={() => {
          dispatch(API.saveProduct({ ...product }));
        }}
        onCancel={() => {
          if (editProductHistory.length === 0) {
            dispatch(set_edit_product_modal(false));
          } else {
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
          }
        }}
        title="Edit Product"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel={
          editProductHistory.length > 0 ? `Back to ${editProductHistory[editProductHistory.length - 1].name}` : "Cancel"
        }
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={product}
          onChange={value => {
            dispatch(set_product(value));
          }}
          loading={loading && loading_users}
        />
      </GLActionModal>
    </div>
  );
};

export default EditProductModal;
