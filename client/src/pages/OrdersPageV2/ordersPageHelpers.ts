import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";
import { daysBetween } from "../../utils/helper_functions";

export const colors = [
  { name: "Not Paid", color: "#6d3e3e" },
  { name: "Paid", color: "#3e4c6d" },
  { name: "Paused", color: "#33323e" },
  { name: "Manufactured", color: "#4b7188" },
  { name: "Packaged", color: "#6f5f7d" },
  { name: "Shipped", color: "#636363" },
  { name: "Delivered", color: "#333333" },
  { name: "Priority", color: "#874d72" },
  { name: "Label Created", color: "#31887c" }
  // { name: 'Refunded', color: '#a9a9a9' }
];

export const determine_color = (order: any) => {
  let result = "";
  if (!order.isPaid) {
    result = tableColors.inactive;
  } else {
    if (order.isPaid) {
      result = tableColors.active;
    }
    if (!(order?.shipping?.shipping_rate?.service === "First" || order?.shipping?.shipping_rate?.service === "ParcelSelect")) {
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
    return "Ordered Today";
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
