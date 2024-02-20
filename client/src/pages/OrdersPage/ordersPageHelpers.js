import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";
import { daysBetween, determine_total } from "../../utils/helper_functions";
import { Printd } from "printd";
import { set_order } from "../../slices/orderSlice";
import config from "../../config";
import { io } from "socket.io-client";

export const orderStatusColors = {
  unpaid: { name: "Unpaid", color: "#6d3e3e" },
  paid: { name: "Paid", color: "#3e4c6d" },
  label_created: { name: "Label Created", color: "#276e64" },
  crafting: { name: "Crafting", color: "#4b7188" },
  crafted: { name: "Crafted", color: "#3c596a" },
  packaged: { name: "Packaged", color: "#6f5f7d" },
  shipped: { name: "Shipped", color: "#898989" },
  in_transit: { name: "In Transit", color: "#707070" },
  out_for_delivery: { name: "Out for Delivery", color: "#4f4f4f" },
  delivered: { name: "Delivered", color: "#333333" },
  return_label_created: { name: "Return Label Created", color: "#1e544c" },
  canceled: { name: "Canceled", color: "#2f0000" },
};
export const orderExceptionStatusColors = {
  isPrioritized: { name: "isPrioritized", color: "#c4891e" },
  isPaused: { name: "isPaused", color: "#33323e" },
  isUpdated: { name: "isUpdated", color: "#4d3a63" },
};

export const determineOrderColors = order => {
  let result = orderStatusColors[order.status]?.color;

  if (order.isUpdated) {
    result = "#4d3a63";
  }
  if (order.isPaused) {
    result = "#33323e";
  }
  if (order.isPrioritized) {
    result = "#c4891e";
  }

  return result;
};

// export const daysBetweenWeekdays = (date1, date2) => {
//   const date_1 = new Date(date1);
//   const date_2 = new Date(date2);
//   let diffTime = date_1.getTime() - date_2.getTime();
//   const weekendDays = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) * 2;
//   diffTime = diffTime - weekendDays * (1000 * 60 * 60 * 24);
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays;
// };

export const sinceOrdered = date => {
  const today = new Date();
  const numDays = daysBetween(today, date);
  if (numDays === 0) {
    return "Today";
  } else {
    // const weekdays = numDays - Math.floor(numDays / 7) * 2;
    return numDays > 1 ? `${numDays} Days` : `${numDays} Day`;
    // return weekdays > 1 ? `${weekdays} Days` : `${weekdays} Day`;
  }
};

export const determine_tracking_link = tracking_number => {
  const USPS_REGEX = /^[0-9]{20,22}$/; // Matches USPS tracking numbers
  const FEDEX_REGEX = /^[0-9]{12,15}$/; // Matches FedEx tracking numbers
  const UPS_REGEX = /^1Z[A-Z0-9]{16}$/; // Matches UPS tracking numbers
  if (tracking_number) {
    if (tracking_number.match(USPS_REGEX)) {
      return `https://www.ups.com/track?tracknum=${tracking_number}`;
    } else if (tracking_number.match(UPS_REGEX)) {
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking_number}`;
    } else if (tracking_number.match(FEDEX_REGEX)) {
      return `https://www.fedex.com/apps/fedextrack/?tracknumbers=${tracking_number}`;
    }
  }
};

export const print_invoice = contents => {
  // // const contents = document.getElementById(id).innerHTML;
  // const frame1 = document.createElement("iframe");
  // frame1.name = "frame1";
  // frame1.style.position = "absolute";
  // frame1.style.top = "-1000000px";
  // document.body.appendChild(frame1);
  // const frameDoc = frame1.contentWindow
  //   ? frame1.contentWindow
  //   : frame1?.contentDocument?.document
  //   ? frame1?.contentDocument?.document
  //   : frame1.contentDocument;
  // frameDoc.document.open();
  // frameDoc.document.write("</head><body>");
  // frameDoc.document.write(contents);
  // frameDoc.document.write("</body></html>");
  // frameDoc.document.close();
  // setTimeout(function () {
  //   window.frames["frame1"].focus();
  //   window.frames["frame1"].print();
  //   document.body.removeChild(frame1);
  // }, 500);
  return false;
};

