export const emptyOrder = {
  user: {},
  orderItems: [
    {
      name: "",
      qty: 0,
      display_image: "",
      secondary_image: "",
      color: "",
      secondary_color: "",
      color_group_name: "",
      is_printing: false,
      is_crafting: false,
      is_crafted: false,
      is_packaged: false,
      secondary_color_group_name: "",
      secondary_color_code: "",
      secondary_group_name: "",
      option_group_name: "",
      color_code: "",
      price: 0,
      add_on_price: 0,
      show_add_on: false,
      category: "",
      count_in_stock: 0,
      subcategory: "",
      pathname: "",
      size: "",
      preorder: false,
      sale_price: 0,
      package_volume: 0,
      weight_pounds: 0,
      weight_ounces: 0,
      length: 0,
      width: 0,
      height: 0,
      package_length: 0,
      package_width: 0,
      package_height: 0,
      reviewed: false,
      review_email_sent: false,
      product_option: {}, // Initialize based on productOptionsSchema if needed
      product: null,
      color_product: null,
      color_product_name: "",
      secondary_color_product: null,
      secondary_color_product_name: "",
      option_product_name: "",
      option_product: null,
      secondary_product_name: "",
      secondary_product: null,
    },
  ],
  messages: [],
  shipping: {
    shipment_id: "",
    shipping_rate: {},
    shipping_label: {},
    shipment_tracker: {},
    return_shipment_id: "",
    return_shipping_rate: {},
    return_shipping_label: {},
    return_shipment_tracker: {},
    first_name: "",
    last_name: "",
    email: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postalCode: "",
    international: "",
    country: "",
  },
  payments: [{ paymentMethod: "stripe", payment: {}, charge: {}, refund: [], refund_reason: "" }],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  refundTotal: 0,
  guest: false,
  status: "unpaid",
  paidAt: "",
  isReassured: false,
  reassuredAt: "",
  craftingAt: "",
  craftedAt: "",
  packagedAt: "",
  shippedAt: "",
  inTransitAt: "",
  outForDeliveryAt: "",
  deliveredAt: "",
  isRefunded: false,
  isPaused: false,
  pausedAt: "",
  parcel: {},
  refundedAt: "",
  order_note: "",
  production_note: "",
  tip: 0,
  promo_code: "",
  tracking_number: "",
  tracking_url: "",
  return_tracking_number: "",
  is_error: false,
  error_at: "",
  error: false,
};
