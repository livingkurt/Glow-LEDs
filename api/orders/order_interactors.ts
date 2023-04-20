// export const normalizeOrderFilters = (input: any) => {
//   const output: any = {};
//   for (const status of input.order_status) {
//     output[status] = true;
//   }
//   return output;
// };
export const normalizeOrderFilters = (input: any) => {
  const output: any = {};
  Object.keys(input).forEach(key => {
    if (key === "order_status") {
      for (const status of input.order_status) {
        switch (status) {
          case "isPaid":
            output["isPaid"] = true;
            output["isManufactured"] = false;
            output["isPackaged"] = false;
            output["isShipped"] = false;
            output["isDelivered"] = false;
            break;
          case "isManufactured":
            output["isPaid"] = true;
            output["isManufactured"] = true;
            output["isPackaged"] = false;
            output["isShipped"] = false;
            output["isDelivered"] = false;
            break;
          case "isPackaged":
            output["isPaid"] = true;
            output["isManufactured"] = true;
            output["isPackaged"] = true;
            output["isShipped"] = false;
            output["isDelivered"] = false;
            break;
          case "isShipped":
            output["isPaid"] = true;
            output["isManufactured"] = true;
            output["isPackaged"] = true;
            output["isShipped"] = true;
            output["isDelivered"] = false;
            break;
          case "isInTransit":
            output["isPaid"] = true;
            output["isManufactured"] = true;
            output["isPackaged"] = true;
            output["isShipped"] = true;
            output["isInTransit"] = true;
            output["isOutForDelivery"] = false;
            output["isDelivered"] = false;
            break;
          case "isOutForDelivery":
            output["isPaid"] = true;
            output["isManufactured"] = true;
            output["isPackaged"] = true;
            output["isShipped"] = true;
            output["isInTransit"] = true;
            output["isOutForDelivery"] = true;
            output["isDelivered"] = false;
            break;
          case "isDelivered":
            output["isPaid"] = true;
            output["isManufactured"] = true;
            output["isPackaged"] = true;
            output["isShipped"] = true;
            output["isInTransit"] = true;
            output["isOutForDelivery"] = true;
            output["isDelivered"] = true;
            break;
          case "isRefunded":
            output["isPaid"] = true;
            output["isRefunded"] = true;
            break;
        }
      }
    } else if (key === "shipping") {
      for (const shipping of input.shipping) {
        output[`shipping.${shipping}`] = true;
      }
    }
  });
  return output;
};
