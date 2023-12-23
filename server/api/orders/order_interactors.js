import mongoose from "mongoose";
import { isEmail } from "../../utils/util";
import order_db from "./order_db";

export const normalizeOrderFilters = input => {
  const output = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "order_status":
        for (const status of input.order_status) {
          switch (status) {
            case "isPaid":
              output["isPaid"] = true;
              output["isCrafting"] = false;
              output["isCrafted"] = false;
              output["isPackaged"] = false;
              output["isShipped"] = false;
              output["isDelivered"] = false;
              break;
            case "isCrafting":
              output["isPaid"] = true;
              output["isCrafting"] = true;
              output["isCrafted"] = false;
              output["isPackaged"] = false;
              output["isShipped"] = false;
              output["isDelivered"] = false;
              break;
            case "isCrafted":
              output["isPaid"] = true;
              output["isCrafting"] = true;
              output["isCrafted"] = true;
              output["isPackaged"] = false;
              output["isShipped"] = false;
              output["isDelivered"] = false;
              break;
            case "isPackaged":
              output["isPaid"] = true;
              output["isCrafting"] = true;
              output["isCrafted"] = true;
              output["isPackaged"] = true;
              output["isShipped"] = false;
              output["isDelivered"] = false;
              break;
            case "isShipped":
              output["isPaid"] = true;
              output["isCrafting"] = true;
              output["isCrafted"] = true;
              output["isPackaged"] = true;
              output["isShipped"] = true;
              output["isDelivered"] = false;
              break;
            case "isInTransit":
              output["isPaid"] = true;
              output["isCrafting"] = true;
              output["isCrafted"] = true;
              output["isPackaged"] = true;
              output["isShipped"] = true;
              output["isInTransit"] = true;
              output["isOutForDelivery"] = false;
              output["isDelivered"] = false;
              break;
            case "isOutForDelivery":
              output["isPaid"] = true;
              output["isCrafting"] = true;
              output["isCrafted"] = true;
              output["isPackaged"] = true;
              output["isShipped"] = true;
              output["isInTransit"] = true;
              output["isOutForDelivery"] = true;
              output["isDelivered"] = false;
              break;
            case "isDelivered":
              output["isPaid"] = true;
              output["isCrafting"] = true;
              output["isCrafted"] = true;
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
          output["user"] = user;
        }
        break;
      case "carrier":
        for (const carrier of input.carrier) {
          if (carrier === "ups") {
            output["shipping.shipping_rate.carrier"] = "UPSDAP";
          } else if (carrier === "fedex") {
            output["shipping.shipping_rate.carrier"] = "Fedex";
          } else if (carrier === "usps") {
            output["shipping.shipping_rate.carrier"] = "USPS";
          }
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
  return output;
};

export const normalizeOrderSearch = query => {
  let search = {};
  const USPS_REGEX = /^[0-9]{20,22}$/; // Matches USPS tracking numbers
  const FEDEX_REGEX = /^[0-9]{12,15}$/; // Matches FedEx tracking numbers
  const UPS_REGEX = /^1Z[A-Z0-9]{16}$/; // Matches UPS tracking numbers

  if (query.search && query.search.match(/^[0-9a-fA-F]{24}$/)) {
    search = query.search ? { _id: new mongoose.Types.ObjectId(query.search) } : {};
  } else if (query.search && isEmail(query.search)) {
    search = query.search
      ? {
          $expr: {
            $regexMatch: {
              input: "$shipping.email",
              regex: query.search,
              options: "i",
            },
          },
        }
      : {};
  } else if (query.search && query.search.substring(0, 1) === "#") {
    search = query.search
      ? {
          promo_code: query.search.slice(1, query.search.length),
        }
      : {};
  } else if (query.search && query.search.match(USPS_REGEX)) {
    search = query.search
      ? {
          tracking_number: query.search,
        }
      : {};
  } else if (query.search && query.search.match(UPS_REGEX)) {
    search = query.search
      ? {
          tracking_number: query.search,
        }
      : {};
  } else if (query.search && query.search.match(FEDEX_REGEX)) {
    search = query.search
      ? {
          tracking_number: query.search,
        }
      : {};
  } else {
    search = query.search
      ? {
          $expr: {
            $regexMatch: {
              input: {
                $concat: ["$shipping.first_name", " ", "$shipping.last_name"],
              },
              regex: query.search,
              options: "i",
            },
          },
        }
      : {};
  }
  return search;
};

export const getCodeUsage = async ({ promo_code, start_date, end_date, sponsor, sponsorTeamCaptain }) => {
  try {
    const sort = {};

    const filter = {
      deleted: false,
      isPaid: true,
      createdAt: {
        $gte: start_date,
        $lte: end_date,
      },
      promo_code: new RegExp(promo_code, "i"),
    };

    const limit = "0";
    const page = "1";

    const orders = await order_db.findAll_orders_db(filter, sort, limit, page);

    const number_of_uses = orders
      .filter(order => order.promo_code)
      .filter(order => order.promo_code.toLowerCase() === promo_code.toLowerCase()).length;
    const revenue = orders
      .filter(order => order.promo_code)
      .filter(order => order.promo_code.toLowerCase() === promo_code.toLowerCase())
      .reduce(
        (a, order) =>
          a +
          order.itemsPrice -
          (order.payment.refund ? order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100 : 0),
        0
      );
    let earnings = revenue * 0.1;
    if (sponsor === true || sponsor === "true") {
      earnings = revenue * 0.15;
    }
    if (sponsorTeamCaptain === true || sponsorTeamCaptain === "true") {
      earnings = revenue * 0.2;
    }
    return { number_of_uses, revenue, earnings };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
