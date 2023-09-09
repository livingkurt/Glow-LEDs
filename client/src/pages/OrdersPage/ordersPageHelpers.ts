import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";
import { daysBetween } from "../../utils/helper_functions";
import { setTimeout } from "timers";
import { Printd } from "printd";
import { set_order } from "../../slices/orderSlice";
// const { printHtml } = require("print-html-element");

export const orderColors = [
  { name: "Not Paid", color: tableColors.inactive },
  { name: "Paid", color: tableColors.active },
  { name: "Updated", color: tableColors.alt_color_5 },
  { name: "Label Created", color: tableColors.alt_color_4 },
  { name: "Crafting", color: tableColors.alt_color_1 },
  { name: "Crafted", color: tableColors.alt_color_1 },
  { name: "Packaged", color: tableColors.alt_color_2 },
  { name: "Shipped", color: tableColors.waiting },
  { name: "Delivered", color: tableColors.completed },
  { name: "International", color: tableColors.alt_color_3 },
  { name: "Paused", color: tableColors.paused },
];

export const determineOrderColors = (order: any) => {
  let result = "";
  if (!order.isPaid) {
    result = tableColors.inactive;
  } else {
    if (order.isPaid) {
      result = tableColors.active;
    }
    if (order.isUpdated) {
      result = tableColors.alt_color_5;
    }
    if (order.shipping.international) {
      result = tableColors.alt_color_3;
    }
    if (order.shipping.shipping_label) {
      result = tableColors.alt_color_4;
    }
    if (order.isCrafting) {
      result = tableColors.alt_color_1;
    }
    if (order.isCrafted) {
      result = tableColors.alt_color_1;
    }
    if (order.isPackaged) {
      result = tableColors.alt_color_2;
    }
    if (order.isShipped) {
      result = tableColors.waiting;
    }
    if (order.isDelivered) {
      result = tableColors.completed;
    }
    if (order.isPaused) {
      result = tableColors.paused;
    }
  }
  return result;
};

// export const daysBetweenWeekdays = (date1: any, date2: any) => {
//   const date_1: any = new Date(date1);
//   const date_2: any = new Date(date2);
//   let diffTime = date_1.getTime() - date_2.getTime();
//   const weekendDays = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) * 2;
//   diffTime = diffTime - weekendDays * (1000 * 60 * 60 * 24);
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays;
// };

export const sinceOrdered = (date: string) => {
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

export const determine_tracking_link = (tracking_number: string) => {
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

export const print_invoice = (contents: any) => {
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

export const print_label = (content: any) => {
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

export const duplicateOrder = (order: any) => {
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

export const sendEmail = (shipping: any) => {
  const email = shipping.email;
  const subject = "About Your Glow LEDs Order";
  const emailBody = "Hi " + shipping.first_name + ",";
  document.location = "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
};

const waitForImagesToLoad = (htmlString: string) => {
  return new Promise<void>(resolve => {
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

export const printLabel = async (label: string) => {
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

export const printInvoice = async (invoice: string) => {
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

export const updateOrderPrices = ({
  orderItems,
  shippingPrice,
  taxPrice,
  tip,
}: {
  orderItems: any;
  shippingPrice: number;
  taxPrice: number;
  tip: number;
}) => {
  let updatedItemsPrice = 0;
  // let updatedTaxPrice = 0;

  orderItems.forEach((item: any) => {
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

export const updatePricesAndDispatch = (updatedOrderItems: any, dispatch: any, order: any) => {
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

export const updateOrderItem = (index: number, value: any, order: any) => {
  console.log({ index, value, order });
  const orderItems = order.orderItems.map((item: any, i: number) => {
    if (i === index) {
      return {
        ...item,
        ...value,
        name: value.name,
        qty: item.qty || 1,
        display_image: value?.images && value?.images[0],
        price: value.price,
        category: value.category,
        pathname: value.pathname,
        package_volume: value.package_volume,
        weight_pounds: value.weight_pounds,
        weight_ounces: value.weight_ounces,
        package_length: value.package_length,
        package_width: value.package_width,
        package_height: value.package_height,
        product_option: value?.product_options?.find((option: any) => option.default === true),
        reviewed: value.reviewed,
        product: value,
        color_products: value.color_products,
        secondary_color_products: value.secondary_color_products,
        option_products: value.option_products,
        secondary_products: value.secondary_products,
        color_group_name: value.color_group_name,
        secondary_color_group_name: value.secondary_color_group_name,
        option_group_name: value.option_group_name,
        secondary_group_name: value.secondary_group_name,
      };
    } else {
      return item;
    }
  });
  return { orderItems };
};