export const print_label = content => {
  // // const content = document.getElementById(id).innerHTML;
  // const frame1 = document.createElement("iframe");
  // frame1.name = "frame1";
  // frame1.style.position = "absolute";
  // frame1.style.top = "-1000000px";
  // document.body.appendChild(frame1);
  // const frameDoc = frame1.contentWindow
  //   ? frame1.contentWindow
  //   : frame1?.contentDocument?.document
  //   ? frame1?.contentDocument?.document
  //   : frame1.contentDocument;
  // frameDoc.document.open();
  // frameDoc.document.write("</head><body>");
  // frameDoc.document.write(`<div style="width: 100%;
  // display: flex;
  // height: 100%;
  // align-items: center;;">
  //     <img style="margin: auto; text-align: center;" src="${content}" alt="label" />
  // </div>`);
  // frameDoc.document.write("</body></html>");
  // frameDoc.document.close();
  // setTimeout(function () {
  //   window.frames["frame1"].focus();
  //   window.frames["frame1"].print();
  //   document.body.removeChild(frame1);
  // }, 500);
  return false;
};

export const duplicateOrder = order => {
  return {
    orderItems: order.orderItems,
    shipping: {
      ...order.shipping,
      shipment_id: null,
      shipping_rate: null,
      shipment_tracker: null,
      shipping_label: null,
      return_shipment_id: null,
      return_shipping_rate: null,
      return_shipment_tracker: null,
      return_shipping_label: null,
    },
    itemsPrice: order.itemsPrice,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: order?.user?._id,
    order_note: `Replacement Order for ${order.shipping.first_name} ${order.shipping.last_name} - Original Order Number is ${order._id}`,
    production_note: order.production_note,
    return_tracking_url: "",
    tracking_url: "",
    return_tracking_number: "",
    tracking_number: "",
  };
};

export const sendEmail = shipping => {
  const email = shipping.email;
  const subject = "About Your Glow LEDs Order";
  const emailBody = "Hi " + shipping.first_name + ",";
  document.location = "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
};

const waitForImagesToLoad = htmlString => {
  return new Promise(resolve => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const images = doc.querySelectorAll("img");
    let imagesLoaded = 0;

    if (images.length === 0) {
      resolve();
    } else {
      images.forEach(img => {
        const tmpImage = new Image();
        tmpImage.src = img.src;
        tmpImage.onload = () => {
          imagesLoaded++;
          if (imagesLoaded === images.length) {
            resolve();
          }
        };
        tmpImage.onerror = () => {
          imagesLoaded++;
          if (imagesLoaded === images.length) {
            resolve();
          }
        };
      });
    }
  });
};

export const printLabel = async label => {
  const html = `<div style="width: 100%;
  display: flex;
  height: auto;
  padding: 40px;
  align-items: center;">
      <img style="margin: auto; text-align: center;" src="${label}" alt="label" />
  </div>`;
  await waitForImagesToLoad(html);

  const d = new Printd();
  const container = document.createElement("div");
  container.innerHTML = html;
  d.print(container, [
    `
    html {
    color: black;
    font-family: helvetica, sans-serif;
  }
`,
  ]);
};

export const printInvoice = async invoice => {
  await waitForImagesToLoad(invoice);

  const d = new Printd();
  const container = document.createElement("div");
  container.innerHTML = invoice;
  d.print(container, [
    `
  html {
    color: black;
    font-family: helvetica, sans-serif;
  }
`,
  ]);
};

export const updateOrderPrices = ({ orderItems, shippingPrice, taxPrice, tip }) => {
  let updatedItemsPrice = 0;
  // let updatedTaxPrice = 0;

  orderItems.forEach(item => {
    updatedItemsPrice += item.price * item.qty;
  });

  // Assuming a tax rate of 10% (customize as needed)
  // updatedTaxPrice = updatedItemsPrice * 0.1;

  const updatedTotalPrice = updatedItemsPrice + taxPrice + shippingPrice + tip;

  return {
    itemsPrice: updatedItemsPrice,
    totalPrice: updatedTotalPrice,
  };
};

export const updatePricesAndDispatch = (updatedOrderItems, dispatch, order) => {
  const updatedPrices = updateOrderPrices({
    orderItems: updatedOrderItems,
    shippingPrice: order.shippingPrice,
    taxPrice: order.taxPrice,
    tip: order.tip,
  });

  const finalUpdatedOrder = {
    ...order,
    orderItems: updatedOrderItems,
    ...updatedPrices,
  };

  dispatch(set_order(finalUpdatedOrder));
};

