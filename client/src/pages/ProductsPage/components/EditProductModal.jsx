import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { open_edit_product_modal, set_edit_product_modal, set_product } from "../productsPageSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { AppBar, Tab, Tabs, Typography } from "@mui/material";
import GLTabPanel from "../../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";
import { productFormFields } from "./productFormFields";
import { fullName } from "../../UsersPage/usersHelpers";

const EditProductModal = () => {
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);
  const productsPage = useSelector(state => state.products.productsPage);
  const { edit_product_modal, product, loading, products } = productsPage;
  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;
  // const imagePage = useSelector(state => state.images.imagePage);
  // const { images, loading: loading_images } = imagePage;
  const categoryPage = useSelector(state => state.categorys.categoryPage);
  const { categorys, loading: loading_categorys } = categoryPage;
  const chipPage = useSelector(state => state.chips);
  const { chips, loading: loading_chips } = chipPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listProducts({ option: true }));
      dispatch(API.listUsers({}));
      // dispatch(API.listImages({}));
      dispatch(API.listCategorys({}));
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
    setState: (value, key) => dispatch(set_product({ [key]: [...product[key], ...value] })),
    onEdit: product => dispatch(open_edit_product_modal(product)),
    product,
  });

  return (
    <div>
      <GLActiionModal
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
          onChange={value => dispatch(set_product(value))}
          loading={loading && loading_users && loading_categorys}
        />
      </GLActiionModal>
    </div>
  );
};

export default EditProductModal;
