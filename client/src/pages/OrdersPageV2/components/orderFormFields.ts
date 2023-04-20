export const orderFormFields = ({
  users,
  parcels,
  setState,
  order,
  onEdit
}: {
  users: any;
  parcels: any;
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
      getOptionLabel: (option: any) => `${option.shipping.first_name} ${option.shipping.last_name}`
    },
    orderItems: {
      type: "array_of_objects",
      title: "Order Items",
      fields: {
        name: {
          type: "text",
          label: "Name",
          required: true
        },
        qty: {
          type: "number",
          label: "Quantity",
          required: true
        },
        display_image: {
          type: "text",
          label: "Display Image",
          required: true
        },
        secondary_image: {
          type: "text",
          label: "Secondary Image"
        },
        color: {
          type: "text",
          label: "Color"
        },
        secondary_color: {
          type: "text",
          label: "Secondary Color"
        },
        color_group_name: {
          type: "text",
          label: "Color Group Name"
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
        secondary_color_group_name: {
          type: "text",
          label: "Secondary Color Group Name"
        },
        secondary_color_code: {
          type: "text",
          label: "Secondary Color Code"
        },
        secondary_group_name: {
          type: "text",
          label: "Secondary Group Name"
        },
        option_group_name: {
          type: "text",
          label: "Option Group Name"
        },
        color_code: {
          type: "text",
          label: "Color Code"
        },
        price: {
          type: "number",
          label: "Price",
          required: true
        },
        add_on_price: {
          type: "number",
          label: "Add-on Price"
        },
        show_add_on: {
          type: "checkbox",
          label: "Show Add-on"
        },
        category: {
          type: "text",
          label: "Category",
          required: true
        },
        count_in_stock: {
          type: "number",
          label: "Count in Stock"
        },
        subcategory: {
          type: "text",
          label: "Subcategory"
        },
        pathname: {
          type: "text",
          label: "Pathname"
        },
        size: {
          type: "text",
          label: "Size"
        },
        preorder: {
          type: "checkbox",
          label: "Preorder"
        },
        sale_price: {
          type: "number",
          label: "Sale Price"
        },
        package_volume: {
          type: "number",
          label: "Package Volume"
        },
        weight_pounds: {
          type: "number",
          label: "Weight (Pounds)"
        },
        weight_ounces: {
          type: "number",
          label: "Weight (Ounces)"
        },
        length: {
          type: "number",
          label: "Length"
        },
        width: {
          type: "number",
          label: "Width"
        },
        height: {
          type: "number",
          label: "Height"
        },
        package_length: {
          type: "number",
          label: "Package Length"
        },
        package_width: {
          type: "number",
          label: "Package Width"
        },
        package_height: {
          type: "number",
          label: "Package Height"
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
        },
        product: {
          type: "select",
          label: "Product",
          ref: "Product",
          required: true
        },
        color_product: {
          type: "select",
          label: "Color Product",
          ref: "Product"
        },
        color_product_name: {
          type: "text",
          label: "Color Product Name"
        },
        secondary_color_product: {
          type: "select",
          label: "Secondary Color Product",
          ref: "Product"
        },
        secondary_color_product_name: {
          type: "text",
          label: "Secondary Color Product Name"
        },
        option_product_name: {
          type: "text",
          label: "Option Product Name"
        },
        option_product: {
          type: "select",
          label: "Option Product",
          ref: "Product"
        },
        secondary_product_name: {
          type: "text",
          label: "Secondary Product Name"
        },
        secondary_product: {
          type: "select",
          label: "Secondary Product",
          ref: "Product"
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
