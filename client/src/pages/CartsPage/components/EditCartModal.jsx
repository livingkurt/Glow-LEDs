import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_cart_modal, set_cart } from "../../../slices/cartSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";

import { cartFormFields } from "./cartFormFields";
import {
  useCategorysQuery,
  useEventsQuery,
  useProductsQuery,
  useTicketsQuery,
  useUsersQuery,
} from "../../../api/allRecordsApi";

const EditCartModal = () => {
  const dispatch = useDispatch();

  const { edit_cart_modal, cart, loading } = useSelector(state => state.carts.cartPage);
  const { user } = cart || {};

  const eventsQuery = useEventsQuery();
  const ticketsQuery = useTicketsQuery();
  const categorysQuery = useCategorysQuery();
  const productsQuery = useProductsQuery({ option: false, hidden: false });
  const userQuery = useUsersQuery();

  const formFields = React.useMemo(
    () =>
      cartFormFields({
        userQuery,
        cart,
        eventsQuery,
        ticketsQuery,
        categorysQuery,
        productsQuery,
      }),
    [userQuery, cart, eventsQuery, ticketsQuery, categorysQuery, productsQuery]
  );

  const handleConfirm = useCallback(() => {
    dispatch(API.saveCart({ ...cart, user: user?._id ? user?._id : null }));
  }, [dispatch, cart, user]);

  const handleCancel = useCallback(() => {
    dispatch(set_edit_cart_modal(false));
  }, [dispatch]);

  const handleChange = useCallback(
    value => {
      dispatch(set_cart(value));
    },
    [dispatch]
  );

  return (
    <GLActionModal
      isOpen={edit_cart_modal}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      title="Edit Cart"
      confirmLabel="Save"
      confirmColor="primary"
      cancelLabel="Cancel"
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <GLForm formData={formFields} state={cart} onChange={handleChange} loading={loading} />
    </GLActionModal>
  );
};

export default React.memo(EditCartModal);
