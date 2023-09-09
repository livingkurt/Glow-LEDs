import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { open_edit_order_modal, set_edit_order_modal, set_order } from "../../../slices/orderSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import GLTabPanel from "../../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";
import { orderFormFields } from "./orderFormFields";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";
import CloseIcon from "@mui/icons-material/Close";
import { updateOrderItem, updateOrderPrices, updatePricesAndDispatch } from "../ordersPageHelpers";
import { emptyOrder } from "../../../emptyState/order";

const EditOrderModal = () => {
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);
  const [isUpdatePricesActive, setIsUpdatePricesActive] = useState(true);

  const orderPage = useSelector(state => state.orders.orderPage);
  const { edit_order_modal, order, loading } = orderPage;
  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;
  const productsPage = useSelector(state => state.products.productsPage);
  const { products, loading: loading_products } = productsPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listOrders({ option: true }));
      dispatch(API.listUsers({}));
      dispatch(API.listProducts({}));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, order._id]);

  const formFields = orderFormFields({
    users,
    products,
    setState: (value, key) => dispatch(set_order({ [key]: [...order[key], ...value] })),
    onEdit: order => dispatch(open_edit_order_modal(order)),
    order,
  });

  // When adding a new item
  const handleAddNewItem = () => {
    const emptyOrderItem = {
      ...emptyOrder.orderItems[0],
      name: "New Item",
    };

    const updatedOrderItems = [...order.orderItems, emptyOrderItem];
    let updatedPrices = {};

    if (isUpdatePricesActive) {
      updatedPrices = updateOrderPrices({
        orderItems: updatedOrderItems,
        shippingPrice: order.shippingPrice,
        taxPrice: order.taxPrice,
        tip: order.tip,
      });
    }

    const updatedOrder = {
      ...order,
      orderItems: updatedOrderItems,
      ...updatedPrices,
    };

    dispatch(set_order(updatedOrder));

    // Move to the new tab
    setTabIndex(updatedOrderItems.length - 1);
  };

  // When deleting an item
  const handleDeleteItem = index => {
    const updatedOrderItems = [...order.orderItems];
    updatedOrderItems.splice(index, 1);
    let updatedPrices = {};

    if (isUpdatePricesActive) {
      updatedPrices = updateOrderPrices({
        orderItems: updatedOrderItems,
        shippingPrice: order.shippingPrice,
        taxPrice: order.taxPrice,
        tip: order.tip,
      });
    }

    const updatedOrder = {
      ...order,
      orderItems: updatedOrderItems,
      ...updatedPrices,
    };

    dispatch(set_order(updatedOrder));

    // Move to the closest active tab
    setTabIndex(prevIndex => {
      if (prevIndex === updatedOrderItems.length) {
        return updatedOrderItems.length - 1;
      }
      return prevIndex > index ? prevIndex - 1 : prevIndex;
    });
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
        <GLForm
          formData={formFields}
          state={order}
          onChange={(value, fieldName, index) => {
            console.log({ value, fieldName });
            if (fieldName === "delete") {
              const updatedOrderItems = [...value.orderItems]; // Assuming that 'orderItems' is the field that got changed
              updatePricesAndDispatch(updatedOrderItems, dispatch, order);
            } else if (fieldName === "duplicate") {
              const updatedOrderItems = [...value.orderItems]; // Assuming that 'orderItems' is the field that got duplicated
              updatePricesAndDispatch(updatedOrderItems, dispatch, order);
            } else if (fieldName !== undefined) {
              // Extract the actual field name
              const actualFieldName = fieldName.split(".")[1] || fieldName;

              // Dispatch the main state update first
              dispatch(set_order(value));

              // If either the 'product' or 'qty' field was changed, do additional updates
              if (actualFieldName === "product") {
                // const updatedOrderItems = [...order.orderItems];
                const updatedOrderItems = updateOrderItem(index, value.orderItems[index].product, order);
                // updatedOrderItems[index] = { ...updatedOrderItems[index], ...value.orderItems[index] };

                let updatedPrices = {};

                if (isUpdatePricesActive) {
                  updatedPrices = updateOrderPrices({
                    orderItems: updatedOrderItems.orderItems,
                    shippingPrice: order.shippingPrice,
                    taxPrice: order.taxPrice,
                    tip: order.tip,
                  });
                }

                const finalUpdatedOrder = {
                  ...order,
                  orderItems: updatedOrderItems.orderItems,
                  ...updatedPrices,
                };

                // Dispatch the updated order
                dispatch(set_order(finalUpdatedOrder));
              } else if (actualFieldName === "qty") {
                let updatedPrices = {};

                if (isUpdatePricesActive) {
                  updatedPrices = updateOrderPrices({
                    orderItems: value.orderItems,
                    shippingPrice: order.shippingPrice,
                    taxPrice: order.taxPrice,
                    tip: order.tip,
                  });
                }

                const finalUpdatedOrder = {
                  ...order,
                  ...updatedPrices,
                };

                // Dispatch the updated order
                dispatch(set_order(finalUpdatedOrder));
              }
            } else {
              dispatch(set_order(value));
            }
          }}
          // onChange={(value, fieldName, index) => {
          //   console.log({ value, fieldName });
          //   if (fieldName === "delete") {
          //     const updatedOrderItems = [...value.orderItems]; // Assuming that 'orderItems' is the field that got changed
          //     updatePricesAndDispatch(updatedOrderItems, dispatch, order);
          //   } else if (fieldName === "duplicate") {
          //     const updatedOrderItems = [...value.orderItems]; // Assuming that 'orderItems' is the field that got duplicated
          //     updatePricesAndDispatch(updatedOrderItems, dispatch, order);
          //   } else if (fieldName !== undefined) {
          //     // Extract the actual field name
          //     const actualFieldName = fieldName.split(".")[1] || fieldName;

          //     // Dispatch the main state update first
          //     dispatch(set_order(value));

          //     // If either the 'product' or 'qty' field was changed, do additional updates
          //     if (actualFieldName === "product" || actualFieldName === "qty") {
          //       const updatedOrderItems = [...order.orderItems];
          //       updatedOrderItems[index] = { ...updatedOrderItems[index], ...value.orderItems[index] };

          //       let updatedPrices = {};

          //       if (isUpdatePricesActive) {
          //         updatedPrices = updateOrderPrices({
          //           orderItems: updatedOrderItems,
          //           shippingPrice: order.shippingPrice,
          //           taxPrice: order.taxPrice,
          //           tip: order.tip,
          //         });
          //       }

          //       const finalUpdatedOrder = {
          //         ...order,
          //         orderItems: updatedOrderItems,
          //         ...updatedPrices,
          //       };

          //       // Dispatch the updated order
          //       dispatch(set_order(finalUpdatedOrder));
          //     }
          //   } else {
          //     dispatch(set_order(value));
          //   }
          // }}
          // onChange={(value, action, index) => {
          // if (action === "delete") {
          //   const updatedOrderItems = [...value.orderItems]; // Assuming that 'orderItems' is the field that got changed
          //   updatePricesAndDispatch(updatedOrderItems, dispatch, order);
          // } else if (action === "duplicate") {
          //   const updatedOrderItems = [...value.orderItems]; // Assuming that 'orderItems' is the field that got duplicated
          //   updatePricesAndDispatch(updatedOrderItems, dispatch, order);
          //   } else if (action !== undefined) {
          //     const actualFieldName = action.split(".")[1] || action; // Assuming action can be fieldName for other updates

          //     if (actualFieldName === "product" || actualFieldName === "qty") {
          //       const updatedOrderItems = [...order.orderItems];
          //       updatedOrderItems[index] = { ...updatedOrderItems[index], ...value.orderItems[index] };

          //       let updatedPrices = {};

          //       if (isUpdatePricesActive) {
          //         updatedPrices = updateOrderPrices({
          //           orderItems: updatedOrderItems,
          //           shippingPrice: order.shippingPrice,
          //           taxPrice: order.taxPrice,
          //           tip: order.tip,
          //         });
          //       }

          //       const finalUpdatedOrder = {
          //         ...order,
          //         orderItems: updatedOrderItems,
          //         ...updatedPrices,
          //       };

          //       // Dispatch the updated order
          //       dispatch(set_order(finalUpdatedOrder));
          //     }
          //   } else {
          //     dispatch(set_order(value));
          //   }
          // }}
          loading={loading && loading_users}
        />
      </GLActiionModal>
    </div>
  );
};

export default EditOrderModal;
