import mongoose from "mongoose";
import { isEmail } from "../../utils/util";
import order_db from "./order_db";
import Order from "./order";

export const normalizeOrderFilters = input => {
  const output = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "order_status":
        for (const status of input.order_status) {
          switch (status) {
            case "Unpaid":
              output["status"] = "unpaid";
              break;
            case "Paid":
              output["status"] = "paid";
              break;
            case "Label Created":
              output["status"] = "label_created";
              break;
            case "Crafting":
              output["status"] = "crafting";
              break;
            case "Crafted":
              output["status"] = "crafted";
              break;
            case "Packaged":
              output["status"] = "packaged";
              break;
            case "Shipped":
              output["status"] = "shipped";
              break;
            case "In Transit":
              output["status"] = "in_transit";
              break;
            case "Out For Delivery":
              output["status"] = "out_for_delivery";
              break;
            case "Delivered":
              output["status"] = "delivered";
              break;
            case "isRefunded":
              output["isRefunded"] = true;
              break;
            case "isPaused":
              output["isPaused"] = true;
              break;
            case "Return Label Created":
              output["status"] = "return_label_created";
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
      case "Unpaid":
        if (!input.Paid.includes(1)) {
          output["status"] = "unpaid";
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
    const matchFilter = {
      deleted: false,
      status: "paid",
      createdAt: { $gte: new Date(start_date), $lte: new Date(end_date) },
      promo_code: new RegExp(`^${promo_code}$`, "i"), // Adjusted to match the entire string
    };

    let earningsMultiplier = 0.1;
    if (sponsor === true || sponsor === "true") {
      earningsMultiplier = 0.15;
    }
    if (sponsorTeamCaptain === true || sponsorTeamCaptain === "true") {
      earningsMultiplier = 0.2;
    }

    const aggregationPipeline = [
      { $match: matchFilter },
      {
        $group: {
          _id: null,
          number_of_uses: { $sum: 1 },
          revenue: { $sum: "$itemsPrice" },
          totalRefund: { $sum: { $ifNull: [{ $sum: "$refunds.amount" }, 0] } }, // Assuming refunds are in the 'refunds' array
        },
      },
      {
        $project: {
          number_of_uses: 1,
          revenue: 1,
          earnings: { $multiply: ["$revenue", earningsMultiplier] },
          totalRefund: 1,
        },
      },
      {
        $addFields: {
          revenue: { $subtract: ["$revenue", { $divide: ["$totalRefund", 100] }] },
        },
      },
    ];

    const results = await Order.aggregate(aggregationPipeline);
    if (results.length === 0) {
      return { number_of_uses: 0, revenue: 0, earnings: 0 };
    }

    const { number_of_uses, revenue, earnings } = results[0];

    return { number_of_uses, revenue, earnings };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getMonthlyCodeUsage = async ({ promo_code, start_date, end_date, sponsor, sponsorTeamCaptain }) => {
  try {
    const matchFilter = {
      deleted: false,
      status: "paid",
      createdAt: { $gte: new Date(start_date), $lte: new Date(end_date) },
      promo_code: new RegExp(`^${promo_code}$`, "i"),
    };

    let earningsMultiplier = 0.1;
    if (sponsor === true || sponsor === "true") {
      earningsMultiplier = 0.15;
    }
    if (sponsorTeamCaptain === true || sponsorTeamCaptain === "true") {
      earningsMultiplier = 0.2;
    }

    const aggregationPipeline = [
      { $match: matchFilter },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          number_of_uses: { $sum: 1 },
          revenue: { $sum: "$itemsPrice" },
          totalRefund: { $sum: { $ifNull: [{ $sum: "$refunds.amount" }, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          number_of_uses: 1,
          revenue: 1,
          earnings: { $multiply: ["$revenue", earningsMultiplier] },
          totalRefund: 1,
        },
      },
      {
        $addFields: {
          revenue: { $subtract: ["$revenue", { $divide: ["$totalRefund", 100] }] },
        },
      },
    ];

    const results = await Order.aggregate(aggregationPipeline);
    return results;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
