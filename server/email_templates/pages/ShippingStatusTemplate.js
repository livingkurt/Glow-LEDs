import { format_date, determine_tracking_link, shipping_status_steps } from "../../utils/util.js";
import Price from "../components/Price.js";
import { isColorLight } from "../email_template_helpers.js";

const determine_emoji = status => {
  switch (status) {
    case "delivered":
      return "🏠";
    case "out_for_delivery":
      return "🚀";
    case "in_transit":
      return "🚚";
    case "pre_transit":
      return "🏷️";
    case "return_to_sender":
      return "🔙";
    case "failure":
      return "❌";
    default:
      break;
  }
};

const determineColor = status => {
  switch (status) {
    case "delivered":
      return "#5c8883";
    case "out_for_delivery":
      return "#5c7088";
    case "in_transit":
      return "#5e5c88";
    case "pre_transit":
      return "#775c88";
    case "return_to_sender":
      return "#636363";
    case "failure":
      return "#636363";
    default:
      break;
  }
};

const determine_message = status => {
  switch (status) {
    case "delivered":
      return "your items have been delivered! Please let us know if you have any questions or concerns.";
    case "out_for_delivery":
      return "your items are out for delivery! Be on the lookout for your package.";
    case "in_transit":
      return "your items are in transit! We will notify you when your items have been delivered.";
    case "pre_transit":
      return "your label has been created and is waiting to be scanned by the carrier.";
    case "return_to_sender":
      return "your package has been returned to sender. Please contact us if you have any questions or concerns.";
    case "failure":
      return "your package has failed to deliver. Please contact us if you have any questions or concerns.";

    default:
  }
};

const createOrderItemsHTML = (orderItems, isWholesaler) => {
  return orderItems
    .map(
      item => `
    <tr>
      <td style='font-family: helvetica;'>
        <table style='width: 100%; border-spacing: 0; border-bottom: 1px white solid;'>
          <tbody>
            <tr style='width: 100%'>
              <td style='font-family: helvetica'>
                <table style='border-spacing: 0px; width: 100%; margin: 10px auto;'>
                  <tbody>
                    <tr>
                      <td style='font-family: helvetica;'>
                        <div style='margin-bottom: 10px; margin-right: 10px;'>
                          <img src="${item?.display_image_object?.link}" alt="${item.name}" width="70"
                            height="70" style='border-radius: 8px; object-fit: cover;' title="Product Image" />
                        </div>
                      </td>
                     <td style='font-family:helvetica;width:100%;'>
                        <span style='font-size:16px;font-weight:600;line-height:1.4;color:white;'>
                          ${item.name}
                        </span>
                        <br />

                          <div style="font-size:25px;font-weight:600;color:black">
                          ${item.selectedOptions
                            .map((option, optionIndex) => {
                              if (
                                option.name &&
                                option.name.length > 0 &&
                                item.currentOptions[optionIndex]?.name &&
                                item.currentOptions[optionIndex]?.name.length > 0
                              ) {
                                const backgroundColor = option?.filament?.colorCode || option?.colorCode || "white";
                                const textColor =
                                  backgroundColor !== "white"
                                    ? isColorLight(backgroundColor)
                                      ? "black"
                                      : "white"
                                    : "black";
                                return `
                                  <span style='
                              display: inline-block;
                              padding: 4px 8px;
                              margin: 2px;
                              border-radius: 16px;
                              font-size: 12px;
                              font-weight: 500;
                              background-color: ${backgroundColor};
                              color: ${textColor};
                            '>
                              ${item.currentOptions[optionIndex].name}: ${option.name}
                            </span>
                                  `;
                              }
                              return "";
                            })
                            .filter(Boolean)
                            .join("")}
                          </div>
                      </td>
                      <td style='font-family:helvetica;width:100%;white-space:nowrap;'>
                        <p style='color:white;line-height:150%;font-size:16px;font-weight:600;margin:0 0 0 15px;'
                          align="right">
                          ${item.quantity > 1 ? item.quantity + "x" : ""}${Price(item, "white", isWholesaler)}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  `
    )
    .join("");
};

