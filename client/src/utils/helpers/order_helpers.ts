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
  let colors = [
    { name: "Not Paid", color: "#6d3e3e" },
    { name: "Paid", color: "#3e4c6d" },
    { name: "Manufactured", color: "#4b7188" },
    { name: "Packaged", color: "#6f5f7d" },
    { name: "Shipped", color: "#636363" },
    { name: "Delivered", color: "#333333" },
    { name: "Priority", color: "#874d72" },
    { name: "Label Created", color: "#31887c" },
    { name: "Paused", color: "#33323e" }
    // { name: 'Refunded', color: '#a9a9a9' }
  ];
  let result = "";
  if (!order.isPaid) {
    result = colors[0].color;
  } else {
    if (order.isPaid) {
      result = colors[1].color;
    }
    if (!(order.shipping.shipping_rate.service === "First" || order.shipping.shipping_rate.service === "ParcelSelect")) {
      result = colors[6].color;
    }
    if (order.shipping.shipping_label) {
      result = colors[7].color;
    }
    if (order.isManufactured) {
      result = colors[2].color;
    }
    if (order.isPackaged) {
      result = colors[3].color;
    }
    if (order.isShipped) {
      result = colors[4].color;
    }
    if (order.isDelivered) {
      result = colors[5].color;
    }
    if (order.isPaused) {
      result = colors[8].color;
    }
  }

  // if (order.isRefunded) {
  // 	result = colors[6].color;
  // }
  return result;
};
