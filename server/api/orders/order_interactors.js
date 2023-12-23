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
    const matchFilter = {
      deleted: false,
      isPaid: true,
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
    console.log({ error });
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// export const getCodeUsage = async ({ promo_code, start_date, end_date, sponsor, sponsorTeamCaptain }) => {
//   console.log({ promo_code, start_date, end_date, sponsor, sponsorTeamCaptain });
//   try {
//     const sort = {};

//     const filter = {
//       deleted: false,
//       isPaid: true,
//       createdAt: {
//         $gte: start_date,
//         $lte: end_date,
//       },
//       promo_code: new RegExp(promo_code, "i"),
//     };

//     const limit = "0";
//     const page = "1";

//     const orders = await order_db.findAll_orders_db(filter, sort, limit, page);

//     const number_of_uses = orders
//       .filter(order => order.promo_code)
//       .filter(order => order.promo_code.toLowerCase() === promo_code.toLowerCase()).length;
//     const revenue = orders
//       .filter(order => order.promo_code)
//       .filter(order => order.promo_code.toLowerCase() === promo_code.toLowerCase())
//       .reduce(
//         (a, order) =>
//           a +
//           Number(order.itemsPrice) -
//           (order.payment.refund ? order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100 : 0),
//         0
//       );
//     let earnings = revenue * 0.1;
//     if (sponsor === true || sponsor === "true") {
//       earnings = revenue * 0.15;
//     }
//     if (sponsorTeamCaptain === true || sponsorTeamCaptain === "true") {
//       earnings = revenue * 0.2;
//     }
//     console.log({ number_of_uses, revenue, earnings });
//     return { number_of_uses, revenue, earnings };
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     }
//   }
// };

// const aggregationPipeline1 = [
//   { $match: matchFilter },
//   { $sort: { itemsPrice: -1 } }, // Sort by itemsPrice in descending order
//   { $limit: 1 }, // Limit to 1 document to get the highest itemsPrice document
//   {
//     $project: {
//       _id: 1, // Include the _id field
//       itemsPrice: 1, // Include the itemsPrice for confirmation
//     },
//   },
// ];

// const highestPriceResult = await Order.aggregate(aggregationPipeline1);
// console.log(JSON.stringify(highestPriceResult, null, 2));
// // const aggregationPipeline1 = [
// //   { $match: matchFilter },
// //   { $sort: { itemsPrice: -1 } }, // Sort by itemsPrice to see the highest values
// //   { $limit: 10 }, // Limit to 10 documents for easier inspection
// //   {
// //     $group: {
// //       _id: 1,
// //       number_of_uses: { $sum: 1 },
// //       totalRevenue: { $sum: "$itemsPrice" },
// //       highestItemPrice: { $max: "$itemsPrice" }, // Check the highest itemsPrice
// //       sampleOrders: { $push: "$$ROOT" }, // Push sample documents for inspection
// //     },
// //   },
// //   {
// //     $project: {
// //       number_of_uses: 1,
// //       totalRevenue: 1,
// //       highestItemPrice: 1,
// //       // sampleOrders: { $slice: ["$sampleOrders", 5] }, // Limit to 5 sample documents
// //     },
// //   },
// // ];

// const debugResults = await Order.aggregate(aggregationPipeline1);
// console.log(JSON.stringify(debugResults, null, 2));
