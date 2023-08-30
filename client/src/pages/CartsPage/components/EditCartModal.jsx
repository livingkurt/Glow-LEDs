import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_cart_modal, set_cart } from "../../../slices/cartSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { AppBar, Tab, Tabs, Typography } from "@mui/material";
import GLTabPanel from "../../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";
import { cartFormFields } from "./cartFormFields";

const EditCartModal = () => {
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);
  const cartPage = useSelector(state => state.carts.cartPage);
  const { edit_cart_modal, cart, loading } = cartPage;
  const { user } = cart;

  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;

  const productsPage = useSelector(state => state.products.productsPage);
  const { products, loading: loading_products } = productsPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ active: true }));
      dispatch(API.listProducts({}));
      dispatch(API.listUsers({}));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, cart._id]);

  const formFields = cartFormFields({
    users,
    products,
  });

  return (
    <div>
      <GLModal
        isOpen={edit_cart_modal}
        onConfirm={() => {
          dispatch(API.saveCart({ ...cart, user: user?._id ? user?._id : null }));
        }}
        onCancel={() => {
          dispatch(set_edit_cart_modal(false));
        }}
        title={"Edit Cart"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <GLForm
          formData={formFields}
          state={cart}
          onChange={value => dispatch(set_cart(value))}
          loading={loading && loading_users && loading_products}
        />
        <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
          {formFields.cartItems.title}
        </Typography>

        <AppBar position="sticky" color="transparent">
          <Tabs
            value={tabIndex}
            className="jc-b"
            onChange={(e, newValue) => {
              dispatch(setTabIndex(newValue));
            }}
          >
            {cart.cartItems.map((item, index) => {
              return <Tab label={item.name} value={index} />;
            })}
          </Tabs>
        </AppBar>
        {cart?.cartItems?.map((item, index) => {
          return (
            <GLTabPanel value={tabIndex} index={index}>
              <GLForm
                formData={formFields.cartItems.fields}
                state={item}
                onChange={value => {
                  const cartItems = cart.cartItems.map((item, i) => {
                    if (i === index) {
                      return { ...item, ...value };
                    } else {
                      return item;
                    }
                  });
                  dispatch(set_cart({ cartItems }));
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

export default EditCartModal;
