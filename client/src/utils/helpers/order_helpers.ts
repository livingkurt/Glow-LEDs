import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const colors = [
  { name: "Not Paid", color: "#6d3e3e" },
  { name: "Paid", color: "#3e4c6d" },
  { name: "Paused", color: "#33323e" },
  { name: "Crafting", color: "#4b7188" },
  { name: "Crafted", color: "#4b7188" },
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
