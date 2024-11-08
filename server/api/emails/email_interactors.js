import QRCode from "qrcode";
import { toCamelCase } from "./email_helpers.js";
import config from "../../config.js";
import nodemailer from "nodemailer";

export const determine_status = status => {
  switch (status) {
    case "delivered":
      return "Your Package has Arrived!";
    case "out_for_delivery":
      return "Your Package is Out for Delivery!";
    case "in_transit":
      return "Your Package is in Transit!";
    case "pre_transit":
      return "Your Label has been Created!";
    case "return_to_sender":
      return "Your Package has been Returned to Sender.";
    case "failure":
      return "Your Package has Failed to Deliver.";

    default:
      return "";
  }
};

export const humanize = str => {
  const frags = str.split("_");
  for (let i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(" ");
};

export const generateTicketQRCodes = async order => {
  const ticketQRCodes = [];
  for (const item of order.orderItems) {
    if (item.itemType === "ticket") {
      for (let i = 0; i < item.quantity; i++) {
        const ticketId = `${order._id}-${item._id}-${i}`;
        const qrCodeDataURL = await QRCode.toDataURL(ticketId);
        ticketQRCodes.push({
          ticketType: item.name,
          qrCode: qrCodeDataURL,
        });
      }
    }
  }
  return ticketQRCodes;
};

export const updateOrder = async (status, order) => {
  if (order.status !== status) {
    order.status = status;
    order[`${toCamelCase(status)}At`] = new Date();
    await order.save();
  } else {
    return order;
  }
};

export const shouldSendEmail = (trackerStatus, orderStatus) => {
  return (
    ["in_transit", "out_for_delivery", "delivered"].includes(trackerStatus) &&
    (orderStatus === "packaged" || trackerStatus !== "in_transit")
  );
};

export const createTransporter = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "7f0417001@smtp-brevo.com", // Your Brevo SMTP login
        pass: config.BREVO_API_KEY, // You'll need to add your Brevo SMTP key here
      },
    });

    return transporter;
  } catch (error) {
    console.error("Error creating transporter:", error);
    return "Error Creating Transporter";
  }
};

export const sendEmail = async emailOptions => {
  const emailTransporter = await createTransporter();
  try {
    if (emailTransporter) {
      await emailTransporter.sendMail(emailOptions);
    }
  } catch (error) {
    console.log({ sendOrderEmail: error });
  }
};
