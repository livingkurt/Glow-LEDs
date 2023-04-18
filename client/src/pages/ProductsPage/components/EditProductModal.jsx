import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_product_modal, set_product } from "../../../slices/productSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { AppBar, Tab, Tabs, Typography } from "@mui/material";
import GLTabPanel from "../../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";
import { productFormFields } from "./productFormFields";
import { fullName } from "../../UsersPage/usersHelpers";

const EditProductModal = () => {
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);
  const productPage = useSelector(state => state.products.productPage);
  const { edit_product_modal, product, loading, products } = productPage;
  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;
  const imagePage = useSelector(state => state.images.imagePage);
  const { images, loading: loading_images } = imagePage;
  const categoryPage = useSelector(state => state.categorys);
  const { categorys, loading: loading_categorys } = categoryPage;

  console.log({ images });

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listProducts({ option: true }));
      dispatch(API.listUsers({}));
      dispatch(API.listImages({}));
      dispatch(API.listCategorys({}));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, product._id]);

  const formFields = productFormFields({
    products,
    users,
    images,
    categorys,
    setState: (value, key) => dispatch(set_product({ [key]: [...product[key], ...value] })),
    product
  });

  return (
    <div>
      <GLModal
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
          loading={loading && loading_users && loading_images && loading_categorys}
        />
        <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
          {formFields.reviews.title}
        </Typography>

        <AppBar position="sticky" color="transparent">
          <Tabs
            value={tabIndex}
            className="jc-b"
            onChange={(e, newValue) => {
              dispatch(setTabIndex(newValue));
            }}
          >
            {product.reviews.map((item, index) => {
              return <Tab label={fullName(item)} value={index} />;
            })}
          </Tabs>
        </AppBar>
        {product?.reviews?.map((item, index) => {
          return (
            <GLTabPanel value={tabIndex} index={index}>
              <GLForm
                formData={formFields.reviews.fields}
                state={item}
                onChange={value => {
                  const reviews = product.reviews.map((item, i) => {
                    if (i === index) {
                      return { ...item, ...value };
                    } else {
                      return item;
                    }
                  });
                  dispatch(set_product({ reviews }));
                }}
                loading={loading && loading_users}
              />
            </GLTabPanel>
          );
        })}
      </GLModal>
    </div>
  );
};

export default EditProductModal;
