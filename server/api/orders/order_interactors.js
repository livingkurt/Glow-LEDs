import mongoose from "mongoose";
import { determine_code_tier, isEmail } from "../../utils/util";
import order_db from "./order_db";
import Order from "./order";
import { User } from "../users";
import { normalizeCustomerInfo, normalizePaymentInfo } from "../payments/payment_helpers";
import {
  createOrUpdateCustomer,
  createPaymentIntent,
  confirmPaymentIntent,
  logStripeFeeToExpenses,
  updateOrder,
} from "../payments/payment_interactors";
import { code_used, order } from "../../email_templates/pages";
import config from "../../config";
import { Affiliate } from "../affiliates";
import order_services from "./order_services";
import App from "../../email_templates/App";
import ticketEmail from "../../email_templates/pages/ticketEmail";
import { generateTicketQRCodes } from "../emails/email_interactors";
import { createTransporter } from "../emails/email_helpers";
import { promo_db } from "../promos";
const bcrypt = require("bcryptjs");

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
            case "Paid Pre Order":
              output["status"] = "paid_pre_order";
              break;
            case "Canceled":
              output["status"] = "canceled";
              break;
            case "isPrioritized":
              output["isPrioritized"] = true;
              break;
            case "isPrintIssue":
              output["isPrintIssue"] = true;
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
      status: { $nin: ["unpaid", "canceled"] },
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
      status: { $nin: ["unpaid", "canceled"] },
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

export const handleUserCreation = async (shipping, create_account, new_password) => {
  console.log({ shipping, create_account, new_password });
  try {
    const { email, first_name, last_name } = shipping;
    const lowercaseEmail = email.toLowerCase();

    console.log({ lowercaseEmail, first_name, last_name });

    // Check if user exists
    let user = await User.findOne({ email: lowercaseEmail });

    if (!user) {
      // Create new user if email doesn't exist
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(create_account ? new_password : config.TEMP_PASS, salt);

      user = await User.create({
        email: lowercaseEmail,
        first_name,
        last_name,
        isVerified: true,
        email_subscription: true,
        guest: !create_account,
        password: hashedPassword,
      });
    } else {
      // Update existing user
      const updateData = {
        first_name: first_name || user.first_name,
        last_name: last_name || user.last_name,
        email_subscription: true,
        guest: !create_account,
      };

      if (!user.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(create_account ? new_password : config.TEMP_PASS, salt);
      }

      await User.updateOne({ _id: user._id }, updateData);
      user = await User.findOne({ _id: user._id });
    }

    return user._id;
  } catch (error) {
    console.error("Error in handleUserCreation:", error);
    throw new Error("Failed to create or find user");
  }
};

export const processPayment = async (orderId, paymentMethod, totalPrice) => {
  try {
    const order = await Order.findById(orderId).populate("user");
    const current_userrmation = normalizeCustomerInfo({ shipping: order.shipping, paymentMethod });
    const paymentInformation = normalizePaymentInfo({ totalPrice });
    const customer = await createOrUpdateCustomer(current_userrmation);
    const paymentIntent = await createPaymentIntent(customer, paymentInformation);
    const confirmedPayment = await confirmPaymentIntent(paymentIntent, paymentMethod.id);
    await logStripeFeeToExpenses(confirmedPayment);

    // Check if the order contains pre-order items
    const hasPreOrderItems = order.orderItems.some(item => item.isPreOrder);

    // Update the order, maintaining "paid_pre_order" status if necessary
    const updatedOrder = await updateOrder(order, confirmedPayment, paymentMethod, hasPreOrderItems);

    return updatedOrder;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw new Error(error);
  }
};
export const sendEmail = async (type, emailOptions) => {
  const emailTransporter = await createTransporter(type);
  try {
    if (emailTransporter) {
      await emailTransporter.sendMail(emailOptions);
    }
  } catch (error) {
    console.log({ sendOrderEmail: error });
  }
};
export const sendOrderEmail = async orderData => {
  try {
    const bodyConfirmation = {
      email: {
        h1: "YOUR ORDER HAS BEEN PLACED! 🎉",
        h2: "We are starting production on your order! We will notify your as your order progresses.",
      },
      title: "Thank you for your purchase!",
      order: orderData,
    };
    const mailOptionsConfirmation = {
      from: config.DISPLAY_INFO_EMAIL,
      to: orderData.shipping.email,
      subject: "Thank you for your Glow LEDs Order",
      html: App({ body: order(bodyConfirmation), unsubscribe: false }),
    };
    await sendEmail("contact", mailOptionsConfirmation);
  } catch (error) {
    console.error("Error sending order email:", error);
    throw new Error("Failed to send order email");
  }
};

