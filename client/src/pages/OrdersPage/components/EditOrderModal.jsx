import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_order_modal, set_order } from "../../../slices/orderSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { orderFormFields } from "./orderFormFields";
import {
  determineSetToIsUpdated,
  handleDelete,
  handleDuplicate,
  handleProductChange,
  handlePromoCode,
  handleQtyChange,
} from "../ordersPageHelpers";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useProductsQuery } from "../../../api/allRecordsApi";
import { GLTextField } from "../../../shared/GlowLEDsComponents";
import { showConfirm } from "../../../slices/snackbarSlice";

const EditOrderModal = () => {
  const dispatch = useDispatch();
  const productsQuery = useProductsQuery({ option: false, hidden: false });

  const all_shipping = API.useGetAllShippingOrdersQuery();
  const [isUpdatePricesActive, setIsUpdatePricesActive] = useState(true);

  const orderPage = useSelector(state => state.orders.orderPage);
  const { edit_order_modal, order, loading } = orderPage;
  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users, current_user } = userPage;

  // const productsPage = useSelector(state => state.products.productsPage);
  // const { products } = productsPage;

  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos } = promoPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listOrders({ option: true }));
      dispatch(API.listUsers({}));
      dispatch(API.listPromos({}));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, order._id]);

  const formFields = orderFormFields({
    users,
    productsQuery,
    promos,
    all_shipping,
  });

  return (
    <div>
      <GLActionModal
        isOpen={edit_order_modal}
        onConfirm={() => {
          dispatch(
            showConfirm({
              title: "Update Change Log",
              inputLabel: "Describe the change you made to order",
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
        title={"Edit Order"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <FormControlLabel
          control={
            <Checkbox
              name={"is_updated"}
              size="large"
              onChange={e => setIsUpdatePricesActive(e.target.checked)}
              checked={isUpdatePricesActive}
            />
          }
          label={"Update Prices"}
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
                handleProductChange(index, value, dispatch, order, isUpdatePricesActive);
              } else if (actualFieldName === "qty") {
                handleQtyChange(value, dispatch, order, isUpdatePricesActive);
              }
            } else {
              dispatch(set_order(value));
            }
          }}
          loading={loading && loading_users}
        />
      </GLActionModal>
    </div>
  );
};

export default EditOrderModal;
