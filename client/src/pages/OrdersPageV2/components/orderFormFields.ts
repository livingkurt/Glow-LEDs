export const orderFormFields = ({
  users,
  products,
  setState,
  order,
  onEdit
}: {
  users: any;
  products: any;
  setState: any;
  order: any;
  onEdit: any;
}) => {
  return {
    user: {
      type: "autocomplete_single",
      label: "Users",
      options: users,
      labelProp: "user",
      getOptionLabel: (option: any) => `${option.first_name} ${option.last_name}`
    },
    orderItems: {
      type: "array_of_objects",
      title: "Order Items",
      fields: {
        name: {
          type: "text",
          label: "Name",
          labelProp: "name",
          required: true
        },
        qty: {
          type: "number",
          label: "Quantity",
          labelProp: "qty",
          required: true
        },
        display_image: {
          type: "text",
          label: "Display Image",
          labelProp: "display_image",
          required: true
        },
        secondary_image: {
          type: "text",
          label: "Secondary Image",
          labelProp: "secondary_image"
        },
        color: {
          type: "text",
          label: "Color",
          labelProp: "color"
        },
        secondary_color: {
          type: "text",
          label: "Secondary Color",
          labelProp: "secondary_color"
        },
        color_group_name: {
          type: "text",
          label: "Color Group Name",
          labelProp: "color_group_name"
        },
        secondary_color_group_name: {
          type: "text",
          label: "Secondary Color Group Name",
          labelProp: "secondary_color_group_name"
        },
        color_code: {
          type: "text",
          label: "Color Code",
          labelProp: "color_code"
        },
        secondary_color_code: {
          type: "text",
          label: "Secondary Color Code",
          labelProp: "secondary_color_code"
        },
        price: {
          type: "number",
          label: "Price",
          labelProp: "price",
          required: true
        },
        category: {
          type: "text",
          label: "Category",
          labelProp: "category",
          required: true
        },
        subcategory: {
          type: "text",
          label: "Subcategory",
          labelProp: "subcategory"
        },
        product_collection: {
          type: "text",
          label: "Product Collection",
          labelProp: "product_collection"
        },
        pathname: {
          type: "text",
          label: "Pathname",
          labelProp: "pathname"
        },
        size: {
          type: "text",
          label: "Size",
          labelProp: "size"
        },
        preorder: {
          type: "checkbox",
          label: "Preorder",
          labelProp: "preorder"
        },
        sale_price: {
          type: "number",
          label: "Sale Price",
          labelProp: "sale_price"
        },
        sale_start_date: {
          type: "date",
          label: "Sale Start Date",
          labelProp: "sale_start_date"
        },
        sale_end_date: {
          type: "date",
          label: "Sale End Date",
          labelProp: "sale_end_date"
        },
        package_volume: {
          type: "number",
          label: "Package Volume",
          labelProp: "package_volume"
        },
        weight_pounds: {
          type: "number",
          label: "Weight (lbs)",
          labelProp: "weight_pounds"
        },
        weight_ounces: {
          type: "number",
          label: "Weight (oz)",
          labelProp: "weight_ounces"
        },
        count_in_stock: {
          type: "number",
          label: "Count in Stock",
          labelProp: "count_in_stock"
        },
        length: {
          type: "number",
          label: "Length",
          labelProp: "length"
        },
        width: {
          type: "number",
          label: "Width",
          labelProp: "width"
        },
        height: {
          type: "number",
          label: "Height",
          labelProp: "height"
        },
        package_length: {
          type: "number",
          label: "Package Length",
          labelProp: "package_length"
        },
        package_width: {
          type: "number",
          label: "Package Width",
          labelProp: "package_width"
        },
        package_height: {
          type: "number",
          label: "Package Height",
          labelProp: "package_height"
        },
        processing_time: {
          type: "multi-select",
          label: "Processing Time",
          labelProp: "processing_time",
          options: ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days"]
        },
        quantity: {
          type: "number",
          label: "Quantity",
          labelProp: "quantity"
        },
        finite_stock: {
          type: "number",
          label: "Finite Stock",
          labelProp: "finite_stock"
        },
        add_on_price: {
          type: "number",
          label: "Add-On Price",
          labelProp: "add_on_price"
        },
        show_add_on: {
          type: "checkbox",
          label: "Show Add-On",
          labelProp: "show_add_on"
        },
        wholesale_product: {
          type: "checkbox",
          label: "Wholesale Product",
          labelProp: "wholesale_product"
        },
        wholesale_price: {
          type: "number",
          label: "Wholesale Price",
          labelProp: "wholesale_price"
        },
        product: {
          type: "autocomplete_single",
          label: "Product",
          options: products.filter((product: any) => product.option === false && product.hidden === false),
          labelProp: "name",
          required: true
        },
        color_product: {
          type: "autocomplete_single",
          label: "Color Product",
          options: products.filter((product: any) => product.option === true),
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
          options: products.filter((product: any) => product.option === true),
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
          options: products.filter((product: any) => product.option === true),
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
          options: products.filter((product: any) => product.option === false && product.hidden === false),
          labelProp: "name"
        },
        is_printing: {
          type: "checkbox",
          label: "Is Printing",
          default: false
        },
        is_manufactured: {
          type: "checkbox",
          label: "Is Manufactured",
          default: false
        },
        is_packaged: {
          type: "checkbox",
          label: "Is Packaged",
          default: false
        },
        secondary_group_name: {
          type: "text",
          label: "Secondary Group Name"
        },
        option_group_name: {
          type: "text",
          label: "Option Group Name"
        },
        reviewed: {
          type: "checkbox",
          label: "Reviewed",
          default: false
        },
        review_email_sent: {
          type: "checkbox",
          label: "Review Email Sent",
          default: false
        }
      }
    },
    messages: {
      type: "array_of_objects",
      title: "Messages",
      fields: {
        message: {
          type: "text",
          label: "Mesage"
        },
        user: {
          type: "checkbox",
          label: "User"
        },
        admin: {
          type: "checkbox",
          label: "Admin"
        }
      }
    },
    shipping: {
      type: "object",
      title: "Shipping",
      fields: {
        shipment_id: {
          type: "text",
          label: "Shipment ID"
        },
        shipping_rate: {
          type: "object",
          label: "Shipping Rate"
        },
        shipping_label: {
          type: "object",
          label: "Shipping Label"
        },
        shipment_tracker: {
          type: "object",
          label: "Shipment Tracker"
        },
        return_shipment_id: {
          type: "text",
          label: "Return Shipment ID"
        },
        return_shipping_rate: {
          type: "object",
          label: "Return Shipping Rate"
        },
        return_shipping_label: {
          type: "object",
          label: "Return Shipping Label"
        },
        return_shipment_tracker: {
          type: "object",
          label: "Return Shipment Tracker"
        },
        first_name: {
          type: "text",
          label: "First Name",
          required: true
        },
        last_name: {
          type: "text",
          label: "Last Name",
          required: true
        },
        email: {
          type: "email",
          label: "Email",
          required: true
        },
        address: {
          type: "text",
          label: "Address"
        },
        address_1: {
          type: "text",
          label: "Address 1",
          required: true
        },
        address_2: {
          type: "text",
          label: "Address 2"
        },
        city: {
          type: "text",
          label: "City",
          required: true
        },
        state: {
          type: "text",
          label: "State",
          required: true
        },
        postalCode: {
          type: "text",
          label: "Postal Code",
          required: true
        },
        international: {
          type: "checkbox",
          label: "International"
        },
        country: {
          type: "text",
          label: "Country",
          required: true
        }
      }
    },
    payment: {
      type: "object",
      title: "Payment",
      fields: {
        paymentMethod: {
          type: "text",
          label: "Payment Method"
        },
        payment: {
          type: "object",
          label: "Payment"
        },
        charge: {
          type: "object",
          label: "Charge"
        },
        refund: {
          type: "array",
          label: "Refund"
        },
        refund_reason: {
          type: "array",
          label: "Refund Reason"
        }
      }
    },
    itemsPrice: {
      type: "number",
      label: "Items Price"
    },
    taxPrice: {
      type: "number",
      label: "Tax Price"
    },
    shippingPrice: {
      type: "number",
      label: "Shipping Price"
    },
    totalPrice: {
      type: "number",
      label: "Total Price"
    },
    refundTotal: {
      type: "number",
      label: "Refund Total"
    },
    guest: {
      type: "checkbox",
      label: "Guest",
      default: false
    },
    isPaid: {
      type: "checkbox",
      label: "Is Paid",
      default: false
    },
    paidAt: {
      type: "date",
      label: "Paid At"
    },
    isReassured: {
      type: "checkbox",
      label: "Is Reassured",
      default: false
    },
    reassuredAt: {
      type: "date",
      label: "Reassured At"
    },
    isManufactured: {
      type: "checkbox",
      label: "Is Manufactured",
      default: false
    },
    manufacturedAt: {
      type: "date",
      label: "Manufactured At"
    },
    isPackaged: {
      type: "checkbox",
      label: "Is Packaged",
      default: false
    },
    packagedAt: {
      type: "date",
      label: "Packaged At"
    },
    isShipped: {
      type: "checkbox",
      label: "Is Shipped",
      default: false
    },
    shippedAt: {
      type: "date",
      label: "Shipped At"
    },
    isInTransit: {
      type: "checkbox",
      label: "Is In Transit",
      default: false
    },
    inTransitAt: {
      type: "date",
      label: "In Transit At"
    },
    isOutForDelivery: {
      type: "checkbox",
      label: "Is Out For Delivery",
      default: false
    },
    outForDeliveryAt: {
      type: "date",
      label: "Out For Delivery At"
    },
    isDelivered: {
      type: "checkbox",
      label: "Is Delivered",
      default: false
    },
    deliveredAt: {
      type: "date",
      label: "Delivered At"
    },
    isRefunded: {
      type: "checkbox",
      label: "Is Refunded",
      default: false
    },
    refundedAt: {
      type: "date",
      label: "Refunded At"
    },
    order_note: {
      type: "text",
      label: "Order Note"
    },
    production_note: {
      type: "text",
      label: "Production Note"
    },
    tip: {
      type: "number",
      label: "Tip"
    },
    promo_code: {
      type: "text",
      label: "Promo Code"
    },
    tracking_number: {
      type: "text",
      label: "Tracking Number"
    },
    tracking_url: {
      type: "text",
      label: "Tracking URL"
    },
    return_tracking_number: {
      type: "text",
      label: "Return Tracking Number"
    },
    is_error: {
      type: "checkbox",
      label: "Is Error",
      default: false
    },
    error_at: {
      type: "date",
      label: "Error At"
    },
    error: {
      type: "json",
      label: "Error"
    },
    deleted: {
      type: "checkbox",
      label: "Deleted",
      default: false
    }
  };
};
