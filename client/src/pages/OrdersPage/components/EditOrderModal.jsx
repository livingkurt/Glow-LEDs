import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { open_edit_order_modal, set_edit_order_modal, set_order } from "../../../slices/orderSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { orderFormFields } from "./orderFormFields";
import { handleDelete, handleDuplicate, handleProductChange, handleQtyChange } from "../ordersPageHelpers";
import { Checkbox, FormControlLabel } from "@mui/material";
import { determine_total } from "../../../utils/helper_functions";

const EditOrderModal = () => {
  const dispatch = useDispatch();
  const [isUpdatePricesActive, setIsUpdatePricesActive] = useState(true);

  const orderPage = useSelector(state => state.orders.orderPage);
  const { edit_order_modal, order, loading } = orderPage;
  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;
  const productsPage = useSelector(state => state.products.productsPage);
  const { products, loading: loading_products } = productsPage;
  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos } = promoPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listOrders({ option: true }));
      dispatch(API.listUsers({}));
      dispatch(API.listProducts({}));
      dispatch(API.listPromos({}));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, order._id]);

  const formFields = orderFormFields({
    users,
    products,
    promos,
  });

  const handlePromoCode = (value, order) => {
    // Get the original itemsPrice from the determine_total function
    const originalItemsPrice = determine_total(order.orderItems);
    const promoCodeData = value.promo_code;
    let { taxPrice, shippingPrice } = order; // Assuming these are part of your order state

    console.log({ originalItemsPrice, promoCodeData });
    if (promoCodeData) {
      let itemsPrice = originalItemsPrice; // Use the original itemsPrice as the base

      if (promoCodeData.percentage_off) {
        const discount = originalItemsPrice * (promoCodeData.percentage_off / 100);
        itemsPrice -= discount;
      } else if (promoCodeData.amount_off) {
        itemsPrice -= promoCodeData.amount_off;
      }

      if (promoCodeData.free_shipping) {
        shippingPrice = 0; // Set shipping price to zero
      }

      const newTotalPrice = itemsPrice + taxPrice + shippingPrice; // Recalculate total price

      console.log({ promo_code: promoCodeData.promo_code });

      const updatedOrder = {
        // ...order,
        itemsPrice,
        totalPrice: newTotalPrice,
        shippingPrice,
        promo_code: promoCodeData.promo_code,
      };

      console.log({ updatedOrder });

      // Dispatch the updated order state
      dispatch(set_order(updatedOrder));
    } else {
      const updatedOrder = {
        // ...order,
        itemsPrice: originalItemsPrice,
        totalPrice: originalItemsPrice + taxPrice + shippingPrice,
        shippingPrice,
        promo_code: "",
      };

      // Dispatch the updated order state
      dispatch(set_order(updatedOrder));
    }
  };

  return (
    <div>
      <GLActiionModal
        isOpen={edit_order_modal}
        onConfirm={() => {
          dispatch(API.saveOrder({ ...order, isUpdated: true, updatedAt: new Date() }));
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
                handlePromoCode(value, order);
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
      </GLActiionModal>
    </div>
  );
};

export default EditOrderModal;