export default ({ order, status, title, tracker, isReturnTracking = false }) => {
  try {
    const orderItemsHTML = createOrderItemsHTML(order.orderItems, order?.user?.isWholesaler);

    return `
      <table style="width:100%;border-spacing:0;padding:10px">
        <tr>
          <td style="font-family:helvetica;border:0">
            <center>
              <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white">
                <tr>
                  <td style="font-family:helvetica;color:white">
                    <h1 style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:#333333;font-size:50px; padding-bottom: 7px;">
                      ${order.shipping.first_name.toUpperCase()},
                    </h1>
                    <h1 style="text-align:center;font-family:helvetica;width:100%;margin:0px;line-height:50px;color:#333333;font-size:30px; padding-bottom: 7px;">
                      ${title.toUpperCase()} ${determine_emoji(status)}
                    </h1>
                  </td>
                </tr>
              </table>
              <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;">
                <tbody>
                  <tr>
                    <td style="font-family:helvetica">
                      <table style="width:100%;line-height:inherit;text-align:center" width="100%" align="left">
                        <tbody>
                          <tr>
                            <td style="vertical-align:top;color:#333333;font-size:20px" valign="top" align="center">
                              <strong>Order #:</strong>
                              ${order._id}<br /><strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="vertical-align:top;color:#333333;font-size:20px" valign="top" align="center">
                              <strong>${tracker?.carrier} Tracking #:</strong>
                              <a style="color:#333333; padding: 15px 0px;border:none; font-family:helvetica;"
                                href="${isReturnTracking ? order?.return_tracking_url : order?.tracking_url}" target="_blank">${isReturnTracking ? order?.return_tracking_number : order?.tracking_number}</a><br />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; ">
                <tbody>
                  <tr>
                    <td style="font-family:helvetica">
                      ${shipping_status_steps(order, status, isReturnTracking)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: ${determineColor(status)}; border-radius: 20px; padding:15px;">
                <tbody>
                  <tr>
                    <td style="font-family:helvetica">
                      <p style="color:white;line-height:150%;font-size:16px;margin:0">
                        ${
                          order.isRefunded
                            ? `
                          <h3 style='font-family: helvetica;'>
                            Your Order has been refunded for ${order.payment.refund_reason[order.payment.refund_reason.length - 1]}
                            on ${format_date(order.refundedAt)}
                          </h3>`
                            : `<p style='font-size: 16px;line-height: 30px;'>
                            Hi ${order.shipping.first_name}, ${determine_message(status)}
                          </p>`
                        }
                      </p>
                      <p style="font-size: 18px; text-align: center;">Estimated Delivery Date: <strong>${format_date(tracker?.est_delivery_date)}</strong></p>
                      <table style="width:100%;border-spacing:0;margin-top:20px">
                        <tbody>
                          <tr>
                            <td style="font-family:helvetica;border-radius:10px" align="center" bgcolor="${status === "shipped" ? "#4c4f60" : "#6a6c80"}"; margin-left:10px; border-spacing: 2px;>
                              <a style="font-size:16px;text-decoration:none;display:block;color:white;border:none; padding: 15px 0px; font-weight: 800;"
                                href="https://www.glow-leds.com/secure/account/order/${order._id}">VIEW ORDER</a>
                            </td>
                            ${
                              status !== "shipped"
                                ? `
                              <td style="font-family:helvetica;border-radius:4px; padding: 3px;" align="center"></td>
                              <td style="font-family:helvetica;border-radius:10px; margin-right:10px; padding: 15px 0px; border-spacing: 2px;"
                                align="center" bgcolor="#4c4f60">
                                <a style="font-size:16px;text-decoration:none;display:block;color:white;border:none; font-family:helvetica; font-weight: 800;"
                                  target="_blank" href="https://www.glow-leds.com/">WEBSITE</a>
                              </td>`
                                : ""
                            }
                          </tr>
                        </tbody>
                      </table>
                      <table style="width:100%;border-spacing:0;margin-top:20px">
                        <tbody>
                          <tr style="font-family:helvetica;line-height:0em; padding-top: 10px;">
                            <td style="font-family:helvetica;border-radius:10px; margin-right:10px; padding: 10px;border-spacing: 2px;" colspan="3" align="center" bgcolor="#6a6c80">
                              <a style="font-size:20px;text-decoration:none;display:block;color:white; padding: 15px 0px;border:none; font-family:helvetica; font-weight: 800;"
                                href="${order.tracking_url ? order.tracking_url : determine_tracking_link(order.tracking_number)}" target="_blank">TRACK YOUR ORDER</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;padding:10px;margin:10px auto; background-color: ${determineColor(status)}; border-radius: 20px;">
                <tbody>
                  <tr>
                    <td style="font-family:helvetica">
                      <table style="width:100%; max-width:560px;border-spacing:0;">
                        <tr>
                          <td style="font-family:helvetica">
                            <center>
                              <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;padding:10px;margin:0 auto; ">
                                <tbody>
                                  <tr>
                                    <td style="font-family:helvetica">
                                      <h3 style="font-weight:normal;font-size:25px; margin: 0;"><strong>Your Order:</strong></h3>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </center>
                          </td>
                        </tr>
                      </table>
                      <table style="max-width:560px;text-align:center;border-spacing:0px;margin:10px auto;width:100%; padding: 10px;">
                        <tbody>
                          ${orderItemsHTML}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style="width:100%;border-spacing:0; ">
                <tbody>
                  <tr>
                    <td style="font-family:helvetica;">
                      <center>
                        <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: ${determineColor(status)}; border-radius: 20px; padding:15px;">
                          <tbody>
                            <tr>
                              <td style="font-family:helvetica">
                                <h4 style="font-weight:normal;font-size:25px;margin:0; margin-bottom: 5px; text-align: left;">
                                  <strong>Shipping:</strong>
                                </h4>
                              </td>
                              <td style="font-family:helvetica;width:50%;">
                                <p style="color:white;line-height:150%;font-size:16px;margin:0;">
                                  ${order.shipping.first_name} ${order.shipping.last_name}
                                  <br>
                                  ${order.shipping.address_1} ${order.shipping.address_2}
                                  <br>
                                  ${order.shipping.city}, ${order.shipping.state} ${order.shipping.postalCode} ${order.shipping.country}
                                  <br>
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>
          </td>
        </tr>
      </table>
    `;
  } catch (error) {
    console.error("Error in shipping status template:", error);
    return `
      <table style="width:100%;border-spacing:0;padding:10px">
        <tr>
          <td style="font-family:helvetica;border:0">
            <center>
              <h1>An error occurred while generating this email.</h1>
              <p>Please contact support for assistance.</p>
            </center>
          </td>
        </tr>
      </table>
    `;
  }
};

