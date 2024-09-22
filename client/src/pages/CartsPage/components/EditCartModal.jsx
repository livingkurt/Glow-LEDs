import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_cart_modal, set_cart } from "../../../slices/cartSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";

import { cartFormFields } from "./cartFormFields";
import { useEventsQuery, useTicketsQuery } from "../../../api/allRecordsApi";

const EditCartModal = () => {
  const dispatch = useDispatch();

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

  const eventsQuery = useEventsQuery();
  const ticketsQuery = useTicketsQuery();

  const formFields = cartFormFields({
    users,
    cart,
    products,
    eventsQuery,
    ticketsQuery,
  });

  return (
    <div>
      <GLActionModal
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
      </GLActionModal>
    </div>
  );
};

export default EditCartModal;