export const updateOrderItem = (index, value, order) => {
  const orderItems = order.orderItems.map((item, i) => {
    if (i === index) {
      return {
        name: value.name,
        qty: item.qty || 1,
        display_image: value?.images_object && value?.images_object[0].link,
        price: value?.price,
        color: value?.color,
        color_code: value?.color_code,
        secondary_color: value?.secondary_color,
        secondary_color_code: value?.secondary_color_code,
        category: value?.category,
        subcategory: value?.subcategory,
        product_collection: value?.product_collection,
        size: value?.size,
        count_in_stock: value?.count_in_stock,
        pathname: value?.pathname,
        package_volume: value?.package_volume,
        weight_pounds: value?.weight_pounds,
        weight_ounces: value?.weight_ounces,
        package_length: value?.package_length,
        package_width: value?.package_width,
        package_height: value?.package_height,
        reviewed: value?.reviewed,
        product: value,
        color_products: value?.color_products.map(product => product._id),
        secondary_color_products: value?.secondary_color_products.map(product => product._id),
        option_products: value?.option_products.map(product => product._id),
        secondary_products: value?.secondary_products.map(product => product._id),
        color_group_name: value?.color_group_name,
        secondary_color_group_name: value?.secondary_color_group_name,
        option_group_name: value?.option_group_name,
        secondary_group_name: value?.secondary_group_name,
      };
    } else {
      return item;
    }
  });
  return { orderItems };
};

// orderLogic.js

export const handleDelete = (value, dispatch, order, isUpdatePricesActive) => {
  const updatedOrderItems = [...value.orderItems];
  if (isUpdatePricesActive) {
    updatePricesAndDispatch(updatedOrderItems, dispatch, order);
  }
};

export const handleDuplicate = (value, dispatch, order, isUpdatePricesActive) => {
  const updatedOrderItems = [...value.orderItems];
  if (isUpdatePricesActive) {
    updatePricesAndDispatch(updatedOrderItems, dispatch, order);
  }
};

export const handleProductChange = (index, value, dispatch, order, isUpdatePricesActive) => {
  const updatedOrderItems = updateOrderItem(index, value.orderItems[index].product, order);
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

  dispatch(set_order(finalUpdatedOrder));
};

export const handleQtyChange = (value, dispatch, order, isUpdatePricesActive) => {
  let updatedPrices = {};
  let updatedOrderItems = [...order.orderItems]; // assuming orderItems is an array

  // Assuming value.orderItems contains the updated 'qty'
  updatedOrderItems = value.orderItems;

  if (isUpdatePricesActive) {
    updatedPrices = updateOrderPrices({
      orderItems: updatedOrderItems,
      shippingPrice: order.shippingPrice,
      taxPrice: order.taxPrice,
      tip: order.tip,
    });
  }

  const finalUpdatedOrder = {
    ...order,
    orderItems: updatedOrderItems,
    ...updatedPrices,
  };

  dispatch(set_order(finalUpdatedOrder));
};

export const handlePromoCode = (value, order, dispatch) => {
  // Get the original itemsPrice from the determine_total function
  const originalItemsPrice = determine_total(order.orderItems, false);
  const promoCodeData = value.promo_code;
  let { taxPrice, shippingPrice } = order; // Assuming these are part of your order state

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

    const updatedOrder = {
      itemsPrice,
      totalPrice: newTotalPrice,
      shippingPrice,
      promo_code: promoCodeData.promo_code,
    };

    // Dispatch the updated order state
    dispatch(set_order(updatedOrder));
  } else {
    const updatedOrder = {
      itemsPrice: originalItemsPrice,
      totalPrice: originalItemsPrice + taxPrice + shippingPrice,
      shippingPrice,
      promo_code: "",
    };

    // Dispatch the updated order state
    dispatch(set_order(updatedOrder));
  }
};

export const nextStatus = (status, titleCase = false) => {
  switch (status) {
    case "unpaid":
      return titleCase ? "Paid" : "paid";
    case "label_created":
      return titleCase ? "Crafting" : "crafting";
    case "crafting":
      return titleCase ? "Crafted" : "crafted";
    case "crafted":
      return titleCase ? "Packaged" : "packaged";
    default:
      return titleCase ? "Unpaid" : "unpaid";
  }
};

const URL = () => {
  switch (config.REACT_APP_ENVIRONMENT) {
    case "production":
      console.log({ URL: "https://www.glow-leds.com", env: config.REACT_APP_ENVIRONMENT });
      return "https://www.glow-leds.com";
    case "staging":
      console.log({ URL: "https://glow-leds-dev.herokuapp.com", env: config.REACT_APP_ENVIRONMENT });
      return "https://glow-leds-dev.herokuapp.com";
    default:
      console.log({ URL: "http://localhost:8080", env: config.REACT_APP_ENVIRONMENT });
      return "http://localhost:8080";
  }
};
export const socket = io(URL(), { autoConnect: false });
