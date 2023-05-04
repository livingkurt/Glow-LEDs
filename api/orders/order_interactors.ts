import mongoose from "mongoose";
import { isEmail } from "../../util";

export const normalizeOrderFilters = (input: any) => {
  const output: any = {};
  console.log({ input });
  Object.keys(input).forEach(key => {
    switch (key) {
      case "order_status":
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
        break;
      case "shipping":
        for (const shipping of input.shipping) {
          output[`shipping.${shipping}`] = true;
        }
        break;
      case "user":
        for (const user of input.user) {
          console.log({ user: user });
          output["user"] = user;
        }
        break;
      case "isPaid":
        if (!input.isPaid.includes(1)) {
          output["isPaid"] = false;
        }
        break;

      default:
        break;
    }
  });
  console.log({ output });
  return output;
};

export const normalizeOrderSearch = (query: any) => {
  let search = {};
  console.log({ search: query.search.match(/^[0-9a-fA-F]{24}$/, query) });
  if (query.search && query.search.match(/^[0-9a-fA-F]{24}$/)) {
    search = query.search ? { _id: mongoose.Types.ObjectId(query.search) } : {};
  } else if (query.search && isEmail(query.search)) {
    search = query.search
      ? {
          $expr: {
            $regexMatch: {
              input: "$shipping.email",
              regex: query.search,
              options: "i"
            }
          }
        }
      : {};
  } else if (query.search && query.search.substring(0, 1) === "#") {
    search = query.search
      ? {
          promo_code: query.search.slice(1, query.search.length).toLowerCase()
        }
      : {};
  } else {
    search = query.search
      ? {
          $expr: {
            $regexMatch: {
              input: {
                $concat: ["$shipping.first_name", " ", "$shipping.last_name"]
              },
              regex: query.search,
              options: "i"
            }
          }
        }
      : {};
  }
  return search;
};
