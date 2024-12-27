import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_order_modal, set_order } from "../../../slices/orderSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { orderFormFields } from "./orderFormFields";
import {
  handleDelete,
  handleDuplicate,
  handleProductChange,
  handlePromoCode,
  handleQtyChange,
  handleTicketChange,
} from "../ordersPageHelpers";

import {
  useTagsQuery,
  useEventsQuery,
  useProductsQuery,
  usePromosQuery,
  useTicketsQuery,
  useUsersQuery,
} from "../../../api/allRecordsApi";
import { showConfirm } from "../../../slices/snackbarSlice";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const EditOrderModal = () => {
  const dispatch = useDispatch();

  const [isUpdatePricesActive, setIsUpdatePricesActive] = useState(true);

  const orderPage = useSelector(state => state.orders.orderPage);
  const { edit_order_modal, order } = orderPage;
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const { data: allShipping, isLoading: allShippingLoading } = API.useGetAllShippingOrdersQuery();
  const { data: products, isLoading: productsLoading } = useProductsQuery({ hidden: false });
  const { data: tags, isLoading: tagsLoading } = useTagsQuery();
  const { data: events, isLoading: eventsLoading } = useEventsQuery();
  const { data: tickets, isLoading: ticketsLoading } = useTicketsQuery();
  const { data: users, isLoading: usersLoading } = useUsersQuery();
  const { data: promos, isLoading: promosLoading } = usePromosQuery();

  console.log({ promos, order });

  const formFields = orderFormFields({
    users: usersLoading ? [] : users,
    products: productsLoading ? [] : products,
    promos: promosLoading ? [] : promos,
    allShipping: allShippingLoading ? [] : allShipping,
    order,
    tags: tagsLoading ? [] : tags,
    events: eventsLoading ? [] : events,
    tickets: ticketsLoading ? [] : tickets,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_order_modal}
        onConfirm={() => {
          dispatch(
            showConfirm({
              title: "Update Change Log",
              inputLabel: "Describe the why you made this change to the order",
              onConfirm: inputText =>
                dispatch(
                  API.saveOrder({
                    ...order,
                    isUpdated: true,
                    change_log: [
                      ...order.change_log,
                      {
                        change: inputText,
                        changedAt: new Date(),
                        changedBy: current_user,
                      },
                    ],
                  })
                ),
            })
          );
        }}
        onCancel={() => {
          dispatch(set_edit_order_modal(false));
        }}
        title="Edit Order"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <FormControlLabel
          control={
            <Checkbox
              name="is_updated"
              size="large"
              onChange={e => setIsUpdatePricesActive(e.target.checked)}
              checked={isUpdatePricesActive}
            />
          }
          label="Update Prices"
        />

        <GLForm
          formData={formFields}
          state={order}
          onChange={(value, fieldName, index) => {
            if (fieldName === "delete") {
              handleDelete(value, dispatch, order, isUpdatePricesActive);
            } else if (fieldName === "duplicate") {
              handleDuplicate(value, dispatch, order, isUpdatePricesActive);
            } else if (fieldName !== undefined) {
              if (fieldName === "promo_code") {
                handlePromoCode(value, order, dispatch);
                return;
              }
              const actualFieldName = fieldName.split(".")[1] || fieldName;
              dispatch(set_order(value));

              if (actualFieldName === "product") {
                handleProductChange(index, value, dispatch, isUpdatePricesActive);
              } else if (actualFieldName === "ticket") {
                handleTicketChange(index, value, dispatch, isUpdatePricesActive);
              } else if (actualFieldName === "quantity") {
                handleQtyChange(value, dispatch, order, isUpdatePricesActive);
              }
            } else {
              dispatch(set_order(value));
            }
          }}
          // loading={isLoading}
        />
      </GLActionModal>
    </div>
  );
};

export default EditOrderModal;