export const sendTicketEmail = async orderData => {
  try {
    const ticketQRCodes = await generateTicketQRCodes(orderData);
    const bodyTickets = {
      email: {
        h1: "YOUR EVENT TICKETS",
        h2: "Here are your QR codes for event entry.",
      },
      title: "Your Event Tickets",
      order: orderData,
      ticketQRCodes,
    };
    const mailOptionsTickets = {
      from: config.DISPLAY_INFO_EMAIL,
      to: orderData.shipping.email,
      subject: "Your Event Tickets",
      html: App({ body: ticketEmail(bodyTickets), unsubscribe: false }),
    };
    if (orderData.orderItems.every(item => item.itemType === "ticket")) {
      await order_db.update_orders_db(orderData._id, { status: "delivered", deliveredAt: new Date() });
    }
    await sendEmail("contact", mailOptionsTickets);
  } catch (error) {
    console.error("Error sending ticket email:", error);
    throw new Error("Failed to send ticket email");
  }
};

export const sendCodeUsedEmail = async promo_code => {
  try {
    const today = new Date();
    const first_of_month = new Date(today.getFullYear(), today.getMonth(), 1);
    const promo = await promo_db.findBy_promos_db({ promo_code: promo_code.toLowerCase(), deleted: false });

    if (promo) {
      const affiliates = await Affiliate.find({ deleted: false });
      const affiliate = affiliates.find(affiliate => affiliate.public_code.toString() === promo._id.toString());

      if (affiliate) {
        const users = await User.find({ deleted: false, is_affiliated: true });
        const user = users.find(user => user?.affiliate?.toString() === affiliate._id.toString());

        const stats = await order_services.code_usage_orders_s(
          { promo_code },
          { start_date: first_of_month, end_date: today, sponsor: affiliate.artist_name }
        );

        const mailBodyData = {
          name: affiliate.artist_name,
          promo_code: promo_code,
          percentage_off: determine_code_tier(affiliate, stats.number_of_uses),
          number_of_uses: stats.number_of_uses,
          earnings: affiliate.sponsor ? stats.revenue * 0.15 : stats.revenue * 0.1,
        };

        const mailOptions = {
          from: config.DISPLAY_INFO_EMAIL,
          to: user.email,
          subject: `Your code was just used!`,
          html: App({
            body: code_used(mailBodyData),
            unsubscribe: false,
          }),
        };
        await sendEmail("contact", mailOptions);
      }
    }
  } catch (error) {
    throw new Error("Failed to send code used email");
  }
};

export const splitOrderItems = orderItems => {
  const preOrderItems = orderItems.filter(item => item.isPreOrder);
  const nonPreOrderItems = orderItems.filter(item => !item.isPreOrder);
  return { preOrderItems, nonPreOrderItems };
};

export const createSplitOrder = async (originalOrder, items, userId, isPreOrder = false, shipping_rate) => {
  const { itemsPrice, shippingPrice, taxPrice } = calculateOrderPrices(items, originalOrder, shipping_rate);

  const splitOrder = {
    ...originalOrder,
    orderItems: items,
    shipping: {
      ...originalOrder.shipping,
      shipping_rate,
      shipment_id: shipping_rate?.id,
    },
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice: parseFloat(itemsPrice) + parseFloat(shippingPrice) + parseFloat(taxPrice),
    user: userId,
    hasPreOrderItems: isPreOrder,
    preOrderShippingDate: isPreOrder ? originalOrder.preOrderShippingDate : null,
  };

  return await Order.create(splitOrder);
};

export const calculateOrderPrices = (items, originalOrder, shipping_rate) => {
  const itemsPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingPrice = originalOrder.shipping.international
    ? shipping_rate?.rate
    : shipping_rate?.list_rate || shipping_rate?.rate || 0;
  const taxPrice = originalOrder?.taxRate ? itemsPrice * originalOrder?.taxRate : 0;

  return { itemsPrice, shippingPrice, taxPrice };
};
