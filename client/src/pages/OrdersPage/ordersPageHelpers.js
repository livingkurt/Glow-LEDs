import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";
import { daysBetween, determineItemsTotal } from "../../utils/helper_functions";
import { Printd } from "printd";
import { set_order } from "../../slices/orderSlice";
import config from "../../config";
import { io } from "socket.io-client";
import { formatDate } from "../../utils/helpers/universal_helpers";
import { getActiveOptions, getSelectedOptions } from "../ProductPage/productHelpers";

export const orderStatusColors = {
  unpaid: { name: "Unpaid", color: "#6d3e3e" },
  paid: { name: "Paid", color: "#3e4c6d" },
  paid_pre_order: { name: "Paid Pre-Order", color: "#304648" },
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
  isPrintIssue: { name: "isPrintIssue", color: "#6a0027" },
};

export const determineOrderColors = order => {
  let result = orderStatusColors[order.status]?.color;

  if (order.isUpdated) {
    result = "#4d3a63";
  }
  if (order.isPrintIssue) {
    result = "#6a0027";
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
  const numDays = daysBetween(formatDate(today), formatDate(date));
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
  const html = `<div style="width: 100%; height: auto;">
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

export const updateOrderPrices = ({ orderItems = [], shippingPrice = 0, taxRate = 0, tip = 0 }) => {
  console.log({ orderItems, shippingPrice, taxRate, tip });
  let itemsPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  console.log({ itemsPrice });
  let taxPrice = itemsPrice * taxRate;
  console.log({ taxPrice });
  let totalPrice = itemsPrice + taxPrice + shippingPrice + tip;
  console.log({ totalPrice });

  return { itemsPrice, taxPrice, totalPrice };
};

export const updatePricesAndDispatch = (updatedOrderItems, dispatch, order) => {
  const updatedPrices = updateOrderPrices({
    orderItems: updatedOrderItems,
    shippingPrice: order.shippingPrice,
    taxPrice: order.taxPrice,
    taxRate: order.taxRate,
    tip: order.tip,
  });

  const finalUpdatedOrder = {
    ...order,
    orderItems: updatedOrderItems,
    ...updatedPrices,
  };

  dispatch(set_order(finalUpdatedOrder));
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

export const handleProductChange = (index, value, dispatch, isUpdatePricesActive) => {
  const order = value; // Use the latest order state
  const product = order.orderItems[index].product;

  const updatedOrderItems = order.orderItems.map((item, i) => {
    if (i === index) {
      return {
        itemType: "product",
        product: product,
        name: product.name,
        short_description: product.short_description,
        fact: product.fact,
        images: product.images,
        set_of: product.set_of,
        original_images: product.images,
        display_image_object: product.images[0],
        category: product.category,
        subcategory: product.subcategory,
        product_collection: product.product_collection,
        facts: product.facts,
        included_items: product.included_items,
        price: product.price,
        chips: product.chips,
        tags: product.tags,
        wholesale_price: product.wholesale_price,
        previous_price: product.previous_price,
        sale_price: product.sale_price,
        size: product.size,
        max_display_quantity: product.max_display_quantity,
        max_quantity: product.max_quantity,
        quantity: item.quantity || 1, // Keep existing quantity or default to 1
        count_in_stock: product.count_in_stock,
        pathname: product.pathname,
        sale_start_date: product.sale_start_date,
        sale_end_date: product.sale_end_date,
        dimensions: product.dimensions,
        processing_time: product.processing_time,
        rating: product.rating,
        wholesale_product: product.wholesale_product,
        isPreOrder: product.isPreOrder,
        preOrderReleaseDate: product.preOrderReleaseDate,
        preOrderQuantity: product.preOrderQuantity,
        selectedOptions: getSelectedOptions(product),
        currentOptions: getActiveOptions(product),
      };
    } else {
      return item;
    }
  });

  let updatedPrices = {};

  if (isUpdatePricesActive) {
    updatedPrices = updateOrderPrices({
      orderItems: updatedOrderItems, // Use updatedOrderItems directly
      shippingPrice: order.shippingPrice || 0,
      taxPrice: order.taxPrice || 0,
      taxRate: order.taxRate || 0,
      tip: order.tip || 0,
    });
  }

  const finalUpdatedOrder = {
    ...order,
    orderItems: updatedOrderItems, // Corrected here
    ...updatedPrices,
  };

  dispatch(set_order(finalUpdatedOrder));
};

export const handleTicketChange = (index, value, dispatch, isUpdatePricesActive) => {
  const order = value; // Use the latest order state

  const ticket = order.orderItems[index].ticket;

  const updatedOrderItems = order.orderItems.map((item, i) => {
    if (i === index) {
      return {
        itemType: "ticket",
        ticket,
        event: order?.event?._id,
        quantity: order.orderItems[index].quantity,
        max_display_quantity: ticket.max_display_quantity,
        max_quantity: ticket.max_quantity,
        price: ticket.price,
        name: ticket.title,
        color: ticket.color,
        finite_stock: ticket.finite_stock,
        ticket_type: ticket.ticket_type,
        display_image_object: ticket?.image,
        count_in_stock: ticket.count_in_stock,
      };
    } else {
      return item;
    }
  });

  let updatedPrices = {};

  if (isUpdatePricesActive) {
    updatedPrices = updateOrderPrices({
      orderItems: updatedOrderItems, // Corrected here
      shippingPrice: order.shippingPrice || 0,
      taxPrice: order.taxPrice || 0,
      taxRate: order.taxRate || 0,
      tip: order.tip || 0,
    });
  }

  const finalUpdatedOrder = {
    ...order,
    orderItems: updatedOrderItems, // Corrected here
    ...updatedPrices,
  };

  dispatch(set_order(finalUpdatedOrder));
};

export const handleQtyChange = (value, dispatch, order, isUpdatePricesActive) => {
  let updatedPrices = {};
  let updatedOrderItems = [...order.orderItems]; // assuming orderItems is an array

  // Assuming value.orderItems contains the updated 'quantity'
  updatedOrderItems = value.orderItems;

  if (isUpdatePricesActive) {
    updatedPrices = updateOrderPrices({
      orderItems: updatedOrderItems,
      shippingPrice: order.shippingPrice,
      taxPrice: order.taxPrice,
      taxRate: order.taxRate,
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

export const handlePromoCode = (value, dispatch) => {
  const promoCodeData = value.promo_code;
  const order = value; // Use the latest order state
  let { itemsPrice, shippingPrice, taxPrice } = order;

  if (promoCodeData) {
    if (promoCodeData.percentage_off) {
      const discount = itemsPrice * (promoCodeData.percentage_off / 100);
      itemsPrice -= discount;
    } else if (promoCodeData.amount_off) {
      itemsPrice -= promoCodeData.amount_off;
    }

    if (promoCodeData.free_shipping) {
      shippingPrice = 0;
    }

    // Recalculate taxPrice and totalPrice
    taxPrice = itemsPrice * order.taxRate;
    const totalPrice = itemsPrice + taxPrice + shippingPrice + order.tip;

    const updatedOrder = {
      ...order,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      promo_code: promoCodeData.promo_code,
    };

    dispatch(set_order(updatedOrder));
  } else {
    // Handle removal of promo code
  }
};

export const nextStatus = (currentStatus, orderItems) => {
  const hasFiniteStock = orderItems.some(item => item.finite_stock === true);
  const hasInfiniteStock = orderItems.some(item => item.finite_stock === false || item.finite_stock === undefined);

  if (hasFiniteStock && !hasInfiniteStock) {
    switch (currentStatus) {
      case "paid":
        return "label_created";
      case "label_created":
        return "packaged";
      default:
        return currentStatus;
    }
  }

  if (hasInfiniteStock) {
    switch (currentStatus) {
      case "paid":
        return "crafting";
      case "crafting":
        return "crafted";
      case "crafted":
        return "packaged";
      default:
        return currentStatus;
    }
  }

  // Handle the case when all items have undefined finite_stock
  if (!hasFiniteStock && !hasInfiniteStock) {
    switch (currentStatus) {
      case "paid":
        return "label_created";
      case "label_created":
        return "packaged";
      default:
        return currentStatus;
    }
  }

  return currentStatus;
};
const URL = () => {
  switch (config.REACT_APP_ENVIRONMENT) {
    case "production":
      return "https://www.glow-leds.com";
    case "staging":
      return "https://glow-leds-dev.herokuapp.com";
    default:
      return "http://localhost:8080";
  }
};
export const socket = io(URL(), { autoConnect: false, transports: ["websocket"] });
