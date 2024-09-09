import QRCode from "qrcode";

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
