import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { open_edit_product_modal, set_edit_product_modal, set_product } from "../productsPageSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { productFormFields } from "./productFormFields";

const EditProductModal = () => {
  const dispatch = useDispatch();
  const productsPage = useSelector(state => state.products.productsPage);
  const { edit_product_modal, product, loading, products, selectedOption } = productsPage;
  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;
  const categoryPage = useSelector(state => state.categorys.categoryPage);
  const { categorys, loading: loading_categorys } = categoryPage;
  const chipPage = useSelector(state => state.chips.chipPage);
  const { chips } = chipPage;
  const filamentPage = useSelector(state => state.filaments.filamentPage);
  const { filaments } = filamentPage;

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
    categorys,
    chips,
    product,
    filaments,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_product_modal}
        onConfirm={() => {
          dispatch(API.saveProduct({ ...product }));
        }}
        onCancel={() => {
          dispatch(set_edit_product_modal(false));
        }}
        title={"Edit Product"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
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
