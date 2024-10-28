import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { goBackInEditProductHistory, set_edit_product_modal, set_product } from "../productsPageSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { productFormFields } from "./productFormFields";
import { showConfirm } from "../../../slices/snackbarSlice";
import { useCategorysQuery, useProductsQuery } from "../../../api/allRecordsApi";

const EditProductModal = () => {
  const dispatch = useDispatch();
  const productsPage = useSelector(state => state.products.productsPage);
  const { edit_product_modal, product, loading, products, editProductHistory } = productsPage;
  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;
  const chipPage = useSelector(state => state.chips.chipPage);
  const { chips } = chipPage;
  const filamentPage = useSelector(state => state.filaments.filamentPage);
  const { filaments } = filamentPage;
  const productsQuery = useProductsQuery({ option: false, hidden: false, isVariation: false });
  const categorysQuery = useCategorysQuery();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listProducts({ option: true }));
      dispatch(API.listUsers({}));
      dispatch(API.listFilaments({}));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, product._id]);

  const formFields = productFormFields({
    products,
    users,
    categorysQuery,
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
