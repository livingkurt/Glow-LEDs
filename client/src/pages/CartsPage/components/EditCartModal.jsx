import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_cart_modal, set_cart } from "../../../slices/cartSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";

import { cartFormFields } from "./cartFormFields";
import { useCategorysQuery, useEventsQuery, useProductsQuery, useTicketsQuery } from "../../../api/allRecordsApi";

const EditCartModal = () => {
  const dispatch = useDispatch();

  const cartPage = useSelector(state => state.carts.cartPage);
  const { edit_cart_modal, cart, loading } = cartPage;
  const { user } = cart;

  const userPage = useSelector(state => state.users.userPage);
  const { users } = userPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ active: true }));
      dispatch(API.listUsers({}));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, cart._id]);

  const eventsQuery = useEventsQuery();
  const ticketsQuery = useTicketsQuery();
  const categorysQuery = useCategorysQuery();
  const productsQuery = useProductsQuery();

  const formFields = cartFormFields({
    users,
    cart,
    eventsQuery,
    ticketsQuery,
    categorysQuery,
    productsQuery,
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
        <GLForm formData={formFields} state={cart} onChange={value => dispatch(set_cart(value))} loading={loading} />
      </GLActionModal>
    </div>
  );
};

export default EditCartModal;
