import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { open_edit_order_modal, set_edit_order_modal, set_order } from "../../../slices/orderSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { AppBar, Tab, Tabs, Typography } from "@mui/material";
import GLTabPanel from "../../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";
import { orderFormFields } from "./orderFormFields";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";

const EditOrderModal = () => {
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);
  const orderPage = useSelector(state => state.orders.orderPage);
  const { edit_order_modal, order, loading } = orderPage;
  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;
  const productPage = useSelector(state => state.products.productPage);
  const { products, loading: loading_products } = productPage;

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
    order
  });
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

  const updateOrderItem = (index, value, order) => {
    const orderItems = order.orderItems.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          ...value,
          name: value.name,
          qty: item.qty || 1,
          display_image: value?.images[0],
          price: value.price,
          category: value.category,
          pathname: value.pathname,
          package_volume: value.package_volume,
          weight_pounds: value.weight_pounds,
          weight_ounces: value.weight_ounces,
          package_length: value.package_length,
          package_width: value.package_width,
          package_height: value.package_height,
          product_option: value?.product_options?.find(option => option.default === true),
          reviewed: value.reviewed,
          product: { _id: value._id },
          color_products: value.color_products,
          secondary_color_products: value.secondary_color_products,
          option_products: value.option_products,
          secondary_products: value.secondary_products,
          color_group_name: value.color_group_name,
          secondary_color_group_name: value.secondary_color_group_name,
          option_group_name: value.option_group_name,
          secondary_group_name: value.secondary_group_name
        };
      } else {
        return item;
      }
    });
    return { orderItems };
  };

  return (
    <div>
      <GLModal
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
        <GLForm formData={formFields} state={order} onChange={value => dispatch(set_order(value))} loading={loading && loading_users} />
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

        <AppBar position="sticky" color="transparent">
          <Tabs
            value={tabIndex}
            className="jc-b"
            onChange={(e, newValue) => {
              dispatch(setTabIndex(newValue));
            }}
          >
            {order.orderItems.map((item, index) => {
              return <Tab label={item.name} value={index} />;
            })}
          </Tabs>
        </AppBar>

        {order?.orderItems?.map((item, index) => {
          return (
            <GLTabPanel value={tabIndex} index={index}>
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
                  const updatedOrder = updateOrderItem(index, value, order);
                  dispatch(set_order(updatedOrder));
                }}
              />
              <GLForm
                formData={formFields.orderItems.fields}
                state={item}
                onChange={value => {
                  const orderItems = order.orderItems.map((item, i) => {
                    if (i === index) {
                      return { ...item, ...value };
                    } else {
                      return item;
                    }
                  });
                  dispatch(set_order({ orderItems }));
                }}
                loading={loading && loading_products}
              />
            </GLTabPanel>
          );
        })}
      </GLModal>
    </div>
  );
};

export default EditOrderModal;
