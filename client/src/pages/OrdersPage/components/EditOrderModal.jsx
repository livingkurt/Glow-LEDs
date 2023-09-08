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
import { updateOrderItem, updateOrderPrices } from "../ordersPageHelpers";
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
          onChange={value => dispatch(set_order(value))}
          loading={loading && loading_users}
        />
        <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
          {formFields.shipping.title}
        </Typography>
        <GLForm
          formData={formFields.shipping.fields}
          state={order.shipping}
          onChange={value => dispatch(set_order({ shipping: { ...order.shipping, ...value } }))}
          loading={loading}
        />
        <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
          {formFields.orderItems.title}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isUpdatePricesActive}
              size="large"
              onChange={() => setIsUpdatePricesActive(!isUpdatePricesActive)}
              name="updatePrices"
              color="primary"
            />
          }
          label="Update Prices"
        />
        <AppBar position="sticky" color="transparent">
          <Tabs
            value={tabIndex}
            className="jc-b"
            onChange={(e, newValue) => {
              setTabIndex(newValue);
            }}
          >
            {order.orderItems.map((item, index) => {
              return <Tab label={item.name} value={index} />;
            })}
          </Tabs>
        </AppBar>
        <Box sx={{ m: 3 }} />
        {order?.orderItems?.map((item, index) => {
          return (
            <GLTabPanel value={tabIndex} index={index}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <IconButton variant="primary" onClick={() => handleDeleteItem(index)} aria-label="Delete">
                    <CloseIcon style={{ fontSize: "25px" }} />
                  </IconButton>
                  <Button variant="contained" color="primary" onClick={handleAddNewItem}>
                    Add New Item
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <GLAutocomplete
                    loading={!loading_products}
                    margin="normal"
                    value={item}
                    options={products}
                    optionDisplay={option => (option.name ? option.name : "")}
                    getOptionLabel={option => (option.name ? option.name : "")}
                    getOptionSelected={(option, value) => option._id === value.product}
                    name="product"
                    label="Choose Product"
                    onChange={(e, value) => {
                      // Update the individual order item
                      const updatedOrder = updateOrderItem(index, value, order);
                      let updatedPrices = {};

                      if (isUpdatePricesActive) {
                        updatedPrices = updateOrderPrices({
                          orderItems: updatedOrder.orderItems,
                          shippingPrice: order.shippingPrice,
                          taxPrice: order.taxPrice,
                          tip: order.tip,
                        });
                      }

                      // Merge the updated prices into the updatedOrder object
                      const finalUpdatedOrder = {
                        ...updatedOrder,
                        ...updatedPrices,
                      };

                      // Dispatch the updated order
                      dispatch(set_order(finalUpdatedOrder));
                    }}
                  />
                  <GLForm
                    formData={formFields.orderItems.fields}
                    state={item}
                    onChange={value => {
                      let updatedOrderItems = order.orderItems.map((item, i) => {
                        if (i === index) {
                          return { ...item, ...value };
                        } else {
                          return item;
                        }
                      });

                      // Update the prices if qty changes
                      if (isUpdatePricesActive && value.hasOwnProperty("qty")) {
                        const updatedPrices = updateOrderPrices({
                          orderItems: updatedOrderItems,
                          shippingPrice: order.shippingPrice,
                          taxPrice: order.taxPrice,
                          tip: order.tip,
                        });
                        dispatch(set_order({ orderItems: updatedOrderItems, ...updatedPrices }));
                      } else {
                        dispatch(set_order({ orderItems: updatedOrderItems }));
                      }
                    }}
                    loading={loading && loading_products}
                  />
                </Grid>
              </Grid>
            </GLTabPanel>
          );
        })}
      </GLActiionModal>
    </div>
  );
};

export default EditOrderModal;

// function extractFormFields(schema) {
//   const formFields = {};

//   for (const key in schema) {
//     const field = schema[key];
//     const type = field.type.name;

//     formFields[key] = {
//       type: type.toLowerCase(),
//       label: key.charAt(0).toUpperCase() + key.slice(1),
//       required: field.required || false
//     };
//   }

//   return formFields;
// }
