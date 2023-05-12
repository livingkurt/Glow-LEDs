import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";
import { daysBetween } from "../../utils/helper_functions";
import { setTimeout } from "timers";
import { Printd } from "printd";
// const { printHtml } = require("print-html-element");

export const orderColors = [
  { name: "Not Paid", color: tableColors.inactive },
  { name: "Paid", color: tableColors.active },
  { name: "Label Created", color: tableColors.alt_color_4 },
  { name: "Manufactured", color: tableColors.alt_color_1 },
  { name: "Packaged", color: tableColors.alt_color_2 },
  { name: "Shipped", color: tableColors.waiting },
  { name: "Delivered", color: tableColors.completed },
  { name: "International", color: tableColors.alt_color_3 },
  { name: "Paused", color: tableColors.paused }
];

export const determineOrderColors = (order: any) => {
  let result = "";
  if (!order.isPaid) {
    result = tableColors.inactive;
  } else {
    if (order.isPaid) {
      result = tableColors.active;
    }
    if (order.shipping.international) {
      result = tableColors.alt_color_3;
    }
    if (order.shipping.shipping_label) {
      result = tableColors.alt_color_4;
    }
    if (order.isManufactured) {
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
  if (tracking_number) {
    if (tracking_number.startsWith("1Z")) {
      return `https://www.ups.com/track?tracknum=${tracking_number}`;
    } else if (tracking_number.length === 22) {
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking_number}`;
    } else if (tracking_number.startsWith("927")) {
      return `https://www.dhl.com/en/express/tracking.html?tracking_number=${tracking_number}`;
    } else if (tracking_number.startsWith("LX")) {
      return `https://www.ups.com/track?loc=en_us&tracknum=${tracking_number}`;
    } else if (tracking_number.startsWith("C")) {
      return `https://www.fedex.com/apps/fedextrack/?tracknumbers=${tracking_number}`;
    } else if (tracking_number.startsWith("S")) {
      return `https://www.dhl.com/en/express/tracking.html?tracking_number=${tracking_number}`;
    } else if (tracking_number.startsWith("CJ")) {
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking_number}`;
    } else if (tracking_number.startsWith("9")) {
      return `https://www.fedex.com/apps/fedextrack/?tracknumbers=${tracking_number}`;
    } else {
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking_number}`;
    }
  }
};

export const print_invoice = (contents: any) => {
  // const contents = document.getElementById(id).innerHTML;
  const frame1 = document.createElement("iframe");
  frame1.name = "frame1";
  frame1.style.position = "absolute";
  frame1.style.top = "-1000000px";
  document.body.appendChild(frame1);
  const frameDoc = frame1.contentWindow
    ? frame1.contentWindow
    : frame1?.contentDocument?.document
    ? frame1?.contentDocument?.document
    : frame1.contentDocument;
  frameDoc.document.open();
  frameDoc.document.write("</head><body>");
  frameDoc.document.write(contents);
  frameDoc.document.write("</body></html>");
  frameDoc.document.close();
  setTimeout(function () {
    window.frames["frame1"].focus();
    window.frames["frame1"].print();
    document.body.removeChild(frame1);
  }, 500);
  return false;
};

export const print_label = (content: any) => {
  // const content = document.getElementById(id).innerHTML;
  const frame1 = document.createElement("iframe");
  frame1.name = "frame1";
  frame1.style.position = "absolute";
  frame1.style.top = "-1000000px";
  document.body.appendChild(frame1);
  const frameDoc = frame1.contentWindow
    ? frame1.contentWindow
    : frame1?.contentDocument?.document
    ? frame1?.contentDocument?.document
    : frame1.contentDocument;
  frameDoc.document.open();
  frameDoc.document.write("</head><body>");
  frameDoc.document.write(`<div style="width: 100%;
  display: flex;
  height: 100%;
  align-items: center;;">
      <img style="margin: auto; text-align: center;" src="${content}" alt="label" />
  </div>`);
  frameDoc.document.write("</body></html>");
  frameDoc.document.close();
  setTimeout(function () {
    window.frames["frame1"].focus();
    window.frames["frame1"].print();
    document.body.removeChild(frame1);
  }, 500);
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
      return_shipping_label: null
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
    tracking_number: ""
  };
};

export const sendEmail = (message: string, order: any) => {
  const email = order.shipping.email;
  const subject = "About Your Glow LEDs Order";
  const emailBody = "Hi " + order.user.first_name + ",";
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
  font-family: Helvetica;
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
`
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
`
  ]);
};

// export const printLabel = async (label: string) => {
//   const html = `<div style="width: 100%;
//   display: flex;
//   height: auto;
//   padding: 40px;
//   align-items: center;">
//       <img style="margin: auto; text-align: center;" src="${label}" alt="label" />
//   </div>`;
//   await waitForImagesToLoad(html);
//   printHtml(html);
// };

// export const printInvoice = async (invoice: string) => {
//   await waitForImagesToLoad(invoice);
//   printHtml(invoice);
// };
