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
