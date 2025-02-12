// EditCartModal.jsx

import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_cart_modal, set_cart } from "../../../slices/cartSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";

import { cartFormFields } from "./cartFormFields";
import {
  useTagsQuery,
  useEventsQuery,
  useProductsQuery,
  useTicketsQuery,
  useUsersQuery,
  useAffiliatesQuery,
} from "../../../api/allRecordsApi";
import { handleCartProductChange, handleCartTicketChange } from "../cartsPageHelpers";

const EditCartModal = () => {
  const dispatch = useDispatch();

  const { edit_cart_modal, cart } = useSelector(state => state.carts.cartPage);
  const { user } = cart || {};

  const { data: events, isLoading: eventsLoading } = useEventsQuery();
  const { data: tickets, isLoading: ticketsLoading } = useTicketsQuery();
  const { data: tags, isLoading: tagsLoading } = useTagsQuery();
  const { data: products, isLoading: productsLoading } = useProductsQuery({ hidden: false });
  const { data: affiliates, isLoading: affiliatesLoading } = useAffiliatesQuery();
  const { data: users, isLoading: usersLoading } = useUsersQuery();

  const formFields = React.useMemo(
    () =>
      cartFormFields({
        users: usersLoading ? [] : users,
        affiliate: affiliatesLoading ? [] : affiliates,
        cart,
        events: eventsLoading ? [] : events,
        tickets: ticketsLoading ? [] : tickets,
        tags: tagsLoading ? [] : tags,
        products: productsLoading ? [] : products,
      }),
    [
      usersLoading,
      users,
      affiliatesLoading,
      affiliates,
      cart,
      eventsLoading,
      events,
      ticketsLoading,
      tickets,
      tagsLoading,
      tags,
      productsLoading,
      products,
    ]
  );

  const handleConfirm = () => {
    dispatch(API.saveCart({ ...cart, user: user?._id ? user?._id : null }));
  };

  const handleCancel = () => {
    dispatch(set_edit_cart_modal(false));
  };

  const handleChange = (value, fieldName, index) => {
    if (fieldName !== undefined) {
      const actualFieldName = fieldName.split(".")[1] || fieldName;
      dispatch(set_cart(value));

      if (actualFieldName === "product") {
        handleCartProductChange(index, value, dispatch);
      } else if (actualFieldName === "ticket") {
        handleCartTicketChange(index, value, dispatch);
      }
    } else {
      dispatch(set_cart(value));
    }
  };

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
      <GLForm formData={formFields} state={cart} onChange={handleChange} />
    </GLActionModal>
  );
};

export default React.memo(EditCartModal);