const shipping_status_steps = (order, status, isReturnTracking) => {
  const steps = isReturnTracking
    ? [
        { status: "return_initiated", label: "Return Initiated" },
        { status: "return_in_transit", label: "In Transit to Us" },
        { status: "return_out_for_delivery", label: "Out for Delivery to Us" },
        { status: "return_delivered", label: "Return Received" },
      ]
    : [
        { status: "pre_transit", label: "Label Created" },
        { status: "in_transit", label: "In Transit" },
        { status: "out_for_delivery", label: "Out for Delivery" },
        { status: "delivered", label: "Delivered" },
      ];

  return `
    <div style="margin-bottom:40px;">
      ${steps
        .map(
          (step, index) => `
        <div style="position:relative;padding-bottom:${index === steps.length - 1 ? "0" : "30px"}">
          <div style="display:flex;align-items:center;">
            <div style="
              width:30px;
              height:30px;
              border-radius:50%;
              background-color:${determineStepColor(order.status, step.status)};
              display:flex;
              align-items:center;
              justify-content:center;
              margin-right:10px;
            ">
              <span style="color:white;font-weight:bold;">${index + 1}</span>
            </div>
            <div style="color:${determineStepColor(order.status, step.status)};font-weight:bold;">
              ${step.label}
            </div>
          </div>
          ${
            index !== steps.length - 1
              ? `<div style="
                  position:absolute;
                  left:15px;
                  top:30px;
                  bottom:0;
                  width:2px;
                  background-color:${determineStepColor(order.status, step.status)};
                "></div>`
              : ""
          }
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

const determineStepColor = (currentStatus, stepStatus) => {
  const statusOrder = {
    // Regular shipping statuses
    pre_transit: 0,
    in_transit: 1,
    out_for_delivery: 2,
    delivered: 3,
    // Return shipping statuses
    return_initiated: 0,
    return_in_transit: 1,
    return_out_for_delivery: 2,
    return_delivered: 3,
  };

  const currentStep = statusOrder[currentStatus] || -1;
  const step = statusOrder[stepStatus] || -1;

  if (currentStep >= step) {
    return "#4CAF50"; // Completed step
  } else if (currentStep + 1 === step) {
    return "#FFA726"; // Current step
  } else {
    return "#E0E0E0"; // Future step
  }
};
