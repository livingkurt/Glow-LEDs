import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_cart_modal, set_cart } from "../../../slices/cartSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { AppBar, Tab, Tabs, Typography } from "@mui/material";
import GLTabPanel from "../../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";

const EditCartModal = () => {
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);
  const cartPage = useSelector(state => state.carts.cartPage);
  const { edit_cart_modal, cart, loading } = cartPage;
  const { user } = cart;

  const userPage = useSelector(state => state.users.userPage);
  const { users, loading: loading_users } = userPage;

  const productPage = useSelector(state => state.products.productPage);
  const { products, loading: loading_products } = productPage;

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

  const formFields = {
    user: {
      type: "autocomplete_single",
      label: "Users",
      options: users,
      labelProp: "user",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`
    },
    cartItems: {
      title: "Cart Items",
      type: "array_of_objects",
      labelProp: "cartItems",
      fields: {
        name: {
          type: "text",
          label: "Name",
          labelProps: "name",
          required: true
        },
        qty: {
          type: "number",
          label: "Quantity",
          labelProps: "qty",
          required: true
        },
        display_image: {
          type: "text",
          label: "Display Image",
          labelProps: "display_image",
          required: true
        },
        secondary_image: {
          type: "text",
          label: "Secondary Image",
          labelProps: "secondary_image"
        },
        color: {
          type: "text",
          label: "Color",
          labelProps: "color"
        },
        secondary_color: {
          type: "text",
          label: "Secondary Color",
          labelProps: "secondary_color"
        },
        color_group_name: {
          type: "text",
          label: "Color Group Name",
          labelProps: "color_group_name"
        },
        secondary_color_group_name: {
          type: "text",
          label: "Secondary Color Group Name",
          labelProps: "secondary_color_group_name"
        },
        color_code: {
          type: "text",
          label: "Color Code",
          labelProps: "color_code"
        },
        secondary_color_code: {
          type: "text",
          label: "Secondary Color Code",
          labelProps: "secondary_color_code"
        },
        price: {
          type: "number",
          label: "Price",
          labelProps: "price",
          required: true
        },
        category: {
          type: "text",
          label: "Category",
          labelProps: "category",
          required: true
        },
        subcategory: {
          type: "text",
          label: "Subcategory",
          labelProps: "subcategory"
        },
        product_collection: {
          type: "text",
          label: "Product Collection",
          labelProps: "product_collection"
        },
        pathname: {
          type: "text",
          label: "Pathname",
          labelProps: "pathname"
        },
        size: {
          type: "text",
          label: "Size",
          labelProps: "size"
        },
        preorder: {
          type: "checkbox",
          label: "Preorder",
          labelProps: "preorder"
        },
        sale_price: {
          type: "number",
          label: "Sale Price",
          labelProps: "sale_price"
        },
        sale_start_date: {
          type: "date",
          label: "Sale Start Date",
          labelProps: "sale_start_date"
        },
        sale_end_date: {
          type: "date",
          label: "Sale End Date",
          labelProps: "sale_end_date"
        },
        package_volume: {
          type: "number",
          label: "Package Volume",
          labelProps: "package_volume"
        },
        weight_pounds: {
          type: "number",
          label: "Weight (lbs)",
          labelProps: "weight_pounds"
        },
        weight_ounces: {
          type: "number",
          label: "Weight (oz)",
          labelProps: "weight_ounces"
        },
        count_in_stock: {
          type: "number",
          label: "Count in Stock",
          labelProps: "count_in_stock"
        },
        length: {
          type: "number",
          label: "Length",
          labelProps: "length"
        },
        width: {
          type: "number",
          label: "Width",
          labelProps: "width"
        },
        height: {
          type: "number",
          label: "Height",
          labelProps: "height"
        },
        package_length: {
          type: "number",
          label: "Package Length",
          labelProps: "package_length"
        },
        package_width: {
          type: "number",
          label: "Package Width",
          labelProps: "package_width"
        },
        package_height: {
          type: "number",
          label: "Package Height",
          labelProps: "package_height"
        },
        processing_time: {
          type: "multi-select",
          label: "Processing Time",
          labelProps: "processing_time",
          options: ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days"]
        },
        quantity: {
          type: "number",
          label: "Quantity",
          labelProps: "quantity"
        },
        finite_stock: {
          type: "number",
          label: "Finite Stock",
          labelProps: "finite_stock"
        },
        add_on_price: {
          type: "number",
          label: "Add-On Price",
          labelProps: "add_on_price"
        },
        show_add_on: {
          type: "checkbox",
          label: "Show Add-On",
          labelProps: "show_add_on"
        },
        wholesale_product: {
          type: "checkbox",
          label: "Wholesale Product",
          labelProps: "wholesale_product"
        },
        wholesale_price: {
          type: "number",
          label: "Wholesale Price",
          labelProps: "wholesale_price"
        },
        product: {
          type: "autocomplete_single",
          label: "Product",
          options: products,
          labelProp: "name",
          required: true
        },
        color_product: {
          type: "autocomplete_single",
          label: "Color Product",
          options: products,
          labelProp: "name"
        },
        color_product_name: {
          type: "text",
          label: "Color Product Name",
          labelProp: "color_product_name"
        },
        secondary_color_product: {
          type: "autocomplete_single",
          label: "Secondary Color Product",
          options: products,
          labelProp: "name"
        },
        secondary_color_product_name: {
          type: "text",
          label: "Secondary Color Product Name",
          labelProp: "secondary_color_product_name"
        },
        option_product_name: {
          type: "text",
          label: "Option Product Name",
          labelProp: "option_product_name"
        },
        option_product: {
          type: "autocomplete_single",
          label: "Option Product",
          options: products,
          labelProp: "name"
        },
        secondary_product_name: {
          type: "text",
          label: "Secondary Product Name",
          labelProp: "secondary_product_name"
        },
        secondary_product: {
          type: "autocomplete_single",
          label: "Secondary Product",
          options: products,
          labelProp: "name"
        }
      }
    }
  };

  //  colors: {
  //       title: "Colors",
  //       type: "array",
  //       arrayType: "text",
  //       labelProp: "colors"
  //     },
  //     thing: {
  //       title: "Thing",
  //       type: "object",
  //       labelProp: "thing",
  //       fields: {
  //         name: {
  //           type: "text",
  //           label: "name"
  //         }
  //       }
  //     }
  return (
    <div>
      <GLModal
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
        <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
          {formFields.cartItems.title}
        </Typography>

        <AppBar position="sticky" color="transparent">
          <Tabs
            value={tabIndex}
            className="jc-b"
            onChange={(e, newValue) => {
              dispatch(setTabIndex(newValue));
            }}
          >
            {cart.cartItems.map((item, index) => {
              return <Tab label={item.name} value={index} />;
            })}
          </Tabs>
        </AppBar>
        {cart?.cartItems?.map((item, index) => {
          return (
            <GLTabPanel value={tabIndex} index={index}>
              <GLForm
                formData={formFields.cartItems.fields}
                state={item}
                onChange={value => {
                  const cartItems = cart.cartItems.map((item, i) => {
                    if (i === index) {
                      return { ...item, ...value };
                    } else {
                      return item;
                    }
                  });
                  dispatch(set_cart({ cartItems }));
                }}
                loading={loading && loading_users}
              />
            </GLTabPanel>
          );
        })}
      </GLModal>
    </div>
  );
};

export default EditCartModal;
