import { humanize, toCapitalize } from "../../../utils/helper_functions";
import { sharedItemSchema } from "../../../utils/helpers/universal_helpers";

export const orderFormFields = ({
  usersQuery,
  productsQuery,
  promos,
  all_shipping,
  parcels,
  order,
  categorysQuery,
  eventsQuery,
  ticketsQuery,
}) => {
  return {
    user: {
      type: "autocomplete_single",
      label: "User",
      options: !usersQuery?.isLoading ? usersQuery?.data?.filter(user => user.first_name && user.last_name) : [],
      labelProp: "user",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`,
    },
    itemsPrice: {
      type: "number",
      label: "Items Price",
    },
    taxPrice: {
      type: "number",
      label: "Tax Price",
    },
    shippingPrice: {
      type: "number",
      label: "Shipping Price",
    },
    serviceFee: {
      type: "number",
      label: "Service Fee",
    },
    totalPrice: {
      type: "number",
      label: "Total Price",
    },
    refundTotal: {
      type: "number",
      label: "Refund Total",
    },
    guest: {
      type: "checkbox",
      label: "Guest",
      default: false,
    },
    status: {
      type: "autocomplete_single",
      label: "Status",
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: [
        "unpaid",
        "paid",
        "crafting",
        "crafted",
        "packaged",
        "shipped",
        "in_transit",
        "out_for_delivery",
        "delivered",
      ],
    },
    isReassured: {
      type: "checkbox",
      label: "Is Reassured",
      default: false,
    },
    reassuredAt: {
      type: "date",
      label: "Reassured At",
    },
    isPaused: {
      type: "checkbox",
      label: "Is Paused",
      default: false,
    },
    pausedAt: {
      type: "date",
      label: "Paused At",
    },

    isUpdated: {
      type: "checkbox",
      label: "Is Updated",
      default: false,
    },

    isRefunded: {
      type: "checkbox",
      label: "Is Refunded",
      default: false,
    },
    refundedAt: {
      type: "date",
      label: "Refunded At",
    },
    paidAt: {
      type: "date",
      label: "Paid At",
    },

    craftingAt: {
      type: "date",
      label: "Crafting At",
    },

    craftedAt: {
      type: "date",
      label: "Crafted At",
    },

    packagedAt: {
      type: "date",
      label: "Packaged At",
    },

    shippedAt: {
      type: "date",
      label: "Shipped At",
    },

    inTransitAt: {
      type: "date",
      label: "In Transit At",
    },

    outForDeliveryAt: {
      type: "date",
      label: "Out For Delivery At",
    },

    deliveredAt: {
      type: "date",
      label: "Delivered At",
    },

    pickupAt: {
      type: "date",
      label: "Pickup At",
    },

    order_note: {
      type: "text",
      label: "Order Note",
    },
    production_note: {
      type: "text",
      label: "Production Note",
    },
    tip: {
      type: "number",
      label: "Tip",
    },
    parcel: {
      type: "autocomplete_single",
      label: "Parcels",
      options: parcels,
      labelProp: "parcel",
      getOptionLabel: parcel => {
        if (!parcel) {
          return "";
        }

        let { type, length, width, height } = parcel;
        if (type && length && width) {
          if (type === "bubble_mailer") {
            return `${humanize(type)} - ${length} X ${width}`;
          } else if (height) {
            return `${humanize(type)} - ${length} X ${width} X ${height}`;
          }
        }

        return "";
      },
    },
    // promo_code: {
    //   type: "text",
    //   label: "Promo Code",
    // },
    promo_code: {
      type: "autocomplete_single",
      label: "Promp Code",
      options: promos,
      getOptionLabel: option => option.promo_code,
      isOptionEqualToValue: option => option,
      labelProp: "promo_code",
      valueAttribute: "promo_code",
    },
    tracking_number: {
      type: "text",
      label: "Tracking Number",
    },
    tracking_url: {
      type: "text",
      label: "Tracking URL",
    },
    return_tracking_number: {
      type: "text",
      label: "Return Tracking Number",
    },
    return_tracking_url: {
      type: "text",
      label: "Return Tracking Number",
    },
    is_error: {
      type: "checkbox",
      label: "Is Error",
      default: false,
    },
    error_at: {
      type: "date",
      label: "Error At",
    },
    error: {
      type: "json",
      label: "Error",
    },
    shipping: {
      type: "object",
      title: "Shipping",
      label: "Choose Shipping",
      options: !all_shipping?.isLoading && all_shipping?.data?.filter(user => user.first_name && user.last_name),
      labelProp: "shipping",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`,
      fields: {
        shipment_id: {
          type: "text",
          label: "Shipment ID",
        },
        return_shipment_id: {
          type: "text",
          label: "Return Shipment ID",
        },
        first_name: {
          type: "text",
          label: "First Name",
          required: true,
        },
        last_name: {
          type: "text",
          label: "Last Name",
          required: true,
        },
        email: {
          type: "text",
          label: "Email",
          required: true,
        },
        address_1: {
          type: "text",
          label: "Address 1",
          required: true,
        },
        address_2: {
          type: "text",
          label: "Address 2",
        },
        city: {
          type: "text",
          label: "City",
          required: true,
        },
        state: {
          type: "text",
          label: "State",
          required: true,
        },
        postalCode: {
          type: "text",
          label: "Postal Code",
          required: true,
        },
        phone_number: {
          type: "text",
          label: "Phone Number",
          required: true,
        },
        international: {
          type: "checkbox",
          label: "International",
        },
        country: {
          type: "text",
          label: "Country",
          required: true,
        },
      },
    },
    payment: {
      type: "object",
      title: "Payment",
      fields: {
        paymentMethod: {
          type: "text",
          label: "Payment Method",
        },
        // payment: {
        //   type: "object",
        //   label: "Payment",
        // },
        // charge: {
        //   type: "object",
        //   label: "Charge",
        // },
        // refund: {
        //   type: "array",
        //   label: "Refund",
        // },
        // refund_reason: {
        //   type: "array",
        //   label: "Refund Reason",
        // },
      },
    },
    orderItems: sharedItemSchema({
      productsQuery,
      eventsQuery,
      ticketsQuery,
      categorysQuery,
      itemType: "order",
      item: order,
    }),
    messages: {
      type: "array",
      title: "Messages",
      itemSchema: {
        type: "object",
        fields: {
          message: {
            type: "text",
            label: "Message",
          },
          user: {
            type: "checkbox",
            label: "User",
          },
          admin: {
            type: "checkbox",
            label: "Admin",
          },
        },
      },
    },
  };
};
